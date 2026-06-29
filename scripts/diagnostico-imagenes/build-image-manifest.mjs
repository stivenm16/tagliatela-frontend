#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* ================================================================== */
/*  Path resolution                                                     */
/* ================================================================== */

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..')
const BACKEND_DIR = path.resolve(REPO_ROOT, '..', 'tagliatela-backend')
const OUTPUT_PATH = path.join(__dirname, 'image-manifest.json')

/* ================================================================== */
/*  Read backend .env                                                    */
/* ================================================================== */

let envCache = null

function readBackendEnv() {
  const envPath = path.join(BACKEND_DIR, '.env')
  if (!fs.existsSync(envPath)) {
    return null
  }
  const content = fs.readFileSync(envPath, 'utf-8')
  const env = {}
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim()
  }
  return env
}

function psql(sql) {
  if (!envCache) envCache = readBackendEnv()
  if (!envCache) {
    throw new Error('Backend .env not found')
  }
  const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = envCache
  return execSync(
    `PGPASSWORD=${DB_PASS} psql -h ${DB_HOST} -p ${DB_PORT || 5432} -U ${DB_USER} -d ${DB_NAME} -t -A -F $'\\t' -c "${sql.replace(/"/g, '\\"')}"`,
    { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }
  ).trim()
}

/* ================================================================== */
/*  Parse tab-delimited psql output                                     */
/* ================================================================== */

function parseTabDelimited(output) {
  if (!output) return []
  const lines = output.split('\n').filter(Boolean)
  return lines.map((line) => {
    const parts = line.split('\t')
    return { id: parts[0]?.trim(), name: parts[1]?.trim(), cat: parts[2]?.trim() }
  })
}

/* ================================================================== */
/*  Group definitions — exact copy from scripts/validate-images.ts     */
/* ================================================================== */

