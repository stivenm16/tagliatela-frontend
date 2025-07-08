import ItalianImg from '@/assets/images/italian-flag.png'
import SpanishFlag from '@/assets/images/spanish-flag.png'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

interface BeveragesDialogProps {
  title: string
  img: string | StaticImport
  origin?: string
  ingredients?: string[]
  pairing?: string[]
  qualities?: string[]
}
const BeveragesDialogContent = ({
  title,
  img,
  origin,
  ingredients,
  pairing,
  qualities,
}: BeveragesDialogProps) => {
  return (
    <div className="flex gap-10">
      <Image src={img} alt={title} className="" width={200} height={300} />
      <div className="flex flex-col justify-center gap-4">
        <span className="capitalize text-3xl font-bold max-w-72">{title}</span>
        {origin && (
          <div className="flex gap-3">
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
        <div className="flex flex-col gap-3">
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

          {pairing && pairing?.length > 0 && (
            <div className="flex flex-col">
              <span className="text-beverages-main">Maridaje:</span>
              <div className="flex flex-col">
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
