/**
 * Unit tests for normalizeImageName helpers.
 *
 * Run:  npx tsx __tests__/normalizeImageName.test.ts
 *
 * Uses Node.js built-in assert for zero-dependency testing.
 */

import assert from 'node:assert'
import { stripAccents, toCamelCase, toSlug } from '../src/utils/normalizeImageName'

let passed = 0
let failed = 0

function test(name: string, fn: () => void): void {
  try {
    fn()
    passed++
  } catch (err: any) {
    failed++
    console.error(`  ❌ ${name}`)
    console.error(`     ${err.message}`)
  }
}

function equal<T>(actual: T, expected: T): void {
  assert.strictEqual(actual, expected)
}

/* ------------------------------------------------------------------ */
/*  stripAccents                                                       */
/* ------------------------------------------------------------------ */

console.log('\n📋 stripAccents')

test('removes acute accent á → a', () => {
  equal(stripAccents('Fondente Lombardía'), 'Fondente Lombardia')
})

test('removes grave accent à → a', () => {
  equal(stripAccents('Carpaccio di baccalà'), 'Carpaccio di baccala')
})

test('removes ç → c', () => {
  equal(stripAccents('Garçon'), 'Garcon')
})

test('removes é → e', () => {
  equal(stripAccents('César'), 'Cesar')
})

test('removes í → i', () => {
  equal(stripAccents('Ibérica'), 'Iberica')
})

test('removes ñ → n', () => {
  equal(stripAccents('España'), 'Espana')
})

test('removes ó → o', () => {
  equal(stripAccents('Picón'), 'Picon')
})

test('removes ú → u', () => {
  equal(stripAccents('Banamisú'), 'Banamisu')
})

test('removes ü → u', () => {
  equal(stripAccents('pingüino'), 'pinguino')
})

test('removes standalone acute accent ´ (U+00B4)', () => {
  equal(stripAccents("Garganelli al´uovo"), 'Garganelli aluovo')
})

test('removes smart quotes and backticks', () => {
  equal(stripAccents("café 'special'"), 'cafe special')
})

test('handles uppercase accents', () => {
  equal(stripAccents('ÁÉÍÓÚÑ'), 'AEIOUN')
})

test('does not modify plain ASCII', () => {
  equal(stripAccents('Hello World 123'), 'Hello World 123')
})

test('handles empty string', () => {
  equal(stripAccents(''), '')
})

test('handles mixed text with multiple accent types', () => {
  equal(
    stripAccents('Caffè, Banamisú, Ibérica y Mojo Picón'),
    'Caffe, Banamisu, Iberica y Mojo Picon',
  )
})

/* ------------------------------------------------------------------ */
/*  toSlug                                                             */
/* ------------------------------------------------------------------ */

console.log('\n📋 toSlug')

test('converts simple name to kebab-case', () => {
  equal(toSlug('Tortellone caprese'), 'tortellone-caprese')
})

test('strips accents and converts to kebab-case', () => {
  equal(toSlug('Garganelli al´uovo'), 'garganelli-aluovo')
})

test('handles multi-word names', () => {
  equal(toSlug('Pappardelle al pepe nero'), 'pappardelle-al-pepe-nero')
})

test('handles names starting with numbers', () => {
  equal(toSlug('4 Formaggi'), '4-formaggi')
})

test('removes trailing spaces before slugifying', () => {
  equal(toSlug('Gnocco '), 'gnocco')
})

test('handles single-word names', () => {
  equal(toSlug('Ravioli'), 'ravioli')
})

test('handles name with apostrophe', () => {
  equal(toSlug("Pesto d'oliva"), 'pesto-doliva')
})

test('kebab-case is all lowercase ASCII', () => {
  const slug = toSlug('Mozzarella di Búfala')
  equal(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug), true)
})

test('produces deterministic output', () => {
  const a = toSlug('Sangría spumante italiano di María')
  const b = toSlug('Sangría spumante italiano di María')
  equal(a, b)
})

/* ------------------------------------------------------------------ */
/*  toCamelCase                                                        */
/* ------------------------------------------------------------------ */

console.log('\n📋 toCamelCase')

