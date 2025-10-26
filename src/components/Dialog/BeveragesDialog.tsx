import ItalianImg from '@/assets/images/italian-flag.png'
import SpanishFlag from '@/assets/images/spanish-flag.png'
import BottleIcon from '@/assets/svgs/bottle.svg'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

interface BeveragesDialogProps {
  title: string
  img: string | StaticImport
  origin?: string
  ingredients?: string[]
  description?: string
  pairing?: string[]
  qualities?: string[]
  showFlag?: boolean
}
const BeveragesDialogContent = ({
  title,
  img,
  origin,
  description,
  showFlag,
}: BeveragesDialogProps) => {
  return (
    <div className="flex h-[25rem] gap-8 w-full">
      {img ? (
        <Image
          src={img}
          alt={title}
          className="rounded-2xl shadow-xl object-cover"
          width={200}
          height={400}
        />
      ) : null}
      <div className="flex  flex-col gap-4">
        <span className="capitalize text-3xl font-bold ml-3">{title}</span>
        {origin && showFlag && (
          <div className="flex gap-3 px-3">
            {origin.toLowerCase() === 'italiano' ? (
              <Image
                src={ItalianImg}
                alt="Italian flag"
                width={50}
                height={50}
              />
            ) : (
              <Image
                src={SpanishFlag}
                alt="Spanish flag"
                width={50}
                height={50}
              />
            )}
          </div>
        )}
        <div className="flex flex-col gap-3 justify-between  text-xl">
          {description && (
            <div className="flex flex-col px-3">
              <span className="text-beverages-main ">Descripción:</span>
              <div className="flex flex-col w-[17rem] font-light">
                {description}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export const WineDialogContent = ({
  title,
  origin,
  ingredients,
  pairing,
  description,
}: BeveragesDialogProps) => {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex">
          {origin && (
            <div className="flex gap-3 px-3">
              {origin.toLowerCase() === 'italia' ? (
                <Image
                  src={ItalianImg}
                  alt="Italian flag"
                  width={50}
                  height={50}
                />
              ) : (
                <Image
                  src={SpanishFlag}
                  alt="Spanish flag"
                  width={50}
                  height={50}
                />
              )}
            </div>
          )}
          <span className="capitalize text-3xl font-bold ml-3">{title}</span>
        </div>
        <div className="flex flex-col gap-3 justify-between mt-auto text-xl">
          <div className="flex mt-5">
            {description && (
              <div className="flex flex-col px-3 gap-2">
                <BottleIcon />
                <div className="flex flex-col w-[15rem]">{description}</div>
              </div>
            )}

            {pairing && pairing?.length > 0 && (
              <div className="flex flex-col">
                <span className="text-beverages-main ml-3 mb-2 font-bold">
                  Maridaje:
                </span>
                <div className="flex flex-col h-56 bg-gray-100 px-3 py-2 rounded-lg overflow-y-scroll ">
                  {pairing.map((ingredient, index) => (
                    <span className="" key={index}>
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeveragesDialogContent
