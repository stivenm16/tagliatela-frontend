import Image from 'next/image'
import { useState } from 'react'
import { CardDialog } from './Dialog'

interface CardProps {
  img?: string
  title?: string
  description?: string
}
export const Card = ({ img, title, description }: CardProps) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const onCLick = () => {
    setIsOpenDialog(true)
  }
  return (
    <>
      <CardDialog
        open={isOpenDialog}
        onChangeOpen={setIsOpenDialog}
        className="w-[18rem]"
      >
        <div className="flex flex-col justify-center items-center gap-4  mt-5">
          <Image src={img || ''} alt={title || ''} width={100} height={100} />
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </CardDialog>
      <div
        className="w-[18rem] px-2 h-96 hover:bg-accent-2 bg-neutral-100 rounded-xl flex flex-col items-center justify-evenly gap-2 cursor-pointer"
        onClick={onCLick}
      >
        <Image src={img || ''} alt={title || ''} width={150} height={50} />
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </>
  )
}
