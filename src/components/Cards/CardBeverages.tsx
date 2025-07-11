import ItalianImg from '@/assets/images/italian-flag.png'
import SpanishFlag from '@/assets/images/spanish-flag.png'
import BottleIcon from '@/assets/svgs/bottle.svg'
import { DialogTrigger } from '@/components/Dialog/Dialog'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useState } from 'react'
import { CardDialog } from '../Dialog/CardDialog'

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
        contentModal={
          <div className="flex bg-white p-8 rounded-md flex-col justify-center items-center gap-4 mt-5">
            {modalContent}
          </div>
        }
      >
        <DialogTrigger>
          <div className=" w-fit" onClick={() => setIsOpenModal(true)}>
            <Image src={img} alt={title} />
            <div className="flex mt-3 ">
              <Image src={BottleIcon} alt={title} className="mt-auto" />
              <div className="flex flex-col gap-1 pl-4 w-40 mt-auto">
                <span className="uppercase w-fit text-left leading-6 font-bold text-wrap">
                  {title}
                </span>
                <div className="flex w-full gap-3">
                  {origin.toLowerCase() === 'italiano' ? (
                    <Image src={ItalianImg} alt="Italian flag" className="" />
                  ) : (
                    <Image src={SpanishFlag} alt="Italian flag" className="" />
                  )}

                  <span className="text-lg ">{origin}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
      </CardDialog>
    </>
  )
}

export default CardBeverages
