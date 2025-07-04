import PastaImg from '@/assets/images/pasta-background.png'
import SauceImg from '@/assets/images/salsa-background.png'

import Image from 'next/image'
import Link from 'next/link'

const Container = ({ title, href }: { title: string; href: string }) => {
  return (
    <Link
      className={` ${
        title === 'Pasta' ? 'bg-brand' : 'bg-brand-dark'
      }  w-[30rem] h-[16rem] flex items-center justify-center rounded-xl text-white relative`}
      href={href}
    >
      <div className="rounded-md ">
        <span className="absolute z-9 top-[40%] left-[42%] text-white font-bold text-2xl">
          {title}
        </span>
        <Image
          src={title !== 'Pasta' ? SauceImg : PastaImg}
          alt={title}
          fill
          className="overflow-hidden border-md"
        />
      </div>
    </Link>
  )
}
const Page = () => {
  return (
    <div className="flex flex-col items-center font-bold uppercase text-xl justify-center px-5 pt-20 gap-10">
      <Container title="Salsa" href="/pasta/salsa" />
      <Container title="Pasta" href="/pasta/pasta" />
    </div>
  )
}

export default Page
