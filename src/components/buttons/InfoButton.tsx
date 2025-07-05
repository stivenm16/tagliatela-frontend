import { Info } from 'lucide-react'
import { useState } from 'react'
import { CardDialog } from '../Dialog/Dialog'

interface CardProps {
  description?: string
}
export const InfoButton = ({ description }: CardProps) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const onCLick = () => {
    setIsOpenDialog(true)
  }
  return (
    <>
      <CardDialog
        open={isOpenDialog}
        onChangeOpen={setIsOpenDialog}
        className="w-[20rem]"
      >
        <div className="flex flex-col justify-center items-center gap-4  mt-2">
          <Info />
          <p>{description}</p>
        </div>
      </CardDialog>

      <Info onClick={onCLick} />
    </>
  )
}
