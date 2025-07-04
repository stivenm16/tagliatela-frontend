import { CardDialog } from '@/components/Dialog'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'

interface SauceDialogProps {
  openModal: boolean
  setOpenModal: (open: boolean) => void
  selectedSauceId: number | null
  sauces: { id: number; title: string }[]
  SauceImg: string | StaticImport
  PastaImg: string | StaticImport
}
const SauceDialog = ({
  openModal,
  setOpenModal,
  selectedSauceId,
  sauces,
  SauceImg,
  PastaImg,
}: SauceDialogProps) => {
  return (
    <CardDialog
      open={openModal}
      onChangeOpen={setOpenModal}
      className="w-[28rem] h-2/3"
    >
      <div className="flex flex-col  items-center gap-4 ">
        <h2 className="text-2xl font-bold text-pasta-main">
          {sauces.find((sauce) => sauce.id === selectedSauceId)?.title}
        </h2>
        <Image
          src={SauceImg}
          alt="Salsa"
          className="w-full h-40 object-cover rounded-sm"
          width={160}
          height={160}
        />
        <div>
          <h3 className="uppercase font-bold text-not-available-main my-4 text-center">
            Pasta Tradizionales
          </h3>
          <div className="flex items-center gap-8 mt-2 justify-center">
            <div className="flex flex-col items-center gap-2">
              <Image
                src={PastaImg}
                alt="Pasta"
                className="size-24 object-cover rounded-full"
                width={100}
                height={160}
              />
              <span className="uppercase text-center">Riagtone</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image
                src={PastaImg}
                alt="Pasta"
                className="size-24 object-cover rounded-full"
                width={100}
                height={160}
              />
              <span className="uppercase text-center">Riagtone</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image
                src={PastaImg}
                alt="Pasta"
                className="size-24 object-cover rounded-full"
                width={100}
                height={160}
              />
              <span className="uppercase text-center">Riagtone</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="uppercase font-bold text-beverages-main my-4 text-center">
            Pasta Ripiena
          </h3>
          <div className="flex items-center gap-8 mt-2 justify-center">
            <div className="flex flex-col items-center gap-2">
              <Image
                src={PastaImg}
                alt="Pasta"
                className="size-24 object-cover rounded-full"
                width={100}
                height={160}
              />
              <span className="uppercase text-center">Riagtone</span>
            </div>
          </div>
        </div>
      </div>
    </CardDialog>
  )
}

export default SauceDialog
