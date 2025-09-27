import FlipIcon from '@/assets/svgs/flip-icon.svg'
import StarIcon from '@/assets/svgs/star.svg'
import Image from 'next/image'
import React, { useState } from 'react'
import { CardDialog } from '../Dialog/CardDialog'
import { DialogTrigger } from '../Dialog/Dialog'

export const FlipButton = ({
  onClick,
  isFlipped,
}: {
  onClick: (e: React.MouseEvent) => void
  isFlipped: boolean
}) => (
  <button
    onClick={onClick}
    className={`-top-[7px] -right-[7px] flex items-center justify-center size-[32px] absolute text-xs ${
      isFlipped ? 'bg-not-available-main' : 'bg-checkmeeting-main'
    } rounded-full hover:bg-gray-300`}
  >
    {/* <ArrowRightLeft color="white" size={20} /> */}
    <Image src={FlipIcon} alt="Next.js logo" width={20} height={20} />
  </button>
)

interface FlipContentOptions {
  content: React.ReactNode
  icon: string
  label: string
  color: string
  iconWidth?: number
}
interface CardProps {
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
}

interface FlippedState {
  content: React.ReactNode | null
  isFlipped: boolean
  id: string | null
  color: string | null
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
}: CardProps) => {
  const [isFlipped, setIsFlipped] = useState<FlippedState>({
    content: null,
    isFlipped: false,
    id: null,
    color: null,
  })

  const toggleFlip = (
    e: React.MouseEvent,
    content: React.ReactNode,
    id: string,
    color: string,
  ) => {
    e.stopPropagation()
    setIsFlipped((prev) => {
      if (prev.id === id) {
        return {
          content: null,
          isFlipped: !prev.isFlipped,
          id: null,
          color: null,
        }
      }
      return { content: content, isFlipped: true, id, color }
    })
  }

  const parsedSuggestedSizes = {
    height: Number(height.split('rem')[0]) + 0.4,
    width: Number(width.split('rem')[0]) + 0.4,
  }
  return (
    <div className="z-[0]">
      <CardDialog
        className={` ${classNameModal}`}
        contentModal={
          <div className="flex flex-col justify-center  bg-white rounded-3xl items-center gap-4">
            {modalContent}
          </div>
        }
      >
        <div
          style={{
            height: `${parsedSuggestedSizes.height}rem`,
            width: `${parsedSuggestedSizes.width}rem`,
            transformStyle: 'preserve-3d',
            transform: isFlipped.isFlipped
              ? 'rotateY(360deg)'
              : 'rotateY(0deg)',
          }}
          className={`relative transition-transform duration-500  w-full h-full ${
            isSuggested && 'bg-checkmeeting-main'
          } flex items-center justify-center rounded-3xl `}
        >
          {isSuggested && (
            <>
              <div
                className={`absolute top-1 left-1 size-7   z-10 rounded-br-[4px] overflow-hidden`}
              />
              <Image
                src={StarIcon}
                alt="star-icon"
                className="absolute -top-3 -left-3 z-20"
              />
            </>
          )}

          <DialogTrigger>
            <div
              className={`relative text-pasta-main  shadow-xl shadow-black/20 rounded-3xl `}
              style={{ height: height, width }}
            >
              <div
                className={`transition-transform duration-500 relative w-full h-full `}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped.isFlipped
                    ? 'rotateY(180deg)'
                    : 'rotateY(0deg)',
                }}
              >
                {/* Front */}
                <div
                  className={`absolute inset-0 backface-hidden ${
                    isFlipped.isFlipped ? 'invisible' : 'visible'
                  } rounded-3xl`}
                >
                  <div
                    className={`w-full h-full ${backgroundCard} rounded-3xl `}
                  >
                    <div className="h-full">
                      {children}

                      {flipContentOptions ? (
                        <div className="absolute bottom-4 left-14 flex gap-10">
                          {flipContentOptions.map((item, index) => (
                            <div
                              key={index}
                              className={`${item.color} size-10  flex justify-center items-center p-2 rounded-full`}
                              onClick={(e) =>
                                toggleFlip(
                                  e,
                                  item.content,
                                  item.label,
                                  item.color,
                                )
                              }
                            >
                              <Image
                                src={item.icon}
                                alt={item.label}
                                width={item.iconWidth ?? 15}
                                height={24}
                              />
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {isFlippable && (
                  <div
                    className={`absolute inset-0 backface-hidden ${
                      isFlipped ? 'visible' : 'invisible'
                    }`}
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <div
                      className={`w-full h-full ${isFlipped.color}  rounded-3xl `}
                    >
                      {isFlipped.content ?? <p>No back content</p>}
                    </div>

                    <div className="absolute bottom-4 left-14 flex gap-10">
                      {flipContentOptions ? (
                        <>
                          {flipContentOptions.map((item, index) => (
                            <div
                              key={index}
                              className="bg-pasta-main size-10  flex justify-center items-center p-2 rounded-full"
                              onClick={(e) =>
                                toggleFlip(
                                  e,
                                  item.content,
                                  item.label,
                                  item.color,
                                )
                              }
                            >
                              <Image
                                src={item.icon}
                                alt={item.label}
                                width={item.iconWidth ?? 15}
                                height={24}
                              />
                            </div>
                          ))}
                        </>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogTrigger>
        </div>
      </CardDialog>
    </div>
  )
}

export default Card
