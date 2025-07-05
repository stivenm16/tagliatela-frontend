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
    <>
      <Image
        src={img}
        alt={title}
        width={420}
        height={200}
        className="rounded-lg mb-4 overflow-hidden"
      />
      <span className="capitalize text-3xl font-bold">{title}</span>
      {origin && (
        <div className="flex gap-3">
          <Image src={ItalianImg} alt="Italian flag" width={50} />
          <span className="text-xl">{origin}</span>
        </div>
      )}

      <p className="font-light text-xl w-72 text-center">{description}</p>
    </>
  )
}

export default GeneralDialogContent
