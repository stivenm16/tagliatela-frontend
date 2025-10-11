import FlipIcon from '@/assets/svgs/flip-icon.svg'
import StarIcon from '@/assets/svgs/star.svg'
import React, { useState } from 'react'
import { CardDialog } from '../Dialog/CardDialog'
import { DialogTrigger } from '../Dialog/Dialog'

interface FlipContentOptions {
  content: React.ReactNode
  icon: string
  label: string
  color: string
  iconWidth?: number
}
interface CardProps {
  flipContent?: React.ReactNode
  children: React.ReactNode
  modalContent?: React.ReactNode
  flipContentOptions?: FlipContentOptions[]
  height?: string
  width?: string
  classNameModal?: string
  isFlippable?: boolean
  backgroundCard?: string
  isModalAvailable?: boolean
  isSuggested?: boolean
  hasPairing?: boolean
}

interface FlippedState {
  isFlipped: boolean
  activeId: string | null
}
const Card = ({
  children,
  modalContent,
  flipContentOptions,
  height = 'fit-content',
  width = '18rem',
  isFlippable = true,
  backgroundCard = 'bg-white',
  classNameModal,
  isSuggested = false,
  hasPairing = false,
}: CardProps) => {
  const [flipState, setFlipState] = useState<FlippedState>({
    isFlipped: false,
    activeId: null,
  })

  const toggleFlip = (e: React.MouseEvent, id?: string) => {
    e.stopPropagation()
    setFlipState((prev) => {
      // Case: going back to front
      if (prev.isFlipped && prev.activeId === id) {
        return { isFlipped: false, activeId: null }
      }
      // Case: new back face selected
      return { isFlipped: true, activeId: id ?? null }
    })
  }

  const activeBack = flipContentOptions?.find(
    (opt) => opt.label === flipState.activeId,
  )

  const parsedSuggestedSizes = {
    height: Number(height.split('rem')[0]) + 0.4,
    width: Number(width.split('rem')[0]) + 0.4,
  }
  return (
    <>
      <div className="z-[0]">
        <CardDialog
          className={classNameModal}
          contentModal={
            <div className="flex flex-col justify-center  shadow-2xl rounded-3xl items-center gap-4">
              {modalContent}
            </div>
          }
        >
          <div
            style={{
              height: `${parsedSuggestedSizes.height}rem`,
              width: `${parsedSuggestedSizes.width}rem`,
              perspective: '1000px',
            }}
            className="relative flex items-center justify-center rounded-3xl"
          >
            <DialogTrigger>
              <div
                className="relative text-pasta-main shadow-xl shadow-black/20 rounded-3xl w-full h-full"
                style={{ height, width }}
              >
                {/* Rotating wrapper */}
                <div
                  className="transition-transform duration-500 relative w-full h-full"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flipState.isFlipped
                      ? 'rotateY(180deg)'
                      : 'rotateY(0deg)',
                  }}
                >
                  {/* Front */}
                  <div
                    className={`absolute inset-0 backface-hidden rounded-3xl ${
                      flipState.isFlipped
                        ? 'pointer-events-none'
                        : 'pointer-events-auto'
                    }`}
                  >
                    <div
                      className={`w-full h-full ${backgroundCard} rounded-3xl relative`}
                    >
                      {/* 🔴 Suggested border layer goes here */}
                      {isSuggested && (
                        <div className="absolute inset-0 rounded-3xl ring-4 ring-checkmeeting-main">
                          {/* Optional star */}
                          <StarIcon />
                        </div>
                      )}

                      <div className="h-full relative z-10">
                        {children}

                        {flipContentOptions && (
                          <div className="absolute bottom-6 left-0 flex  gap-10 w-full ">
                            <div className="flex mx-auto gap-20">
                              {flipContentOptions.map((item, i) => {
                                if (!hasPairing && i === 0) return null
                                return (
                                  <button
                                    key={item.label}
                                    className={`${item.color} size-10 flex justify-center items-center p-2 rounded-full`}
                                    onClick={(e) => toggleFlip(e, item.label)}
                                  >
                                    <item.icon
                                      className={item.iconWidth ?? 'w-[1px5]'}
                                    />
                                    {/* <Image
                                      src={item.icon}
                                      alt={item.label}
                                      width={item.iconWidth ?? 15}
                                      height={24}
                                    /> */}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  {isFlippable && (
                    <div
                      className={`absolute inset-0 backface-hidden rounded-3xl ${
                        flipState.isFlipped
                          ? 'pointer-events-auto'
                          : 'pointer-events-none'
                      }`}
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      <div
                        className={`w-full h-full ${
                          activeBack?.color ?? 'bg-gray-200'
                        } rounded-3xl flex   relative`}
                      >
                        {/* 🔴 Match suggested border on back too */}
                        {isSuggested && (
                          <div className="absolute inset-0 rounded-3xl ring-4 ring-checkmeeting-main" />
                        )}

                        {activeBack?.content}
                      </div>

                      {/* Flip back button */}
                      {flipState.isFlipped && (
                        <div className="absolute bottom-6 flex gap-10 justify-center items-center  w-full">
                          <button
                            className="size-10 flex justify-center items-center p-2 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation()
                              setFlipState({ isFlipped: false, activeId: null })
                            }}
                          >
                            {activeBack?.icon ? (
                              <activeBack.icon />
                            ) : (
                              <FlipIcon />
                            )}
                            {/* <Image
                              src={activeBack?.icon ?? FlipIcon}
                              alt={activeBack?.label ?? 'back'}
                              width={activeBack?.iconWidth ?? 15}
                              height={24}
                            /> */}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </DialogTrigger>
          </div>
        </CardDialog>
      </div>
    </>
  )
}

export default Card
