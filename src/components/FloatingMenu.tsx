'use client'

import BeveragesIcon from '@/../../public/svgs/beverages-navbar-icon.svg'
import CheckmeetingIcon from '@/../../public/svgs/checkmeeting-navbar-icon.svg'
import ItalianIcon from '@/../../public/svgs/italian-navbar-icon.svg'
import NotAvailable from '@/../../public/svgs/not-available-navbar-icon.svg'
import PastaIcon from '@/../../public/svgs/pasta-navbar-icon.svg'
import SuggestedIcon from '@/../../public/svgs/suggested-navbar-icon.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export const FloatingMenu = () => {
  const path = usePathname()
  const route = path.split('/')[1]
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  // Show menu on route change, hide on scroll down
  useEffect(() => {
    setIsVisible(true)
    lastScrollY.current = 0
  }, [path])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY.current

      if (delta > 10) {
        setIsVisible(false)
      } else if (delta < -5) {
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const routes = [
    {
      name: 'recomendados',
      icon: <SuggestedIcon />,
      color: 'bg-suggested-main',
      alt: 'Suggested',
    },
    {
      name: 'pasta',
      icon: <PastaIcon />,
      color: 'bg-pasta-main',
      alt: 'Pasta',
    },
    {
      name: 'productos-italianos',
      icon: <ItalianIcon />,
      color: 'bg-italian-main',
      alt: 'Italian',
    },
    {
      name: 'bebidas',
      icon: <BeveragesIcon />,
      color: 'bg-beverages-main',
      alt: 'Beverages',
    },
    {
      name: 'check-meeting',
      icon: <CheckmeetingIcon />,
      color: 'bg-checkmeeting-main',
      alt: 'Checkmeeting',
    },
    {
      name: 'platos-no-disponibles',
      icon: <NotAvailable />,
      color: 'bg-not-available-main',
      alt: 'Not Available',
    },
  ]
  return (
    <div
      className={`fixed z-1 w-full px-14 flex justify-center transition-all duration-300 ${
        isVisible ? 'bottom-5' : '-bottom-20'
      }`}
    >
      <div className="flex gap-5 w-full items-center justify-center p-4 bg-white/10 text-black backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
        {routes
          .filter((r) => r.name !== route)
          .map((r) => (
            <IconButton
              key={r.name}
              href={`/${r.name}`}
              icon={r.icon}
              color={r.color}
            />
          ))}
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
