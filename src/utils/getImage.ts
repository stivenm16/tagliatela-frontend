import CardReferenceImage from '@/assets/images/card-reference-image.png'
import { StaticImageData } from 'next/image'

type Variant = '148,5x148,5' | '200x200' | '424x400' | '200x320' | '240x440'

interface GetDishImageParams { 
  dishName: string 
  category: string 
  variant?: Variant 
  family?: string
}
export const getDishImage = async ({
  dishName,
  category,
  family,
  variant = '148,5x148,5',
}  : GetDishImageParams
): Promise<string | StaticImageData> => {
    if (!dishName) return CardReferenceImage
  
    const normalized = dishName.split(' ').map(
        word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join('')
  
    try {
      // Try to import dynamically (only if exists)
      const image = await import(
        /* @vite-ignore */
        `@/assets/images/${family}/${category.toLowerCase()}/${dishName}/${category.toUpperCase()}_${normalized}_${variant}.png`
      )
      return image.default
    } catch {
      // fallback to default
      return CardReferenceImage
    }
  }