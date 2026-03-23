import CloseButton from '@/components/buttons/AlertCloseButton'
import { FamilyType } from '@/types/global'
import { getDishImage } from '@/utils/getImage'
import { MinusIcon } from 'lucide-react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CMAndNDLayoutProps } from '../types'

const SideDishesCard = ({
  onClick,
  variant,
  name,
}: {
  onClick: () => void
  variant?: CMAndNDLayoutProps['variant']
  name: string
}) => {
  return (
    <div className="flex w-full my-2 justify-between gap-2 px-2">
      <button
        onClick={onClick}
        className={`  
        }  text-white rounded-full size-8 flex items-center justify-center`}
        style={{
          backgroundColor:
            variant === 'no-disponibles'
              ? 'var(--not-available-main)'
              : 'var(--checkmeeting-main)',
        }}
      >
        <MinusIcon />
      </button>
      <h2
        className="flex self-center mr-auto ml-2 text-md uppercase font-semibold"
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
export const SelectedDishCard = ({
  name,
  category,
  variant,
  id,
  removeDish,
}: {
  name: string
  category: FamilyType
  variant: CMAndNDLayoutProps['variant']
  id: number
  removeDish: (dishId: number, category: FamilyType) => void
}) => {
  const [imgSrc, setImgSrc] = useState<StaticImport | string>('')

  useEffect(() => {
    let isMounted = true
    if (category === FamilyType.VINAGRETAS) return
    getDishImage({ dishName: name, category, family: 'dishes' }).then((src) => {
      if (isMounted) setImgSrc(src as any)
    })
    return () => {
      isMounted = false
    }
  }, [name, category])

  return (
    <div className="flex flex-col w-full h-full relative  justify-center items-center gap-2">
      {category.toLowerCase() === 'guarniciones' ||
      category.toLowerCase() === 'vinagretas' ? (
        <div className="flex w-full">
          <SideDishesCard
            onClick={() => removeDish(id, category)}
            variant={variant}
            name={name}
          />
        </div>
      ) : (
        <>
          <div className="relative my-1">
            <CloseButton
              onClick={() => removeDish(id, category)}
              variant={variant}
              icon={<MinusIcon />}
            />
            {!!imgSrc ? (
              <Image
                src={imgSrc}
                alt={name}
                className="object-cover size-40 rounded-xl shadow-lg"
              />
            ) : null}
          </div>

          <h2
            className="text-center text-md uppercase font-semibold mb-2"
            style={{
              color:
                variant === 'check-meeting'
                  ? 'var(--pasta-main)'
                  : 'var(--suggested-main)',
            }}
          >
            {name}
          </h2>
        </>
      )}
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
