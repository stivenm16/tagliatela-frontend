/**
 * Step 2: Rename family dirs with spaces to kebab-case, and normalize
 * variant tokens (148,5x148,5 → 148x148) and filename prefixes (LE PIZZE_ → LE_PIZZE_).
 *
 * Also processes sauces/ and pastas/ for comma-variant renames only
 * (no directory renames needed — those families are already clean).
 *
 * Run:  npx tsx scripts/rename-images-step2.ts
 * Dry:  npx tsx scripts/rename-images-step2.ts --dry-run
 */

import * as fs from 'fs'
import * as path from 'path'

const DISHES_DIR = path.resolve(__dirname, '..', 'public', 'images', 'dishes')
const SAUCES_DIR = path.resolve(__dirname, '..', 'public', 'images', 'sauces')
const PASTAS_DIR = path.resolve(__dirname, '..', 'public', 'images', 'pastas')
const DRY_RUN = process.argv.includes('--dry-run')

const FAMILY_RENAMES: Record<string, string> = {
  'le pizze': 'le-pizze',
  'cuore felice': 'cuore-felice',
  'piatti principali': 'piatti-principali',
}

let renamedDirs = 0
let renamedFiles = 0
let skipped = 0

function log(msg: string): void {
  console.log(msg)
}

/* ------------------------------------------------------------------ */
/*  1. Rename family directories                                       */
/* ------------------------------------------------------------------ */

log(`\n📁 Family directory renames (${DRY_RUN ? 'DRY RUN' : 'LIVE'})\n`)

for (const [oldName, newName] of Object.entries(FAMILY_RENAMES)) {
  const oldPath = path.join(DISHES_DIR, oldName)
  const newPath = path.join(DISHES_DIR, newName)

  if (!fs.existsSync(oldPath)) {
    log(`  ⏭  ${oldName} → already done (not found)`)
    skipped++
    continue
  }

  if (fs.existsSync(newPath)) {
    log(`  ⏭  ${oldName} → ${newName} (target already exists)`)
    skipped++
    continue
  }

  if (DRY_RUN) {
    log(`  [DRY RUN] RENAME DIR: ${oldName} → ${newName}`)
  } else {
    fs.renameSync(oldPath, newPath)
    log(`  ✅ RENAME DIR: ${oldName} → ${newName}`)
  }
  renamedDirs++
}

/* ------------------------------------------------------------------ */
/*  2. Rename files inside all dish subdirectories                      */
/* ------------------------------------------------------------------ */

log(`\n📄 File renames (${DRY_RUN ? 'DRY RUN' : 'LIVE'})\n`)

function walk(dir: string): void {
  let entries: fs.Dirent[]
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      walk(path.join(dir, entry.name))
    } else if (entry.isFile() && entry.name.endsWith('.png')) {
      const oldName = entry.name
      let newName = oldName

      // 2a. Replace comma variant: _148,5x148,5 → _148x148
      newName = newName.replace(/_148,5x148,5\.png$/, '_148x148.png')

      // 2b. Replace space in prefix: LE PIZZE_Foo → LE_PIZZE_Foo, etc.
      // Match any prefix like "LE PIZZE_" or "CUORE FELICE_" or "PIATTI PRINCIPALI_"
      newName = newName.replace(
        /^(LE PIZZE|CUORE FELICE|PIATTI PRINCIPALI)(?=_.*\.png$)/,
        (_match: string, prefix: string) => prefix.replace(/ /g, '_'),
      )

      if (newName === oldName) {
        // Already correct, skip
        continue
      }

      const oldPath = path.join(dir, oldName)
      const newPath = path.join(dir, newName)

      // Idempotency: skip if target already exists and source differs
      if (fs.existsSync(newPath) && oldPath !== newPath) {
        log(`  ⏭  ${oldName} → ${newName} (target already exists)`)
        skipped++
        continue
      }

      if (DRY_RUN) {
        log(`  [DRY RUN] RENAME: ${oldName} → ${newName}`)
      } else {
        fs.renameSync(oldPath, newPath)
        log(`  ✅ RENAME: ${oldName} → ${newName}`)
      }
      renamedFiles++
    }
  }
}

// Walk the actual family dirs (already renamed if step 1 ran)
const familyDirs = [
  'le-pizze', 'le pizze',
  'cuore-felice', 'cuore felice',
  'piatti-principali', 'piatti principali',
]
const existingDirs = familyDirs.filter((d) => fs.existsSync(path.join(DISHES_DIR, d)))

// Also walk all other dish category dirs that may have comma variants
const allEntries = fs.readdirSync(DISHES_DIR, { withFileTypes: true })
for (const entry of allEntries) {
  if (entry.isDirectory() && !existingDirs.includes(entry.name)) {
    existingDirs.push(entry.name)
  }
}

const uniqueDirs = [...new Set(existingDirs)]
for (const dirName of uniqueDirs) {
  walk(path.join(DISHES_DIR, dirName))
}

/* ------------------------------------------------------------------ */
/*  3. Rename comma variants in sauces/ (salsas/)                       */
/* ------------------------------------------------------------------ */

log(`\n📄 Sauce file renames (${DRY_RUN ? 'DRY RUN' : 'LIVE'})\n`)

if (fs.existsSync(SAUCES_DIR)) {
  walk(SAUCES_DIR)
} else {
  log('  ⏭  sauces/ directory not found')
}

/* ------------------------------------------------------------------ */
/*  4. Rename comma variants in pastas/ (tradizionale/ + ripiena/)     */
/* ------------------------------------------------------------------ */

log(`\n📄 Pasta file renames (${DRY_RUN ? 'DRY RUN' : 'LIVE'})\n`)

if (fs.existsSync(PASTAS_DIR)) {
  walk(PASTAS_DIR)
} else {
  log('  ⏭  pastas/ directory not found')
}

/* ------------------------------------------------------------------ */
/*  Report                                                             */
/* ------------------------------------------------------------------ */

log(`\n${'─'.repeat(50)}`)
log(`  Family dirs renamed: ${renamedDirs}`)
log(`  Files renamed:       ${renamedFiles}`)
log(`  Skipped (idempotent):${skipped}`)
log(`${'─'.repeat(50)}\n`)

if (DRY_RUN) {
  log('This was a dry run. Remove --dry-run to apply changes.')
}
