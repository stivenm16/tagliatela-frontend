import Link from 'next/link'

export interface WineProps {
  thumbnail: string
  title: string
  origin: string
  qualities: string[]
  pairing: string[]
  full_img: string
}

const Page = () => {
  return (
    <div>
      <span className="uppercase text-pasta-main font-bold text-lg mx-auto w-full flex justify-center mt-20">
        Por favor selecciona una categoría:
      </span>

      <div className="flex gap-10 justify-center mt-10 mb-20">
        <Link
          href={'/bebidas/vinos/vinos-de-españa'}
          className="bg-beverages-main text-white w-[18rem] text-center rounded-3xl uppercase text-md p-2"
        >
          Vinos de España
        </Link>
        <Link
          href={'/bebidas/vinos/vinos-de-italia'}
          className="bg-beverages-main text-white text-center w-[18rem] rounded-3xl uppercase text-md p-2"
        >
          Vinos de Italia
        </Link>
      </div>
    </div>
  )
}

export default Page
