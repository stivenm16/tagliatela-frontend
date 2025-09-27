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
interface CardProps {
  children: React.ReactNode
  modalContent?: React.ReactNode
  flipContent?: React.ReactNode
  height?: string
  width?: string
  classNameModal?: string
  isFlippable?: boolean
  backgroundCard?: string
  isModalAvailable?: boolean
  isSuggested?: boolean
}
const Card = ({
  children,
  modalContent,
  flipContent,
  height = 'fit-content',
  width = '18rem',
  isFlippable = true,
  backgroundCard = 'bg-white',
  classNameModal,
  isSuggested = false,
}: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFlipped((prev) => !prev)
  }

  const parsedSuggestedSizes = {
    height: Number(height.split('rem')[0]) + 0.4,
    width: Number(width.split('rem')[0]) + 0.4,
  }
  return (
    <div className="z-[0]">
      <CardDialog
        className={`w-[30rem] ${classNameModal}`}
        contentModal={
          <div className="flex flex-col justify-center bg-white rounded-3xl items-center gap-4">
            {modalContent}
          </div>
        }
      >
        <div
          style={{
            height: `${parsedSuggestedSizes.height}rem`,
            width: `${parsedSuggestedSizes.width}rem`,
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(360deg)' : 'rotateY(0deg)',
          }}
          className={`relative transition-transform duration-500  w-full h-full ${
            isSuggested && 'bg-checkmeeting-main'
          } flex items-center justify-center rounded-3xl `}
        >
          {isSuggested && (
            <>
              <div
                className={`absolute top-1 left-1 size-7  ${
                  isFlipped ? 'bg-checkmeeting-main' : 'bg-white'
                } z-10 rounded-br-[4px] overflow-hidden`}
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
              className={`relative text-pasta-main shadow-xl shadow-black/20 rounded-3xl `}
              style={{ height: height, width }}
            >
              <div
                className={`transition-transform duration-500 relative w-full h-full `}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front */}
                <div
                  className={`absolute inset-0 backface-hidden ${
                    isFlipped ? 'invisible' : 'visible'
                  } rounded-3xl`}
                >
                  <div
                    className={`w-full h-full ${backgroundCard} rounded-3xl `}
                  >
                    <div className="">{children}</div>
                    {isFlippable && (
                      <FlipButton onClick={toggleFlip} isFlipped={isFlipped} />
                    )}
                  </div>
                </div>

                {isFlippable && (
                  <div
                    className={`absolute inset-0 backface-hidden ${
                      isFlipped ? 'visible' : 'invisible'
                    }`}
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <div className="w-full h-full bg-checkmeeting-main  rounded-3xl ">
                      {flipContent ?? <p>No back content</p>}
                      <FlipButton onClick={toggleFlip} isFlipped={isFlipped} />
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
