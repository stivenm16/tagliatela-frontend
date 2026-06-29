/**
 * Unit tests for getDishImage — verifies that all generated URLs are
 * ASCII-safe: no spaces, no commas, no accents, no apostrophes.
 *
 * Run:  npx tsx __tests__/getImage.test.ts
 */

import assert from 'node:assert'
import { getDishImage } from '../src/utils/getImage'

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

function assertSafe(url: string): void {
  assert.strictEqual(url.includes(' '), false, 'contains space')
  assert.strictEqual(url.includes(','), false, 'contains comma')
  assert.strictEqual(/[´'’]/.test(url), false, 'contains apostrophe/smart quote')
  assert.strictEqual(/[áéíóúàèìòùäëïöüñçÁÉÍÓÚÃ]/.test(url), false, 'contains accent character')
}

/* ------------------------------------------------------------------ */
/*  Basic safety assertions                                            */
/* ------------------------------------------------------------------ */

function testCase(
  dishName: string,
  category: string,
  family: string,
  variant: Parameters<typeof getDishImage>[0]['variant'],
  expected: string,
): void {
  test(`${family} / ${category} / ${dishName} / ${variant}`, () => {
    const url = getDishImage({ dishName, category, family, variant })
    assertSafe(url)
    equal(url, expected)
  })
}

/* ------------------------------------------------------------------ */
/*  Concrete cases                                                     */
/* ------------------------------------------------------------------ */

console.log('\n📋 getDishImage — exact matches\n')

testCase(
  'Prosciutto', 'le pizze', 'dishes', '148x148',
  '/images/dishes/le-pizze/prosciutto/LE_PIZZE_Prosciutto_148x148.png',
)

testCase(
  'Prosciutto', 'le pizze', 'dishes', '424x400',
  '/images/dishes/le-pizze/prosciutto/LE_PIZZE_Prosciutto_424x400.png',
)

testCase(
  'Pizza all´uovo', 'cuore felice', 'dishes', '148x148',
  '/images/dishes/cuore-felice/pizza-alluovo/CUORE_FELICE_PizzaAlluovo_148x148.png',
)

testCase(
  'Lasagna', 'piatti principali', 'dishes', '148x148',
  '/images/dishes/piatti-principali/lasagna/PIATTI_PRINCIPALI_Lasagna_148x148.png',
)

testCase(
  'Banamisú', 'postres', 'dishes', '148x148',
  '/images/dishes/postres/banamisu/POSTRES_Banamisu_148x148.png',
)

testCase(
  'Croccantino', 'postres', 'dishes', '148x148',
  '/images/dishes/postres/croccantino/POSTRES_Croccantino_148x148.png',
)

testCase(
  'Burrata e panzanella', 'antipasti', 'dishes', '148x148',
  '/images/dishes/antipasti/burrata-e-panzanella/ANTIPASTI_BurrataEPanzanella_148x148.png',
)

testCase(
  'Insalata César', 'insalate', 'dishes', '148x148',
  '/images/dishes/insalate/insalata-cesar/INSALATE_InsalataCesar_148x148.png',
)

testCase(
  'Pinsa mortadella e stracciatella', 'le pizze', 'dishes', '148x148',
  '/images/dishes/le-pizze/pinsa-mortadella-e-stracciatella/LE_PIZZE_PinsaMortadellaEStracciatella_148x148.png',
)

testCase(
  '4 Stagioni', 'le pizze', 'dishes', '148x148',
  '/images/dishes/le-pizze/4-stagioni/LE_PIZZE_4Stagioni_148x148.png',
)

/* ------------------------------------------------------------------ */
/*  Default variant                                                     */
/* ------------------------------------------------------------------ */

console.log('\n📋 getDishImage — default variant\n')

test('default variant is 148x148 (not 148,5x148,5)', () => {
  const url = getDishImage({
    dishName: 'Prosciutto',
    category: 'le pizze',
    family: 'dishes',
  })
  assertSafe(url)
  equal(url, '/images/dishes/le-pizze/prosciutto/LE_PIZZE_Prosciutto_148x148.png')
})

/* ------------------------------------------------------------------ */
/*  Edge cases (return DEFAULT_IMAGE)                                   */
/* ------------------------------------------------------------------ */

console.log('\n📋 getDishImage — edge cases (DEFAULT_IMAGE)\n')

const DEFAULT_IMAGE = '/images/card-reference-image.png'

test('empty dishName → DEFAULT_IMAGE', () => {
  const url = getDishImage({ dishName: '', category: 'le pizze', family: 'dishes' })
  equal(url, DEFAULT_IMAGE)
})

test('empty category → DEFAULT_IMAGE', () => {
  const url = getDishImage({ dishName: 'Prosciutto', category: '', family: 'dishes' })
  equal(url, DEFAULT_IMAGE)
})

test('undefined family → DEFAULT_IMAGE', () => {
  const url = getDishImage({ dishName: 'Prosciutto', category: 'le pizze' })
  equal(url, DEFAULT_IMAGE)
})

/* ------------------------------------------------------------------ */
/*  Other variants                                                     */
/* ------------------------------------------------------------------ */

console.log('\n📋 getDishImage — other variants\n')

testCase(
  'Mozzarella di búfala', 'quesos', 'DOP', '188x188',
  '/images/DOP/quesos/mozzarella-di-bufala/QUESOS_MozzarellaDiBufala_188x188.png',
)

testCase(
  'Sangría di Lambrusco', 'sangrias', 'beverages', '200x320',
  '/images/beverages/sangrias/sangria-di-lambrusco/SANGRIAS_SangriaDiLambrusco_200x320.png',
)

testCase(
  'Garganelli al´uovo', 'tradizionale', 'pastas', '96x96',
  '/images/pastas/tradizionale/garganelli-aluovo/TRADIZIONALE_GarganelliAluovo_96x96.png',
)

/* ------------------------------------------------------------------ */
/*  Report                                                             */
/* ------------------------------------------------------------------ */

console.log(`\n${'─'.repeat(50)}`)
console.log(`  Passed: ${passed}  |  Failed: ${failed}`)
console.log(`${'─'.repeat(50)}\n`)

if (failed > 0) {
  process.exit(1)
}
