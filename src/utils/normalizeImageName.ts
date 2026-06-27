/**
 * Normalizes dish/entity names to ASCII-safe identifiers for image file paths.
 *
 * Problem: dish names from the backend contain accents (á, é, í, ó, ú, ñ, ç, etc.),
 * apostrophes (´, ', ’), and spaces. These work fine on Vercel (UTF-8 everywhere)
 * but break on customer servers that don't normalize Unicode URLs correctly.
 *
 * Solution: strip accents and special chars, producing predictable ASCII paths.
 *
 * Examples:
 *   "Garganelli al´uovo"       -> slug: "garganelli-al-uovo",    camel: "GarganelliAlUovo"
 *   "Tortellone caprese"       -> slug: "tortellone-caprese",    camel: "TortelloneCaprese"
 *   "Pesto Di Mojo Picón"      -> slug: "pesto-di-mojo-picon",   camel: "PestoDiMojoPicon"
 *   "Mozzarella di búfala"     -> slug: "mozzarella-di-bufala",  camel: "MozzarellaDiBufala"
 */

const ACCENT_MAP: Record<string, string> = {
  // lowercase
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
  // uppercase
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

// standalone acute accent (U+00B4) — used in "al´uovo"
const APOSTROPHE_REGEX = /[´`'’]/g

/**
 * Replace accented characters and apostrophes with their ASCII equivalents.
 */
export function stripAccents(value: string): string {
  return value
    .replace(APOSTROPHE_REGEX, '')
    .split('')
    .map((char) => ACCENT_MAP[char] ?? char)
    .join('')
}

/**
 * Convert a dish name to a lowercase kebab-case slug for use as a directory name.
 * "Garganelli al´uovo"  →  "garganelli-al-uovo"
 */
export function toSlug(value: string): string {
  return stripAccents(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

/**
 * Convert a dish name to CamelCase with no spaces for use in the filename portion.
 * "Garganelli al´uovo"  →  "GarganelliAlUovo"
 */
export function toCamelCase(value: string): string {
  const stripped = stripAccents(value).trim().toLowerCase()

  return stripped
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}
