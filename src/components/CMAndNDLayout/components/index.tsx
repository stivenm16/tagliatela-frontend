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
      <div className="flex items-center justify-center gap-2 w-full">
        {/* Image with quantity pill at top-left */}
        <div className="relative w-fit">
          {showQuantity && (
            <span className="absolute top-2 left-2 z-10 bg-white/70 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-bold text-checkmeeting-main">
              {quantity ?? 1}
            </span>
          )}
          {!!imgSrc ? (
            <ImageComponent
              src={imgSrc}
              alt={name}
              className="object-cover size-36 rounded-xl shadow-lg"
            />
          ) : null}
        </div>

        {/* Remove button */}
        <button
          type="button"
          onClick={() => removeDish(id, category)}
          className="text-white rounded-full size-8 flex items-center justify-center"
          style={{ backgroundColor: accentColor }}
        >
          <MinusIcon size={16} />
        </button>
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
