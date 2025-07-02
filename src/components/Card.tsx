import { useState } from 'react'
import { CardDialog } from './Dialog'

interface CardProps {
  children: React.ReactNode
  modalContent?: React.ReactNode
}
export const Card = ({ children, modalContent }: CardProps) => {
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
          {modalContent}
        </div>
      </CardDialog>
      <div
        className="w-[18rem] py-6 h-fit bg-neutral-50 rounded-xl flex flex-col items-center justify-evenly gap-2 cursor-pointer"
        onClick={onCLick}
      >
        {children}
      </div>
    </>
  )
}
