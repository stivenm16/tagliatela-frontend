import StarIcon from '@/assets/svgs/star.svg'
import { FlipButton } from '@/components/Cards/Card'
import Image from 'next/image'
import React, { useState } from 'react'
import { CardDialog } from './dialog/CardDialog'
import { DialogTrigger } from './dialog/Dialog'

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
const CardRefactor = ({
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
    height: Number(height.split('rem')[0]) + 0.5,
    width: Number(width.split('rem')[0]) + 0.5,
  }
  return (
    <div>
      <CardDialog
        className={`w-[30rem] ${classNameModal}`}
        contentModal={
          <div className="flex flex-col justify-center bg-white rounded-lg items-center gap-4 mt-5">
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
          className={`relative transition-transform duration-500 w-full h-full ${
            isSuggested && 'bg-suggested-main'
          } flex items-center justify-center rounded-xl`}
        >
          {isSuggested && (
            <>
              <div
                className={`absolute top-0 left-0 size-7  ${
                  isFlipped ? 'bg-pasta-main' : 'bg-white'
                } z-10 rounded-br-[4px] overflow-hidden`}
              />
              <Image
                src={StarIcon}
                alt="star-icon"
                className="absolute -top-4 -left-4 z-20"
              />
            </>
          )}

          <DialogTrigger>
            <div
              className={`relative text-pasta-main`}
              style={{ height: height, width }}
            >
              <div
                className={`transition-transform duration-500 relative w-full h-full`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front */}
                <div
                  className={`absolute inset-0 backface-hidden ${
                    isFlipped ? 'invisible' : 'visible'
                  }`}
                >
                  <div
                    className={`w-full h-full ${backgroundCard} rounded-lg `}
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
                    <div className="w-full h-full bg-pasta-main  rounded-lg ">
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

export default CardRefactor
