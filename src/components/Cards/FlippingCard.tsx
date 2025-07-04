import FlipIcon from '@/assets/svgs/flip-icon.svg'
import Image from 'next/image'
import { useState } from 'react'
import { CardDialog } from '../Dialog'

interface CardProps {
  children: React.ReactNode
  modalContent?: React.ReactNode
  flipContent?: React.ReactNode
  height?: string
  width?: string
  isFlippable?: boolean
  backgroundCard?: string
  isModalAvailable?: boolean
}

const FlipButton = ({
  onClick,
  isFlipped,
}: {
  onClick: (e: React.MouseEvent) => void
  isFlipped: boolean
}) => (
  <button
    onClick={onClick}
    className={`-top-5 -right-5 px-2 py-1 size-9 absolute text-xs ${
      isFlipped ? 'bg-not-available-main' : 'bg-pasta-main'
    } rounded-full hover:bg-gray-300`}
  >
    {/* <ArrowRightLeft color="white" size={20} /> */}
    <Image src={FlipIcon} alt="Next.js logo" width={20} height={20} />
  </button>
)
export const Card = ({
  children,
  modalContent,
  flipContent,
  height = 'fit-content',
  width = '18rem',
  isFlippable = true,
  backgroundCard = 'bg-white',
  isModalAvailable = true,
}: CardProps) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isModalAvailable) return

    // If the card is flipped, we don't open the dialog
    setIsOpenDialog(!isFlipped)
  }

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFlipped((prev) => !prev)
  }

  return (
    <>
      <CardDialog
        open={isOpenDialog}
        onChangeOpen={setIsOpenDialog}
        className="w-[40rem] h-1/2"
      >
        <div className="flex flex-col justify-center items-center gap-4 mt-5">
          {modalContent}
        </div>
      </CardDialog>

      <div className={``} onClick={handleCardClick} style={{ height, width }}>
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
            <div className={`w-full h-full ${backgroundCard} rounded-lg `}>
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
    </>
  )
}
