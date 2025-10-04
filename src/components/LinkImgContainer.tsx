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
      } w-[18rem] h-[20rem] flex items-center shadow-lg justify-center rounded-xl text-white relative overflow-hidden`}
      href={href}
      style={style}
    >
      {/* Image should be behind the text */}
      <Image src={img} alt={title} fill className="object-cover z-0" />

      {/* Flex container to center the title */}
      <div className="z-10 flex items-center justify-center w-full h-full">
        <span
          className="font-bold text-3xl text-white drop-shadow-sm text-center px-4"
          style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}
        >
          {title}
        </span>
      </div>
    </Link>
  )
}
