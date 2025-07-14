'use client'

import { Home, Plus, Search, User } from 'lucide-react'
import Link from 'next/link'

export const FloatingMenu = () => {
  return (
    <div className="fixed bottom-5 right-[15%] z-[0.5]">
      <div className="flex gap-8 items-center p-4 bg-white/10 text-black backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
        <IconButton
          href="/recomendados"
          icon={<Home size={20} color="bg-suggested-main" />}
          color="bg-suggested-main"
        />
        <IconButton
          href="/pasta"
          icon={<User size={20} color="bg-pasta-main" />}
          color="bg-pasta-main"
        />
        <IconButton
          href="/productos-italianos"
          icon={<Search size={20} color="bg-italian-main" />}
          color="bg-italian-main"
        />
        <IconButton
          href="/bebidas"
          icon={<Plus size={20} color="bg-beverages-main" />}
          color="bg-beverages-main"
        />
        <IconButton
          href="/check-meeting"
          icon={<Search size={20} color="bg-checkmeeting-main" />}
          color="bg-checkmeeting-main"
        />
        <IconButton
          href="/platos-no-disponibles"
          icon={<Plus size={20} color="bg-not-available-main" />}
          color="bg-not-available-main"
        />
        <IconButton
          href="/novedades/platos"
          icon={<User size={20} color="bg-news-main" />}
          color="bg-news-main"
        />
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
        className={`p-2 ${color} rounded-full size-10 hover:bg-white/20 transition-colors duration-200 text-white`}
      >
        {icon}
      </div>
    </Link>
  )
}
