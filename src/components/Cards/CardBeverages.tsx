import ItalianImg from '@/assets/images/italian-flag.png'
import BottleIcon from '@/assets/svgs/bottle.svg'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useState } from 'react'
import { CardDialog } from '../Dialog/Dialog'

interface CardBeveragesProps {
  title: string
  img: string | StaticImport
  origin: 'italino' | string
  modalContent?: React.ReactNode
  classNameModal?: string
}
const CardBeverages = ({
  title,
  origin,
  img,
  modalContent,
  classNameModal,
}: CardBeveragesProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  return (
    <>
      <CardDialog
        open={isOpenModal}
        onChangeOpen={setIsOpenModal}
        className={`w-[33rem] ${classNameModal}`}
      >
        <div className="flex flex-col justify-center items-center gap-4 mt-5">
          {modalContent}
        </div>
      </CardDialog>
      <div className=" w-fit" onClick={() => setIsOpenModal(true)}>
        <Image src={img} alt={title} />
        <div className="flex  items-center mt-6 ">
          <Image src={BottleIcon} alt={title} />
          <div className="flex flex-col gap-3 pl-4 w-40 ">
            <span className="uppercase font-bold w-44 text-wrap">{title}</span>
            <div className="flex w-full gap-3">
              <Image src={ItalianImg} alt="Italian flag" className="" />
              <span className="text-lg ">{origin}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardBeverages
