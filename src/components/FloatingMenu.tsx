'use client'

import BeveragesIcon from '@/assets/svgs/beverages-navbar-icon.svg'
import CheckmeetingIcon from '@/assets/svgs/checkmeeting-navbar-icon.svg'
import HomeIcon from '@/assets/svgs/home-navbar-icon.svg'
import ItalianIcon from '@/assets/svgs/italian-navbar-icon.svg'
import NotAvailable from '@/assets/svgs/not-available-navbar-icon.svg'
import PastaIcon from '@/assets/svgs/pasta-navbar-icon.svg'
import SuggestedIcon from '@/assets/svgs/suggested-navbar-icon.svg'
import Image from 'next/image'
import Link from 'next/link'

export const FloatingMenu = () => {
  return (
    <div className="fixed bottom-5 z-[0.5] w-full px-14 flex justify-center">
      <div className="flex gap-5 w-full items-center justify-center p-4 bg-white/10 text-black backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
        <IconButton
          href="/recomendados"
          icon={<Image src={SuggestedIcon} alt="Suggested" />}
          color="bg-suggested-main"
        />
        <IconButton
          href="/pasta"
          icon={<Image src={PastaIcon} alt="Pasta" />}
          color="bg-pasta-main"
        />
        <IconButton
          href="/productos-italianos"
          icon={<Image src={ItalianIcon} alt="Italian" />}
          color="bg-italian-main"
        />
        <IconButton
          href="/bebidas"
          icon={<Image src={BeveragesIcon} alt="Beverages" />}
          color="bg-beverages-main"
        />
        <IconButton
          href="/check-meeting"
          icon={<Image src={CheckmeetingIcon} alt="Checkmeeting" />}
          color="bg-checkmeeting-main"
        />
        <IconButton
          href="/platos-no-disponibles"
          icon={<Image src={NotAvailable} alt="Not Available" />}
          color="bg-not-available-main"
        />
        {/* <IconButton
          href="/novedades/platos"
          icon={<Image src={NewsIcon} alt="News" />}
          color="bg-news-main"
        /> */}
        <div className="ml-5">
          <IconButton
            href="/"
            icon={<Image src={HomeIcon} alt="Home" />}
            color="bg-white"
          />
        </div>
      </div>
    </div>
  )
}

interface IconProps {
  color: string
  icon: React.ReactNode
  href: string
}

const IconButton = ({ icon, color, href }: IconProps) => {
  return (
    <Link href={href}>
      <div
        className={` ${color} flex items-center justify-center rounded-full size-12 hover:bg-white/20 transition-colors duration-200 text-white`}
      >
        {icon}
      </div>
    </Link>
  )
}
