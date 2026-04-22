type Variant =
  | '148,5x148,5'
  | '200x200'
  | '424x400'
  | '200x320'
  | '240x440'
  | '188x188'

interface GetDishImageParams {
  dishName: string
  category: string
  variant?: Variant
  family?: string
}

const DEFAULT_IMAGE = '/images/card-reference-image.png'

const normalizeDishName = (value: string) =>
  value
    .split(' ')
    .map(
      word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('')

export const getDishImage = ({
  dishName,
  category,
  family,
  variant = '148,5x148,5',
}: GetDishImageParams): string => {
  if (!dishName || !category || !family) return DEFAULT_IMAGE

  const normalized = normalizeDishName(dishName)

  return `/images/${family}/${category.toLowerCase()}/${dishName}/${category.toUpperCase()}_${normalized}_${variant}.png`
}