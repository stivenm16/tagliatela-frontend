import ItalianImg from '@/assets/images/italian-flag.png'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

interface GeneralDialogProps {
  title: string
  description: string
  img: string | StaticImport
  origin?: string
}
const GeneralDialogContent = ({
  title,
  description,
  img,
  origin,
}: GeneralDialogProps) => {
  return (
    <div className="p-6 w-full rounded-3xl mx-auto flex flex-col justify-center bg-white">
      <Image
        src={img}
        alt={title}
        width={420}
        height={200}
        className="rounded-lg mb-4 overflow-hidden self-center shadow-md"
      />

      <p className="capitalize text-3xl mx-auto text-center font-bold">
        {title}
      </p>
      {origin && (
        <div className="flex gap-3 w-full my-3 justify-center items-center">
          <Image src={ItalianImg} alt="Italian flag" width={50} />
          <span className="text-xl">{origin}</span>
        </div>
      )}

      <p className="font-light text-xl mt-2  text-center">{description}</p>
    </div>
  )
}

export default GeneralDialogContent
