import { toCamelCase, toSlug } from './normalizeImageName'

type Variant =
  | '148,5x148,5'
  | '200x200'
  | '424x400'
  | '200x320'
  | '240x440'
  | '188x188'
  | '96x96'

interface GetDishImageParams {
  dishName: string
  category: string
  variant?: Variant
  family?: string
}

const DEFAULT_IMAGE = '/images/card-reference-image.png'

export const getDishImage = ({
  dishName,
  category,
  family,
  variant = '148,5x148,5',
}: GetDishImageParams): string => {
  if (!dishName || !category || !family) return DEFAULT_IMAGE

  const slugDir = toSlug(dishName)
  const camelName = toCamelCase(dishName)

  return `/images/${family}/${category.toLowerCase()}/${slugDir}/${category.toUpperCase()}_${camelName}_${variant}.png`
}
