import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'

interface ContainerProps {
  title: string
  href: string
  img: string | StaticImport
  style?: React.CSSProperties
}
export const LinkImgContainer = ({
  title,
  href,
  img,
  style,
}: ContainerProps) => {
  return (
    <Link
      className={`${
        title === 'Pasta' ? 'bg-brand' : 'bg-brand-dark'
      } w-[30rem] h-[16rem] flex items-center justify-center rounded-xl text-white relative overflow-hidden`}
      href={href}
      style={style}
    >
      {/* Image should be behind the text */}
      <Image src={img} alt={title} fill className="object-cover z-0" />

      {/* Flex container to center the title */}
      <div className="z-10 flex items-center justify-center w-full h-full">
        <span className="font-bold text-2xl text-white text-center px-4">
          {title}
        </span>
      </div>
    </Link>
  )
}
