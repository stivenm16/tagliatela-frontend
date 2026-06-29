/**
 * Validates that every DB entity has its corresponding image file on disk.
 *
 * Queries the production DB clone (prd_clone) and checks that for each
 * entity a matching .png file exists under public/images/ for all variants
 * actually used by the app (as determined by getDishImage calls).
 *
 * Usage:  npx tsx scripts/validate-images.ts
 *
 * Exit code: 0 = all images present, 1 = missing images found.
 */

import { execSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

/* ------------------------------------------------------------------ */
/*  DB connection from backend .env                                    */
/* ------------------------------------------------------------------ */

const BACKEND_DIR = path.resolve(__dirname, '..', '..', 'tagliatela-backend')

function readBackendEnv(): Record<string, string> {
  const envPath = path.join(BACKEND_DIR, '.env')
  if (!fs.existsSync(envPath)) {
    console.error(`❌ Backend .env not found at ${envPath}`)
    process.exit(2)
  }
  const content = fs.readFileSync(envPath, 'utf-8')
  const env: Record<string, string> = {}
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim()
  }
  return env
}

function psql(sql: string): string {
  const env = readBackendEnv()
  const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = env
  return execSync(
    `PGPASSWORD=${DB_PASS} psql -h ${DB_HOST} -p ${DB_PORT || 5432} -U ${DB_USER} -d ${DB_NAME} -t -A -c "${sql.replace(/"/g, '\\"')}"`,
    { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 },
  ).trim()
}

/* ------------------------------------------------------------------ */
/*  Helpers (same logic as the app)                                    */
/* ------------------------------------------------------------------ */

const ACCENT_MAP: Record<string, string> = {
  'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae',
  'ç': 'c',
  'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
  'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
  'ð': 'd', 'ñ': 'n',
  'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o',
  'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
  'ý': 'y', 'ÿ': 'y', 'ß': 'ss',
  'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE',
  'Ç': 'C',
  'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E',
  'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I',
  'Ð': 'D', 'Ñ': 'N',
  'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Ø': 'O',
  'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U', 'Ý': 'Y',
}

