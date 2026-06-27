/**
 * Renames image directories and PNG files to use ASCII-safe slugs.
 *
 * Converts dish/entity names like "Garganelli al´uovo" → "garganelli-al-uovo"
 * for directories and "GarganelliAlUovo" for filenames.
 *
 * Run with: npx tsx scripts/rename-images.ts
 *
 * Dry-run: set DRY_RUN=true  →  npx tsx scripts/rename-images.ts --dry-run
 */

import * as fs from 'fs'
import * as path from 'path'

/* ------------------------------------------------------------------ */
/*  Helpers — replicated from src/utils/normalizeImageName.ts          */
/* ------------------------------------------------------------------ */

const ACCENT_MAP: Record<string, string> = {
  'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae',
  'ç': 'c',
  'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
  'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
  'ð': 'd',
  'ñ': 'n',
  'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o',
  'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
  'ý': 'y', 'ÿ': 'y',
  'ß': 'ss',
  'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE',
  'Ç': 'C',
  'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E',
  'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I',
  'Ð': 'D',
  'Ñ': 'N',
  'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Ø': 'O',
  'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U',
  'Ý': 'Y',
}

const APOSTROPHE_REGEX = /[´`'’]/g

function stripAccents(value: string): string {
  return value
    .replace(APOSTROPHE_REGEX, '')
    .split('')
    .map((char) => ACCENT_MAP[char] ?? char)
    .join('')
}

function toSlug(value: string): string {
  return stripAccents(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function toCamelCase(value: string): string {
  const stripped = stripAccents(value).trim().toLowerCase()
  return stripped
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

/* ------------------------------------------------------------------ */
/*  Rename logic                                                       */
/* ------------------------------------------------------------------ */

const IMAGES_DIR = path.resolve(__dirname, '..', 'public', 'images')
const DRY_RUN = process.argv.includes('--dry-run')

let renamedFiles = 0
let renamedDirs = 0
let skippedFiles = 0
let skippedDirs = 0

function walk(dir: string): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const subdirs = entries.filter((e) => e.isDirectory())
  const files = entries.filter((e) => e.isFile())

  // Process children first (bottom-up)
  for (const d of subdirs) {
    walk(path.join(dir, d.name))
  }

  // Re-read after potential child renames
  const currentFiles = fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isFile())
  const pngFiles = currentFiles.filter(
    (f) => f.isFile() && f.name.endsWith('.png'),
  )

  if (pngFiles.length > 0) {
    // This is a dish/entity directory — rename files inside
    const dishName = path.basename(dir)
    const categoryDir = path.basename(path.dirname(dir))
    const categoryUpper = categoryDir.toUpperCase()

    // If dir is already a slug (no spaces, may have hyphens), undo hyphenation
    // before computing camelCase. Otherwise use the original name as-is.
    const hasSpaces = /\s/.test(dishName)
    const nameForCamel = hasSpaces ? dishName : dishName.replace(/-/g, ' ')
    const newCamel = toCamelCase(nameForCamel)

    for (const f of pngFiles) {
      // Parse variant: extract the dimension pattern at the end
      // Handles 148,5x148,5 | 200x200 | 424x400 | 96x96 | 200x320 | 240x440 | 188x188
      const match = f.name.match(/_(\d+(?:,\d+)?x\d+(?:,\d+)?)\.png$/)
      if (!match) {
        console.warn(`  ⚠ Skipped (no variant pattern): ${f.name}`)
        continue
      }
      const variant = match[1]
      const newFilename = `${categoryUpper}_${newCamel}_${variant}.png`

      if (f.name === newFilename) {
        skippedFiles++
        continue
      }

      const oldPath = path.join(dir, f.name)
      const newPath = path.join(dir, newFilename)

      if (DRY_RUN) {
        console.log(`  [DRY RUN] RENAME: ${f.name} → ${newFilename}`)
      } else {
        console.log(`  RENAME: ${f.name} → ${newFilename}`)
        fs.renameSync(oldPath, newPath)
      }
      renamedFiles++
    }
  }

  // Rename directory itself (bottom-up)
  if (dir !== IMAGES_DIR && dir.startsWith(IMAGES_DIR)) {
    const oldName = path.basename(dir)
    const newSlug = toSlug(oldName)

    if (oldName === newSlug) {
      skippedDirs++
      return
    }

    // Safety: ensure we're only renaming dish-level directories, not categories
    // Dish directories have .png files OR are empty (already processed)
    const isLeafOrProcessed =
      pngFiles.length > 0 ||
      fs.readdirSync(dir).every(
        (e) => !fs.statSync(path.join(dir, e)).isDirectory(),
      )

    if (!isLeafOrProcessed) {
      return
    }

    const newDirPath = path.join(path.dirname(dir), newSlug)

    if (DRY_RUN) {
      console.log(`[DRY RUN] RENAME DIR: ${oldName} → ${newSlug}`)
    } else {
      console.log(`RENAME DIR: ${oldName} → ${newSlug}`)
      fs.renameSync(dir, newDirPath)
    }
    renamedDirs++
  }
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

console.log(`${DRY_RUN ? '[DRY RUN] ' : ''}Processing ${IMAGES_DIR}\n`)
walk(IMAGES_DIR)

console.log(
  `\n✅ Done! Renamed ${renamedFiles} files, ${renamedDirs} directories. Skipped ${skippedFiles} files, ${skippedDirs} dirs (already correct).`,
)

if (DRY_RUN) {
  console.log(
    '\nThis was a dry run. Remove --dry-run to apply changes.',
  )
}
