import CloseButton from '@/components/buttons/AlertCloseButton'
import { ImageComponent } from '@/components/ImageComponent'
import { FamilyType } from '@/types/global'
import { getDishImage } from '@/utils/getImage'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { CMAndNDLayoutProps } from '../types'

const QuantityControl = ({
  quantity,
  onIncrease,
  onDecrease,
  variant,
}: {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  variant: CMAndNDLayoutProps['variant']
}) => {
  const btnColor =
    variant === 'no-disponibles'
      ? 'var(--not-available-main)'
      : 'var(--checkmeeting-main)'

  return (
    <div className="flex items-center gap-2 mt-1">
      <button
        onClick={onDecrease}
        className="text-white rounded-full size-7 flex items-center justify-center text-sm font-bold"
        style={{ backgroundColor: btnColor }}
      >
        <MinusIcon size={14} />
      </button>
      <span className="text-white font-bold text-lg min-w-[1.5rem] text-center">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className="text-white rounded-full size-7 flex items-center justify-center text-sm font-bold"
        style={{ backgroundColor: btnColor }}
      >
        <PlusIcon size={14} />
      </button>
    </div>
  )
}

export const SelectedDishCard = ({
  name,
  category,
  variant,
  id,
  removeDish,
  quantity,
  onQuantityChange,
}: {
  name: string
  category: FamilyType
  variant: CMAndNDLayoutProps['variant']
  id: number
  removeDish: (dishId: number, category: FamilyType) => void
  quantity?: number
  onQuantityChange?: (category: FamilyType, dishId: number, delta: number) => void
}) => {
  const imgSrc = getDishImage({
    dishName: name,
    category,
    family: category === FamilyType.SALSAS ? 'sauces' : 'dishes',
  })

  const showQuantity = variant === 'check-meeting' && onQuantityChange
  const accentColor =
    variant === 'check-meeting' ? 'var(--checkmeeting-main)' : 'var(--not-available-main)'

  if (category.toLowerCase() === 'guarniciones' || category.toLowerCase() === 'vinagretas') {
    return (
      <div className="flex w-full items-center justify-between px-2 my-1">
        <button
          onClick={() => removeDish(id, category)}
          className="text-white rounded-full size-7 flex items-center justify-center"
          style={{ backgroundColor: accentColor }}
        >
          <MinusIcon size={14} />
        </button>
        <h2
          className="text-md uppercase font-semibold mx-2"
          style={{
            color: variant === 'check-meeting' ? 'var(--pasta-main)' : 'var(--suggested-main)',
          }}
        >
          {name}
        </h2>
        {showQuantity && (
          <QuantityControl
            quantity={quantity ?? 1}
            onIncrease={() => onQuantityChange(category, id, 1)}
            onDecrease={() => onQuantityChange(category, id, -1)}
            variant={variant}
          />
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-1 w-full">
      {/* Image container with X badge at top-right and quantity at bottom-right */}
      <div className="relative w-fit">
        {/* X badge - uses z-index to stay above image */}
        <CloseButton
          onClick={() => removeDish(id, category)}
          variant={variant}
          icon={<MinusIcon />}
        />
        {!!imgSrc ? (
          <ImageComponent
            src={imgSrc}
            alt={name}
            className="object-cover size-36 rounded-xl shadow-lg"
          />
        ) : null}

        {/* Quantity bar overlaid at bottom of image */}
        {showQuantity && (
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 py-1.5 rounded-b-xl"
            style={{ backgroundColor: accentColor }}
          >
            <button
              onClick={() => onQuantityChange(category, id, -1)}
              className="text-white rounded-full size-6 flex items-center justify-center bg-black/20 hover:bg-black/30"
            >
              <MinusIcon size={12} />
            </button>
            <span className="text-white font-bold text-sm min-w-[1.2rem] text-center">
              {quantity ?? 1}
            </span>
            <button
              onClick={() => onQuantityChange(category, id, 1)}
              className="text-white rounded-full size-6 flex items-center justify-center bg-black/20 hover:bg-black/30"
            >
              <PlusIcon size={12} />
            </button>
          </div>
        )}
      </div>

      {/* Dish name below */}
      <h2
        className="text-center text-sm uppercase font-semibold mt-1 px-1"
        style={{
          color: variant === 'check-meeting' ? 'var(--pasta-main)' : 'var(--suggested-main)',
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
