import CardReferenceImage from '@/assets/images/card-reference-image.png'
import { StaticImageData } from 'next/image'
export const getDishImage = async (dishName: string, category: string): Promise<string | StaticImageData> => {
    if (!dishName) return CardReferenceImage
  
    const normalized = dishName.split(' ').map(
        word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join('')
  
    try {
      // Try to import dynamically (only if exists)
      const image = await import(
        /* @vite-ignore */
        `@/assets/images/dishes/${category.toLowerCase()}/${dishName}/${category.toUpperCase()}_${normalized}_148,5x148,5.png`
      )
      return image.default
    } catch {
      // fallback to default
      return CardReferenceImage
    }
  }