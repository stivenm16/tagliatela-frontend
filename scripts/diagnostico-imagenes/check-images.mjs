#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* ================================================================== */
/*  Help — bilingue                                                     */
/* ================================================================== */

function printHelp() {
  console.log(`Uso / Usage:
  node check-images.mjs                          Scrapea public/images/ y muestra tabla
  node check-images.mjs --manifest <path>        Compara contra image-manifest.json
  node check-images.mjs --csv                    Genera image-check-report.csv
  node check-images.mjs --md5                    Incluye hash MD5 en el output
  node check-images.mjs --help                   Esta ayuda / This help

Flags:
  --manifest <path>   Path al manifest JSON (default: ./image-manifest.json)
  --csv               Escribe image-check-report.csv al lado del script
  --md5               Calcula MD5 de cada archivo existente

Exit codes:
  0 = Todo OK / All OK
  1 = Faltantes o estructura rota / Missing files or broken structure
  2 = Error del script / Script error
`)
}

/* ================================================================== */
/*  Inline helpers — same logic as src/utils/normalizeImageName.ts     */
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
  return `/images/${family}/${slugCat}/${slugDir}/${catPrefix}_${camelName}_${variant}.png`
}

/* ================================================================== */
/*  Argument parsing                                                    */
/* ================================================================== */

function parseArgs() {
  const args = process.argv.slice(2)
  const opts = {
    manifest: null,
    csv: false,
    md5: false,
    help: false,
  }
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--manifest': {
        const next = args[i + 1]
        if (next && !next.startsWith('--')) {
          opts.manifest = next
          i++
        } else {
          opts.manifest = 'image-manifest.json'
        }
        break
      }
      case '--csv':
        opts.csv = true
        break
      case '--md5':
        opts.md5 = true
        break
      case '--help':
      case '-h':
        opts.help = true
        break
      default:
        console.error(`Unknown flag: ${args[i]}`)
        printHelp()
        process.exit(2)
    }
  }
  return opts
}

/* ================================================================== */
/*  Path resolution                                                     */
/* ================================================================== */

function findImagesRoot() {
  const candidates = [
    path.resolve(process.cwd(), 'public', 'images'),
    path.resolve(process.cwd(), 'images'),
  ]
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isDirectory()) {
      return c
    }
  }
  console.error('ERROR: No encuentro public/images/.')
  console.error('Asegurese de correr el script desde el directorio raiz del deploy.')
  console.error('Ejemplo: cd /var/www/tagliatela && node check-images.mjs')
  process.exit(2)
}

/* ================================================================== */
/*  MD5 helper                                                          */
/* ================================================================== */

function md5File(filePath) {
  const data = fs.readFileSync(filePath)
  return crypto.createHash('md5').update(data).digest('hex')
}

/* ================================================================== */
/*  Variant extraction from filename                                    */
/* ================================================================== */

const FILENAME_RE = /^([A-Z0-9_]+)_([A-Za-z0-9]+)_(.+)\.png$/

function parseVariant(filename) {
  const m = filename.match(FILENAME_RE)
  if (!m) return null
  return { prefix: m[1], camel: m[2], variant: m[3] }
}

/* ================================================================== */
/*  Scrape mode: walk public/images/                                    */
/* ================================================================== */

