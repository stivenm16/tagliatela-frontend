import ItalianImg from '@/assets/images/italian-flag.png'
import SpanishFlag from '@/assets/images/spanish-flag.png'
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
}
const BeveragesDialogContent = ({
  title,
  img,
  origin,
  ingredients,
  pairing,
  description,
  qualities,
}: BeveragesDialogProps) => {
  return (
    <div className="flex gap-8">
      {img ? (
        <Image
          src={img}
          alt={title}
          className="rounded-2xl shadow-xl"
          width={280}
          height={400}
        />
      ) : null}
      <div className="flex w-[18rem] flex-col gap-4">
        <span className="capitalize text-3xl font-bold ml-3">{title}</span>
        {origin && (
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
            <span className="text-xl">{origin}</span>
          </div>
        )}
        <div className="flex flex-col gap-3 justify-between mt-auto text-xl">
          {ingredients && ingredients?.length > 0 && (
            <div className="flex flex-col">
              <span className="text-beverages-main">Ingredientes:</span>
              <div className="flex flex-col">
                {ingredients.map((ingredient, index) => (
                  <span className="font-light" key={index}>
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {qualities && qualities?.length > 0 && (
            <div className="flex flex-col">
              <span className="text-beverages-main">Cualidades:</span>
              <div className="flex flex-col">
                {qualities.map((ingredient, index) => (
                  <span className="font-light" key={index}>
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {description && (
            <div className="flex flex-col px-3">
              <span className="text-beverages-main ">Descripción:</span>
              <div className="flex flex-col w-[15rem] font-light">
                {description}
              </div>
            </div>
          )}

          {pairing && pairing?.length > 0 && (
            <div className="flex flex-col">
              <span className="text-beverages-main ml-3 mb-2">Maridaje:</span>
              <div className="flex flex-col h-56 bg-gray-100 px-3 py-2 rounded-lg overflow-y-scroll ">
                {pairing.map((ingredient, index) => (
                  <span className="font-light" key={index}>
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BeveragesDialogContent