function stripAccents(value: string): string {
  return value
    .replace(/[´`'’]/g, '')
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
  return stripAccents(value)
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

function getDishImagePath(
  dishName: string,
  category: string,
  family: string,
  variant: string,
): string {
  const slugDir = toSlug(dishName)
  const camelName = toCamelCase(dishName)
  const slugCat = toSlug(category)
  const catPrefix = slugCat.toUpperCase().replace(/-/g, '_')
  return path.join(
    __dirname,
    '..',
    'public',
    'images',
    family,
    slugCat,
    slugDir,
    `${catPrefix}_${camelName}_${variant}.png`,
  )
}

/* ------------------------------------------------------------------ */
/*  Entity definitions — each maps a DB row to getDishImage params     */
/* ------------------------------------------------------------------ */

type Variant = string

interface EntityGroup {
  label: string
  /** SQL query returning rows with `id` and `name` columns (plus optional extras) */
  query: string
  family: string
  /** How to extract the category from the query alias. Use `{alias}` for dynamic. */
  category: string | ((row: Record<string, string>) => string)
  variants: Variant[]
  /** Skip rows where this condition holds (evaluated in JS) */
  skip?: (row: Record<string, string>) => boolean
}

const ALL_GROUPS: EntityGroup[] = [
  // ── Pastas ──────────────────────────────────────────────────────
  {
    label: 'Pasta Tradizionale',
    query: `
      SELECT p.id, p.name, 'TRADIZIONALE' AS cat
      FROM pasta p
      JOIN pasta_type pt ON p.type_id = pt.id
      WHERE pt.name = 'PASTA TRADIZIONALE'
        AND p.deletedat IS NULL
      ORDER BY p.name
    `,
    family: 'pastas',
    category: 'tradizionale',
    variants: ['148x148', '96x96'],
  },
  {
    label: 'Pasta Ripiena',
    query: `
      SELECT p.id, p.name, 'RIPIENA' AS cat
      FROM pasta p
      JOIN pasta_type pt ON p.type_id = pt.id
      WHERE pt.name = 'PASTA RIPIENA'
        AND p.deletedat IS NULL
      ORDER BY p.name
    `,
    family: 'pastas',
    category: 'ripiena',
    variants: ['148x148', '96x96'],
  },

  // ── Sauces ──────────────────────────────────────────────────────
  {
    label: 'Sauces',
    query: `SELECT id, name FROM sauce WHERE deletedat IS NULL ORDER BY name`,
    family: 'sauces',
    category: 'salsas',
    variants: ['200x200', '424x400'],
  },

  // ── Dishes (by type_dish) ───────────────────────────────────────
  {
    label: 'Dishes - APERITIVI',
    query: `
      SELECT d.id, d.name, 'aperitivi' AS cat
      FROM dish d
      JOIN type_dish td ON d.type_dish_id = td.id
      WHERE td.name = 'APERITIVI' AND d.deletedat IS NULL
      ORDER BY d.name
    `,
    family: 'dishes',
    category: 'aperitivi',
    variants: ['148x148', '200x200', '424x400'],
  },
  {
    label: 'Dishes - ANTIPASTI',
    query: `
      SELECT d.id, d.name, 'antipasti' AS cat
      FROM dish d
      JOIN type_dish td ON d.type_dish_id = td.id
      WHERE td.name = 'ANTIPASTI' AND d.deletedat IS NULL
      ORDER BY d.name
    `,
    family: 'dishes',
    category: 'antipasti',
    variants: ['148x148', '200x200', '424x400'],
  },
  {
    label: 'Dishes - CUORE FELICE',
    query: `
      SELECT d.id, d.name, 'cuore felice' AS cat
      FROM dish d
      JOIN type_dish td ON d.type_dish_id = td.id
      WHERE td.name = 'CUORE FELICE' AND d.deletedat IS NULL
      ORDER BY d.name
    `,
    family: 'dishes',
    category: 'cuore felice',
    variants: ['148x148', '200x200', '424x400'],
  },
  {
    label: 'Dishes - INSALATE',
    query: `
      SELECT d.id, d.name, 'insalate' AS cat
      FROM dish d
      JOIN type_dish td ON d.type_dish_id = td.id
      WHERE td.name = 'INSALATE' AND d.deletedat IS NULL
      ORDER BY d.name
    `,
    family: 'dishes',
    category: 'insalate',
    variants: ['148x148', '200x200', '424x400'],
  },
  {
    label: 'Dishes - PIATTI PRINCIPALI',
    query: `
      SELECT d.id, d.name, 'piatti principali' AS cat
      FROM dish d
      JOIN type_dish td ON d.type_dish_id = td.id
      WHERE td.name = 'PIATTI PRINCIPALI' AND d.deletedat IS NULL
      ORDER BY d.name
    `,
    family: 'dishes',
    category: 'piatti principali',
    variants: ['148x148', '200x200', '424x400'],
  },
  {
    label: 'Dishes - LE PIZZE',
    query: `
      SELECT d.id, d.name, 'le pizze' AS cat
      FROM dish d
      JOIN type_dish td ON d.type_dish_id = td.id
      WHERE td.name = 'LE PIZZE' AND d.deletedat IS NULL
      ORDER BY d.name
    `,
    family: 'dishes',
    category: 'le pizze',
    variants: ['148x148', '200x200', '424x400'],
    skip: (row) => {
      // Soft-deleted pizzas (migration 002, 003)
      const deleted = [38, 57, 58, 59, 60, 61, 67] // Campagnola + Pinsas + Pizza Gustosa
      return deleted.includes(Number(row.id))
    },
  },
  {
    label: 'Dishes - POSTRES',
    query: `
      SELECT d.id, d.name, 'postres' AS cat
      FROM dish d
      JOIN type_dish td ON d.type_dish_id = td.id
      WHERE td.name = 'POSTRES' AND d.deletedat IS NULL
      ORDER BY d.name
    `,
    family: 'dishes',
    category: 'postres',
    variants: ['148x148', '200x200', '424x400'],
  },

  // ── Beverages ───────────────────────────────────────────────────
  {
    label: 'Cocktails',
    query: `SELECT id, name FROM cocktail WHERE deletedat IS NULL ORDER BY name`,
    family: 'beverages',
    category: 'cocteles',
    variants: ['200x320', '240x440'],
  },
  {
    label: 'Sangrías',
    query: `SELECT id, name FROM bleeding WHERE deletedat IS NULL ORDER BY name`,
    family: 'beverages',
    category: 'sangrias',
    variants: ['200x320', '240x440'],
  },

  // ── DOP ─────────────────────────────────────────────────────────
  {
    label: 'DOP - Quesos',
    query: `SELECT id, name FROM cheese WHERE deletedat IS NULL ORDER BY name`,
    family: 'DOP',
    category: 'quesos',
    variants: ['188x188', '424x400'],
  },
  {
    label: 'DOP - Embutidos',
    query: `SELECT id, name FROM sausage WHERE deletedat IS NULL ORDER BY name`,
    family: 'DOP',
    category: 'embutidos',
    variants: ['188x188', '424x400'],
  },
  {
    label: 'DOP - Otros',
    query: `SELECT id, name FROM other WHERE deletedat IS NULL ORDER BY name`,
    family: 'DOP',
    category: 'otros',
    variants: ['188x188', '424x400'],
  },
]

/* ------------------------------------------------------------------ */
/*  Validation engine                                                  */
/* ------------------------------------------------------------------ */

interface Missing {
  entity: string
  dishName: string
  variant: string
  expectedPath: string
}

const failures: Missing[] = []
const checked: string[] = []

function parseTabDelimited(output: string): Record<string, string>[] {
  if (!output) return []
  const lines = output.split('\n').filter(Boolean)
  if (lines.length === 0) return []
  // First line is headers (from psql)
  // But with -A -t, there are no headers and no alignment
  // Each line is pipe-separated? Actually -A means unaligned, so columns are separated by '|'
  // Wait, with -A and no -F flag, the default field separator is '|'. But we used -t for tuples only.
  // Actually psql -A -t produces output with '|' as separator.

  // Hmm, actually psql -A -t with no -F uses | as field separator. But our queries use AS cat
  // so each row has columns: id|name|cat

  // Let me re-check. With -t (tuples only) and -A (unaligned), the default separator is '|'.

  return lines.map((line) => {
    const parts = line.split('|')
    return { id: parts[0]?.trim(), name: parts[1]?.trim(), cat: parts[2]?.trim() }
  })
}

function checkGroup(group: EntityGroup): void {
  const raw = psql(group.query)
  const rows = parseTabDelimited(raw)
  const category =
    typeof group.category === 'function'
      ? ''
      : group.category

  for (const row of rows) {
    if (!row.name) continue
    if (group.skip?.(row)) continue

    const cat = typeof group.category === 'function' ? group.category(row) : category

    for (const variant of group.variants) {
      const expectedPath = getDishImagePath(row.name, cat, group.family, variant)
      const exists = fs.existsSync(expectedPath)

      checked.push(expectedPath)

      if (!exists) {
        failures.push({
          entity: group.label,
          dishName: row.name,
          variant,
          expectedPath,
        })
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

function main(): void {
  console.log('🔍 Validating DB entities against public/images/...\n')

  // Check DB connectivity
  try {
    psql('SELECT 1')
  } catch {
    console.error('❌ Cannot connect to the database. Is Postgres running?')
    process.exit(2)
  }

  for (const group of ALL_GROUPS) {
    checkGroup(group)
  }

  // Report
  const totalChecked = checked.length
  const totalMissing = failures.length

  if (failures.length === 0) {
    console.log(`✅ All ${totalChecked} image files present across ${ALL_GROUPS.length} entity groups.\n`)
    process.exit(0)
  }

  // Group failures by entity group
  const byGroup = new Map<string, Missing[]>()
  for (const f of failures) {
    const key = `${f.entity} / ${f.dishName}`
    if (!byGroup.has(key)) byGroup.set(key, [])
    byGroup.get(key)!.push(f)
  }

  console.log(`❌ MISSING ${totalMissing} image file(s) out of ${totalChecked} checked:\n`)

  for (const [key, items] of byGroup) {
    console.log(`  📛 ${key}`)
    for (const item of items) {
      const relPath = path.relative(
        path.resolve(__dirname, '..'),
        item.expectedPath,
      )
      console.log(`      missing: ${relPath}`)
    }
    console.log()
  }

  console.log(
    `Add the missing .png files or run the backend seeding/migration script.\n`,
  )
  process.exit(1)
}

main()