function scrapeImages(imagesRoot, opts) {
  const results = []
  const warnings = []

  if (!fs.existsSync(imagesRoot) || !fs.statSync(imagesRoot).isDirectory()) {
    console.error(`ERROR: ${imagesRoot} no es un directorio`)
    process.exit(2)
  }

  const familyDirs = fs.readdirSync(imagesRoot).filter((name) => {
    const full = path.join(imagesRoot, name)
    return fs.statSync(full).isDirectory()
  })

  for (const family of familyDirs) {
    const familyPath = path.join(imagesRoot, family)
    const catDirs = fs.readdirSync(familyPath).filter((name) => {
      const full = path.join(familyPath, name)
      return fs.statSync(full).isDirectory()
    })

    for (const category of catDirs) {
      const catPath = path.join(familyPath, category)
      const dishDirs = fs.readdirSync(catPath).filter((name) => {
        const full = path.join(catPath, name)
        return fs.statSync(full).isDirectory()
      })

      for (const dishSlug of dishDirs) {
        const dishPath = path.join(catPath, dishSlug)
        const files = fs.readdirSync(dishPath).filter((f) => f.endsWith('.png'))

        if (files.length === 0) {
          warnings.push(`Dir vacio (sin .png): ${path.relative(imagesRoot, dishPath)}`)
          continue
        }

        for (const file of files) {
          const fullPath = path.join(dishPath, file)
          const parsed = parseVariant(file)

          let entry = {
            family,
            category,
            dishSlug,
            dishName: '(inferred)',
            variant: 'unknown',
            exists: true,
            fileSize: 0,
            md5: '',
            expectedPath: path.posix.join('/images', path.relative(imagesRoot, fullPath)),
            reason: '',
          }

          if (!parsed) {
            entry.reason = `filename no matchea convencion: ${file}`
            warnings.push(`${path.relative(imagesRoot, fullPath)}: ${entry.reason}`)
          } else {
            entry.variant = parsed.variant
            const prefixCat = parsed.prefix.toLowerCase().replace(/_/g, '-')
            if (prefixCat !== category.toLowerCase()) {
              entry.reason = `category mismatch: prefix=${parsed.prefix} dir=${category}`
              warnings.push(`${path.relative(imagesRoot, fullPath)}: ${entry.reason}`)
            }
            entry.dishName = parsed.camel.replace(/([A-Z])/g, ' $1').trim()
          }

          try {
            const stat = fs.statSync(fullPath)
            entry.fileSize = stat.size
          } catch {
            entry.reason = entry.reason ? entry.reason + '; unreadable' : 'unreadable'
          }

          if (opts.md5 && entry.exists) {
            try {
              entry.md5 = md5File(fullPath)
            } catch {
              entry.md5 = 'ERROR'
            }
          }

          results.push(entry)
        }
      }
    }
  }

  return { results, warnings }
}

/* ================================================================== */
/*  Manifest mode                                                       */
/* ================================================================== */

function loadManifest(manifestPath) {
  if (!fs.existsSync(manifestPath)) {
    console.error(`ERROR: Manifest no encontrado en ${manifestPath}`)
    console.error('Genere el manifest primero con: node build-image-manifest.mjs')
    process.exit(2)
  }
  return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
}

function checkAgainstManifest(imagesRoot, manifest, opts) {
  const results = []
  const warnings = []
  let totalExpected = 0
  let totalPresent = 0

  for (const group of manifest.groups || []) {
    const { family, category, variants, items } = group

    for (const item of items) {
      for (const variant of variants) {
        totalExpected++
        const expectedPath = buildImagePath(family, category, item.name, variant)
        const diskPath = path.join(imagesRoot, expectedPath.replace('/images/', ''))

        let entry = {
          family,
          category,
          dishSlug: toSlug(item.name),
          dishName: item.name,
          variant,
          exists: false,
          fileSize: 0,
          md5: '',
          expectedPath,
          reason: '',
        }

        if (fs.existsSync(diskPath)) {
          entry.exists = true
          totalPresent++
          try {
            entry.fileSize = fs.statSync(diskPath).size
          } catch { /* ignore */ }
          if (opts.md5) {
            try {
              entry.md5 = md5File(diskPath)
            } catch {
              entry.md5 = 'ERROR'
            }
          }
        } else {
          entry.reason = 'file missing'
        }

        results.push(entry)
      }
    }
  }

  // Detect orphans: files on disk not in manifest
  const manifestPaths = new Set(results.map((r) => r.expectedPath))
  const orphans = []

  function walkDir(dir, base) {
    let entries
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) {
        walkDir(full, base)
      } else if (e.name.endsWith('.png')) {
        const relPath = '/' + path.posix.join(...path.relative(base, full).split(path.sep))
        if (!manifestPaths.has(relPath)) {
          orphans.push({ path: relPath, diskPath: full })
        }
      }
    }
  }

  walkDir(imagesRoot, imagesRoot)

  for (const orphan of orphans) {
    warnings.push(`Orphan (not in manifest): ${orphan.path}`)
  }

  return { results, warnings, totalExpected, totalPresent, orphans }
}

/* ================================================================== */
/*  Output helpers                                                      */
/* ================================================================== */