test('converts spaced name to CamelCase', () => {
  equal(toCamelCase('Tortellone caprese'), 'TortelloneCaprese')
})

test('strips accents and produces CamelCase', () => {
  equal(toCamelCase('Garganelli al´uovo'), 'GarganelliAluovo')
})

test('handles multi-word names', () => {
  equal(toCamelCase('Pappardelle al pepe nero'), 'PappardelleAlPepeNero')
})

test('capitalizes single-word names', () => {
  equal(toCamelCase('ravioli'), 'Ravioli')
})

test('handles names with accents and spaces', () => {
  equal(toCamelCase('Carpaccio di baccalà'), 'CarpaccioDiBaccala')
})

test('handles names with only number prefix', () => {
  equal(toCamelCase('4 formaggi'), '4Formaggi')
})

test('produces deterministic output', () => {
  const a = toCamelCase('RAGÙ ANTICO')
  const b = toCamelCase('ragù antico')
  equal(a, b)
})

test('output contains only word chars (no spaces, no accents)', () => {
  const camel = toCamelCase('Mozzarella di búfala')
  equal(/^[A-Za-z0-9]+$/.test(camel), true)
})

/* ------------------------------------------------------------------ */
/*  Integration: full getDishImage path generation                     */
/* ------------------------------------------------------------------ */

console.log('\n📋 Integration (getDishImage path simulation)')

// Simulate what getDishImage would produce
function expectedPath(
  dishName: string,
  category: string,
  family: string,
  variant: string,
): string {
  const slugDir = toSlug(dishName)
  const camelName = toCamelCase(dishName)
  return `public/images/${family}/${category.toLowerCase()}/${slugDir}/${category.toUpperCase()}_${camelName}_${variant}.png`
}

test('Garganelli path has no special characters', () => {
  const p = expectedPath('Garganelli al´uovo', 'tradizionale', 'pastas', '148,5x148,5')
  equal(p, 'public/images/pastas/tradizionale/garganelli-aluovo/TRADIZIONALE_GarganelliAluovo_148,5x148,5.png')
})

test('Tortellone caprese path has no spaces', () => {
  const p = expectedPath('Tortellone caprese', 'ripiena', 'pastas', '148,5x148,5')
  equal(p, 'public/images/pastas/ripiena/tortellone-caprese/RIPIENA_TortelloneCaprese_148,5x148,5.png')
})

test('Ragù antico path strips accent', () => {
  const p = expectedPath('Ragù antico', 'salsas', 'sauces', '200x200')
  equal(p, 'public/images/sauces/salsas/ragu-antico/SALSAS_RaguAntico_200x200.png')
})

test('Insalata César path strips accent', () => {
  const p = expectedPath('Insalata César', 'insalate', 'dishes', '148,5x148,5')
  equal(p, 'public/images/dishes/insalate/insalata-cesar/INSALATE_InsalataCesar_148,5x148,5.png')
})

test('LE PIZZE category preserves spaces in filename prefix', () => {
  const p = expectedPath('Ibérica', 'le pizze', 'dishes', '200x200')
  equal(p, 'public/images/dishes/le pizze/iberica/LE PIZZE_Iberica_200x200.png')
})

test('Sangría path strips all accents', () => {
  const p = expectedPath('Sangría di Lambrusco', 'sangrias', 'beverages', '200x320')
  equal(p, 'public/images/beverages/sangrias/sangria-di-lambrusco/SANGRIAS_SangriaDiLambrusco_200x320.png')
})

test('DOP Mozzarella di búfala path strips accent', () => {
  const p = expectedPath('Mozzarella di búfala', 'quesos', 'DOP', '188x188')
  equal(p, 'public/images/DOP/quesos/mozzarella-di-bufala/QUESOS_MozzarellaDiBufala_188x188.png')
})

/* ------------------------------------------------------------------ */
/*  Report                                                             */
/* ------------------------------------------------------------------ */

console.log(`\n${'─'.repeat(50)}`)
console.log(`  Passed: ${passed}  |  Failed: ${failed}`)
console.log(`${'─'.repeat(50)}\n`)

if (failed > 0) {
  process.exit(1)
}
