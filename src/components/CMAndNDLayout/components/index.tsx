import { ImageComponent } from '@/components/ImageComponent'
import { FamilyType } from '@/types/global'
import { getDishImage } from '@/utils/getImage'
import { MinusIcon } from 'lucide-react'
import { CMAndNDLayoutProps } from '../types'

export const SelectedDishCard = ({
  name,
  category,
  variant,
  id,
  removeDish,
  quantity,
}: {
  name: string
  category: FamilyType
  variant: CMAndNDLayoutProps['variant']
  id: number
  removeDish: (dishId: number, category: FamilyType) => void
  quantity?: number
}) => {
  const imgSrc = getDishImage({
    dishName: name,
    category,
    family: category === FamilyType.SALSAS ? 'sauces' : 'dishes',
  })

  const showQuantity = variant === 'check-meeting'
  const accentColor =
    variant === 'check-meeting'
      ? 'var(--checkmeeting-main)'
      : 'var(--not-available-main)'

  return (
    <div className="flex flex-col items-center gap-1 w-full">
      {/* Image with quantity pill at top-left and remove button at top-right */}
      <div className="relative w-fit">
        {showQuantity && (
          <span className="absolute top-2 left-2 z-10 bg-white/40 backdrop-blur-md rounded-lg px-2 py-0.5 text-xs font-bold text-checkmeeting-main">
            {quantity ?? 1}
          </span>
        )}

        {/* Remove button - top-right inside the image */}
        <button
          type="button"
          onClick={() => removeDish(id, category)}
          className="absolute top-2 right-2 z-10 text-white rounded-full size-7 flex items-center justify-center shadow-md"
          style={{ backgroundColor: accentColor }}
        >
          <MinusIcon size={14} />
        </button>

        {!!imgSrc ? (
          <ImageComponent
            src={imgSrc}
            alt={name}
            className="object-cover size-36 rounded-xl shadow-lg"
          />
        ) : null}
      </div>

      {/* Dish name below */}
      <h2
        className="text-center text-sm uppercase font-semibold mt-1 px-1"
        style={{
          color:
            variant === 'check-meeting'
              ? 'var(--pasta-main)'
              : 'var(--suggested-main)',
        }}
      >
        {name}
      </h2>
    </div>
  )
}

export const Skeletons = ({
  variant,
}: {
  variant: CMAndNDLayoutProps['variant']
}) => {
  return (
    <div className="flex flex-col  w-full h-full gap-6  mx-auto px-16 ml-10">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className=" animate-pulse h-6 w-full rounded mb-4 bg-white/40"
        />
      ))}
    </div>
  )
}