function formatSize(bytes) {
  if (bytes === 0) return '-'
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}K`
  return `${(bytes / (1024 * 1024)).toFixed(1)}M`
}

function pad(str, len) {
  return str.length > len ? str.slice(0, len - 1) + '.' : str.padEnd(len)
}

function printTable(results, warnings) {
  const cols = [
    { key: 'family', label: 'FAMILY', width: 10 },
    { key: 'category', label: 'CATEGORY', width: 16 },
    { key: 'dishSlug', label: 'DISH (slug)', width: 24 },
    { key: 'variant', label: 'VARIANT', width: 10 },
    { key: 'exists', label: 'OK', width: 4, fmt: (v) => v ? 'OK' : 'MISS' },
    { key: 'fileSize', label: 'SIZE', width: 6, fmt: (v) => formatSize(v) },
    { key: 'reason', label: 'NOTE', width: 30 },
  ]

  const header = cols.map((c) => pad(c.label, c.width)).join(' | ')
  const sep = cols.map((c) => '-'.repeat(c.width)).join('-+-')

  console.log(header)
  console.log(sep)

  for (const row of results) {
    const line = cols.map((c) => {
      const val = c.fmt ? c.fmt(row[c.key]) : (row[c.key] ?? '')
      return pad(String(val), c.width)
    }).join(' | ')
    console.log(line)
  }

  if (warnings.length > 0) {
    console.log()
    console.log('--- WARNINGS ---')
    for (const w of warnings) {
      console.log(`  [!] ${w}`)
    }
  }
}

function writeCsv(results, warnings) {
  const csvPath = path.resolve(__dirname, 'image-check-report.csv')
  const headers = ['family', 'category', 'dish_slug', 'dish_name', 'variant', 'expected_path', 'exists', 'file_size', 'md5', 'reason']
  const rows = [headers.join(',')]

  for (const row of results) {
    const vals = headers.map((h) => {
      const key = h === 'dish_slug' ? 'dishSlug' :
                  h === 'dish_name' ? 'dishName' :
                  h === 'expected_path' ? 'expectedPath' :
                  h === 'file_size' ? 'fileSize' :
                  key
      let val = row[key] ?? ''
      if (typeof val === 'boolean') val = val ? 'true' : 'false'
      val = String(val)
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        val = '"' + val.replace(/"/g, '""') + '"'
      }
      return val
    })
    rows.push(vals.join(','))
  }

  fs.writeFileSync(csvPath, rows.join('\n') + '\n', 'utf-8')
  console.log(`\nCSV report escrito a: ${csvPath}`)
}

/* ================================================================== */
/*  Main                                                                */
/* ================================================================== */

function main() {
  const opts = parseArgs()

  if (opts.help) {
    printHelp()
    process.exit(0)
  }

  const imagesRoot = findImagesRoot()
  console.log(`Directorio de imagenes: ${imagesRoot}\n`)

  let results = []
  let warnings = []
  let exitCode = 0
  let stats = {}

  if (opts.manifest) {
    let manifestPath
    if (path.isAbsolute(opts.manifest) || opts.manifest !== 'image-manifest.json') {
      manifestPath = path.resolve(opts.manifest)
    } else {
      manifestPath = path.resolve(__dirname, 'image-manifest.json')
      if (!fs.existsSync(manifestPath)) {
        manifestPath = path.resolve(process.cwd(), 'image-manifest.json')
      }
    }
    console.log(`Modo manifest: comparando contra ${manifestPath}\n`)
    const manifest = loadManifest(manifestPath)
    console.log(`Manifest generado: ${manifest.generatedAt}`)
    console.log(`DB host: ${manifest.dbHost}`)
    console.log(`Total items en manifest: ${manifest.totalItems}\n`)

    const out = checkAgainstManifest(imagesRoot, manifest, opts)
    results = out.results
    warnings = out.warnings
    stats = { totalExpected: out.totalExpected, totalPresent: out.totalPresent, orphans: out.orphans }
  } else {
    console.log('Modo scrape (sin manifest)\n')
    const out = scrapeImages(imagesRoot, opts)
    results = out.results
    warnings = out.warnings
  }

  printTable(results, warnings)

  // Summary
  const present = results.filter((r) => r.exists).length
  const missing = results.filter((r) => !r.exists).length

  console.log()
  console.log('--- RESUMEN / SUMMARY ---')
  console.log(`Total encontrados: ${results.length}`)
  console.log(`Presentes (OK):    ${present}`)

  if (stats.totalExpected) {
    console.log(`Esperados:         ${stats.totalExpected}`)
    console.log(`Faltantes (MISS):  ${missing}`)
    if (stats.orphans.length > 0) {
      console.log(`Orphans (en disco pero no en manifest): ${stats.orphans.length}`)
    }
  } else {
    console.log(`Warnings:          ${warnings.length}`)
  }

  if (stats.orphans && stats.orphans.length > 0) {
    console.log()
    console.log('--- ORPHANS (archivos en disco no en manifest) ---')
    for (const o of stats.orphans) {
      console.log(`  ${o.path}`)
    }
  }

  if (opts.csv) {
    writeCsv(results, warnings)
  }

  if (missing > 0) {
    console.log('\n[EXIT 1] Hay archivos faltantes.')
    exitCode = 1
  } else if (warnings.length > 0) {
    console.log('\n[EXIT 0] Todo presente, pero hay warnings (ver arriba).')
  } else {
    console.log('\n[EXIT 0] Todo OK.')
  }

  process.exit(exitCode)
}

main()