const ALL_GROUPS = [
  // -- Pastas --------------------------------------------------------
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

  // -- Sauces --------------------------------------------------------
  {
    label: 'Sauces',
    query: `SELECT id, name FROM sauce WHERE deletedat IS NULL ORDER BY name`,
    family: 'sauces',
    category: 'salsas',
    variants: ['200x200', '424x400'],
  },

  // -- Dishes (by type_dish) -----------------------------------------
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
      const deleted = [38, 57, 58, 59, 60, 61, 67]
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

  // -- Beverages -----------------------------------------------------
  {
    label: 'Cocktails',
    query: `SELECT id, name FROM cocktail WHERE deletedat IS NULL ORDER BY name`,
    family: 'beverages',
    category: 'cocteles',
    variants: ['200x320', '240x440'],
  },
  {
    label: 'Sangrias',
    query: `SELECT id, name FROM bleeding WHERE deletedat IS NULL ORDER BY name`,
    family: 'beverages',
    category: 'sangrias',
    variants: ['200x320', '240x440'],
  },

  // -- DOP -----------------------------------------------------------
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

/* ================================================================== */
/*  Image path builder (same logic as app)                              */
/* ================================================================== */

const ACCENT_MAP = {
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

function stripAccents(value) {
  return value
    .replace(/[´`'']/g, '')
    .split('')
    .map((char) => ACCENT_MAP[char] ?? char)
    .join('')
}

function toSlug(value) {
  return stripAccents(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function toCamelCase(value) {
  return stripAccents(value)
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

function buildImagePath(family, category, dishName, variant) {
  const slugDir = toSlug(dishName)
  const camelName = toCamelCase(dishName)
  const slugCat = toSlug(category)
  const catPrefix = slugCat.toUpperCase().replace(/-/g, '_')
  return path.join(
    REPO_ROOT, 'public', 'images', family, slugCat, slugDir,
    `${catPrefix}_${camelName}_${variant}.png`
  )
}

/* ================================================================== */
/*  Redact DB host for manifest                                         */
/* ================================================================== */

function redactHost(host) {
  if (!host) return 'redacted'
  const parts = host.split('.')
  if (parts.length <= 2) return 'redacted'
  return `***.${parts.slice(-2).join('.')}`
}

/* ================================================================== */
/*  Main                                                                */
/* ================================================================== */

function generateFallbackManifest(reason) {
  const stub = {
    generatedAt: new Date().toISOString(),
    schemaVersion: 1,
    dbHost: 'unknown',
    totalItems: 0,
    groups: ALL_GROUPS.map((g) => ({
      label: g.label,
      family: g.family,
      category: g.category,
      variants: g.variants,
      items: [],
    })),
    _note: `STUB MANIFEST — DB not available: ${reason}`,
  }
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(stub, null, 2) + '\n', 'utf-8')
  console.log(`\nSTUB manifest escrito a: ${OUTPUT_PATH}`)
  console.log('No se pudo consultar la base de datos. El manifest esta vacio (0 items).')
  console.log('Ejecute este script desde la maquina de desarrollo con acceso a la DB.')
}

function main() {
  console.log('Building image-manifest.json from database...\n')

  // Check DB connectivity
  let env
  try {
    env = readBackendEnv()
  } catch {
    env = null
  }

  if (!env) {
    console.error('ERROR: No se encontro ../tagliatela-backend/.env')
    console.error('No se puede conectar a la base de datos sin credenciales.')
    generateFallbackManifest('.env not found')
    process.exit(1)
  }

  try {
    psql('SELECT 1')
  } catch (e) {
    console.error(`ERROR: Cannot connect to the database: ${e.message}`)
    generateFallbackManifest(e.message)
    process.exit(1)
  }

  console.log('DB connection OK.\n')

  const groups = []
  let totalItems = 0

  for (const groupDef of ALL_GROUPS) {
    let raw
    try {
      raw = psql(groupDef.query)
    } catch (e) {
      console.error(`ERROR en query para "${groupDef.label}": ${e.message}`)
      continue
    }

    const rows = parseTabDelimited(raw)
    const items = []

    for (const row of rows) {
      if (!row.name) continue
      if (groupDef.skip && groupDef.skip(row)) continue

      items.push({ id: Number(row.id), name: row.name })
    }

    groups.push({
      label: groupDef.label,
      family: groupDef.family,
      category: groupDef.category,
      variants: groupDef.variants,
      items,
    })

    totalItems += items.length
    console.log(`  ${groupDef.label}: ${items.length} items`)
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    schemaVersion: 1,
    dbHost: redactHost(env.DB_HOST || 'unknown'),
    totalItems,
    groups,
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf-8')
  console.log(`\nManifest escrito a: ${OUTPUT_PATH}`)
  console.log(`Total items: ${totalItems}`)
  console.log(`Total groups: ${groups.length}`)

  // Post-build validation against local public/images/
  console.log('\n--- Post-build validation (local public/images/) ---')
  const PUBLIC_IMAGES = path.join(REPO_ROOT, 'public', 'images')
  let missingCount = 0

  for (const group of groups) {
    for (const item of group.items) {
      for (const variant of group.variants) {
        const diskPath = buildImagePath(group.family, group.category, item.name, variant)
        if (!fs.existsSync(diskPath)) {
          missingCount++
          if (missingCount <= 20) {
            const rel = path.relative(REPO_ROOT, diskPath)
            console.log(`  MISSING: ${rel}`)
          }
        }
      }
    }
  }

  if (missingCount > 0) {
    if (missingCount > 20) {
      console.log(`  ... y ${missingCount - 20} mas`)
    }
    console.log(`\nWARNING: ${missingCount} archivos faltantes en tu public/images/ local.`)
    console.log('El manifest se genero igual. Ejecuta el script de seeding para generarlos.')
  } else {
    console.log('Todos los archivos presentes en public/images/ local.')
  }

  process.exit(0)
}

main()
