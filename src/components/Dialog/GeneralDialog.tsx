import ItalianImg from '@/assets/images/italian-flag.png'
import useIsLandscape from '@/hooks/useIsLandscape'
import { getDishImage } from '@/utils/getImage'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface GeneralDialogProps {
  title: string
  description: string
  img:
    | {
        name: string
        type: string
        category?: string
      }
    | any
  origin?: string
}
const GeneralDialogContent = ({
  title,
  description,
  img,
  origin,
}: GeneralDialogProps) => {
  const [imgSrc, setImgSrc] = useState<StaticImport | string>('')
  const isLandscape = useIsLandscape()
  useEffect(() => {
    let isMounted = true
    getDishImage({
      dishName: img.name,
      category: img.type,
      variant: '424x400',
      family: img.category || 'dishes',
    }).then((src) => {
      if (isMounted) setImgSrc(src as any)
    })
    return () => {
      isMounted = false
    }
  }, [img.name])
  return (
    <div className="p-6 w-full rounded-3xl mx-auto flex flex-col justify-center bg-white">
      {!!imgSrc ? (
        <Image
          src={!img.name ? img : imgSrc}
          alt={title}
          width={isLandscape ? 330 : 420}
          height={200}
          className="rounded-lg mb-4 overflow-hidden self-center shadow-md"
        />
      ) : null}

      <p className="capitalize text-3xl mx-auto text-center font-bold">
        {title}
      </p>
      {origin && (
        <div className="flex gap-3 w-full my-3 justify-center items-center">
          <Image src={ItalianImg} alt="Italian flag" width={50} />
          <span className="text-xl">{origin}</span>
        </div>
      )}

      <p
        className={` text-xl mt-2 ${
          isLandscape ? 'max-w-[20rem]' : 'max-w-[27rem]'
        } text-center`}
      >
        {description}
      </p>
    </div>
  )
}

export default GeneralDialogContent
