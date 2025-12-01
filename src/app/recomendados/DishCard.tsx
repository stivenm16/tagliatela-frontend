import InfoIcon from '@/assets/svgs/info-icon.svg'
import { getDishImage } from '@/utils/getImage'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React, { JSX, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Dish } from './page'
interface Props {
  content: JSX.Element
  label: string
  id: string
  openId: string | null
  setOpenId: (id: string | null) => void
  yAxis?: number
}
function InfoWithPortal({
  content,
  id,
  openId,
  setOpenId,
  label,
  yAxis,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const isOpen = openId === id
  const [pos, setPos] = useState({ left: 0, top: 0 })
  const [flip, setFlip] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        ref.current &&
        !ref.current.contains(target) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(target)
      ) {
        setOpenId(null)
      }
    }

    const handleScrollOrDrag = () => {
      setOpenId(null)
    }

    document.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', handleScrollOrDrag, true)
    window.addEventListener('touchmove', handleScrollOrDrag, { passive: true })

    return () => {
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('scroll', handleScrollOrDrag, true)
      window.removeEventListener('touchmove', handleScrollOrDrag)
    }
  }, [isOpen, setOpenId])

  useLayoutEffect(() => {
    if (!isOpen || !ref.current) return

    const rect = ref.current.getBoundingClientRect()

    const tooltipWidth = 150
    const spaceRight = window.innerWidth - rect.right
    const needsFlip = spaceRight < tooltipWidth + 12

    setFlip(needsFlip)
    setPos({ left: rect.left + rect.width / 2, top: rect.top })
  }, [isOpen])

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenId(isOpen ? null : id)
  }

  return (
    <>
      <div
        ref={ref}
        onClick={handleToggle}
        className="flex items-center gap-2 cursor-pointer z-20 w-full"
      >
        <InfoIcon />
        <span className="pt-[1px]">{label}</span>
      </div>

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed z-[9999] pointer-events-auto"
            style={{
              left: pos.left,
              top: pos.top,
              transform: flip
                ? `translate(-100%, -120%)`
                : `translate(10%, -${yAxis ? yAxis : 120}%)`,
            }}
          >
            <div
              ref={tooltipRef}
              className={`bg-suggested-main p-3 text-sm shadow-lg w-[15rem] max-w-xs rounded-xl ${
                flip ? 'rounded-br-none' : 'rounded-bl-none'
              }`}
            >
              {content}
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
const DishCard = ({
  item,
  openTooltipId,
  setOpenTooltipId,
}: {
  item: Dish
  openTooltipId: string | null
  setOpenTooltipId: (id: string | null) => void
}) => {
  const [imgSrc, setImgSrc] = useState<StaticImport | string>('')

  useEffect(() => {
    let isMounted = true
    getDishImage({
      dishName: item.name,
      category: item.type,
      family: 'dishes',
    }).then((src) => {
      if (isMounted) setImgSrc(src as any)
    })
    return () => {
      isMounted = false
    }
  }, [item.name])

  return (
    <div className="flex flex-col items-center gap-2 p-4 h-full w-full ">
      <h2 className="capitalize text-center font-bold text-xl h-16 self-center flex items-center">
        {item.name}
      </h2>
      <div className="relative overflow-visible">
        {!!imgSrc ? (
          <Image
            src={imgSrc}
            alt={item.name}
            width={210}
            height={50}
            className="rounded-2xl overflow-hidden"
          />
        ) : (
          <div className="w-[210px] h-[150px] bg-gray-200 animate-pulse rounded-2xl" />
        )}
        {item.type.toLowerCase() === 'insalate' ? (
          <div
            className="bg-suggested-main  rounded-tl-full text-center h-8 flex items-center text-[13px] justify-start pl-4 text-white uppercase absolute w-full bottom-0"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <InfoWithPortal
              content={
                <div className="text-pasta-main capitalize">
                  Vinagretas:{' '}
                  <span className="text-white lowercase">
                    {item.vinaigrettes.map((v) => v.name).join(', ')}
                  </span>
                </div>
              }
              label="Vinagretas"
              id={item.id.toString()}
              openId={openTooltipId}
              setOpenId={setOpenTooltipId}
            />
          </div>
        ) : null}
        {item?.flavorsIceCream.length > 0 ? (
          <div
            className="bg-suggested-main  rounded-tl-full text-center h-8 flex items-center text-[13px] justify-start pl-4 text-white uppercase absolute w-full bottom-0"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <InfoWithPortal
              content={
                <div className="text-pasta-main capitalize">
                  Helados:{' '}
                  <span className="text-white lowercase">
                    {item.flavorsIceCream.map((v) => v.name).join(', ')}
                  </span>
                </div>
              }
              label="Sabores de helado"
              id={item.id.toString()}
              openId={openTooltipId}
              setOpenId={setOpenTooltipId}
            />
          </div>
        ) : null}

        {item.name.toLowerCase() === 'entrecot' ? (
          <div
            className="bg-suggested-main  rounded-tl-full text-center h-8 flex items-center text-[13px] justify-start pl-4 text-white uppercase absolute w-full bottom-0"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <InfoWithPortal
              label="Salsas y Guarniciones"
              content={
                <div className="flex flex-col gap-2 p-2 ">
                  <div className="text-pasta-main capitalize">
                    Salsas:{' '}
                    <span className="text-white lowercase">
                      Regio Emilia y Queso Azul
                    </span>
                  </div>
                  <div className="text-pasta-main capitalize">
                    Guarniciones:{' '}
                    <span className="text-white lowercase">
                      {item.side_dishes.map((s) => s.name).join(', ')}
                    </span>
                  </div>
                </div>
              }
              yAxis={105}
              id={item.id.toString()}
              openId={openTooltipId}
              setOpenId={setOpenTooltipId}
            />
          </div>
        ) : null}
      </div>
      <h2 className="font-medium text-sm text-center">
        {item.description!.slice(0, 80)}...
      </h2>
    </div>
  )
}

export default DishCard
