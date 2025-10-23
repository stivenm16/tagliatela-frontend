import CardReferenceImage from '@/assets/images/card-reference-image.png'
import { StaticImageData } from 'next/image'

type Variant = '148,5x148,5' | '200x200' | '424x400'
export const getDishImage = async (dishName: string, category: string, variant: Variant = '148,5x148,5'): Promise<string | StaticImageData> => {
    if (!dishName) return CardReferenceImage
  
    const normalized = dishName.split(' ').map(
        word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join('')
  
    try {
      // Try to import dynamically (only if exists)
      const image = await import(
        /* @vite-ignore */
        `@/assets/images/dishes/${category.toLowerCase()}/${dishName}/${category.toUpperCase()}_${normalized}_${variant}.png`
      )
      return image.default
    } catch {
      // fallback to default
      return CardReferenceImage
    }
  }