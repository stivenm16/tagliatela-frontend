'use client'

import BeveragesIcon from '@/../../public/svgs/beverages-navbar-icon.svg'
import CheckmeetingIcon from '@/../../public/svgs/checkmeeting-navbar-icon.svg'
import HomeIcon from '@/../../public/svgs/home-navbar-icon.svg'
import ItalianIcon from '@/../../public/svgs/italian-navbar-icon.svg'
import NotAvailable from '@/../../public/svgs/not-available-navbar-icon.svg'
import PastaIcon from '@/../../public/svgs/pasta-navbar-icon.svg'
import SuggestedIcon from '@/../../public/svgs/suggested-navbar-icon.svg'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface RouteItem {
  name: string
  label: string
  icon: React.ReactNode
  color: string
}

const routes: RouteItem[] = [
  {
    name: '',
    label: 'Inicio',
    icon: <HomeIcon />,
    color: 'var(--suggested-main)',
  },
  {
    name: 'recomendados',
    label: 'Recomendar',
    icon: <SuggestedIcon />,
    color: 'var(--suggested-main)',
  },
  {
    name: 'pasta',
    label: 'Pastas',
    icon: <PastaIcon />,
    color: 'var(--pasta-main)',
  },
  {
    name: 'productos-italianos',
    label: 'Producto Italiano',
    icon: <ItalianIcon />,
    color: 'var(--italian-main)',
  },
  {
    name: 'bebidas',
    label: 'Bebidas',
    icon: <BeveragesIcon />,
    color: 'var(--beverages-main)',
  },
  {
    name: 'check-meeting',
    label: 'CheckMeeting',
    icon: <CheckmeetingIcon />,
    color: 'var(--checkmeeting-main)',
  },
  {
    name: 'platos-no-disponibles',
    label: 'No Disponibles',
    icon: <NotAvailable />,
    color: 'var(--not-available-main)',
  },
]

export const HamburgerMenu = () => {
  const path = usePathname()
  const currentRoute = path.split('/')[1]
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on route change
  useEffect(() => {
    setIsOpen(false)
  }, [path])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* FAB button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-110 active:scale-95"
        style={{
          backgroundColor: 'var(--checkmeeting-main)',
        }}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {isOpen ? (
          <X className="text-white" size={24} />
        ) : (
          <Menu className="text-white" size={24} />
        )}
      </button>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isOpen
            ? 'bg-black/40 backdrop-blur-sm pointer-events-auto'
            : 'bg-transparent backdrop-blur-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sliding panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 z-40 h-full w-72 max-w-[85vw] transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: 'var(--surface)',
          boxShadow: '-4px 0 30px rgba(0,0,0,0.15)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-8 pb-4">
          <h2
            className="text-xl font-bold uppercase tracking-wide"
            style={{ color: 'var(--text-primary)' }}
          >
            Navegar
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="size-10 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} style={{ color: 'var(--text-muted)' }} />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-6 mb-4 h-px" style={{ backgroundColor: 'var(--border)' }} />

        {/* Navigation items */}
        <nav className="flex flex-col gap-1 px-4">
          {routes.map((r) => {
            const isActive = currentRoute === r.name
            return (
              <Link
                key={r.name}
                href={`/${r.name}`}
                onClick={() => setIsOpen(false)}
                className="group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200"
                style={{
                  backgroundColor: isActive ? `${r.color}15` : 'transparent',
                }}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full"
                    style={{ backgroundColor: r.color }}
                  />
                )}

                {/* Icon */}
                <div
                  className="size-11 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                  style={{
                    backgroundColor: isActive ? r.color : 'transparent',
                  }}
                >
                  <div
                    className={`[&_svg]:transition-all [&_svg]:duration-200 ${
                      isActive ? '[&_svg_path]:fill-white' : ''
                    }`}
                    style={
                      !isActive
                        ? { color: r.color, '--icon-color': r.color } as React.CSSProperties
                        : {}
                    }
                  >
                    {r.icon}
                  </div>
                </div>

                {/* Label */}
                <span
                  className="text-base font-semibold transition-all duration-200"
                  style={{
                    color: isActive ? r.color : 'var(--text-primary)',
                  }}
                >
                  {r.label}
                </span>

                {/* Hover background */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  style={{ backgroundColor: `${r.color}08` }}
                />
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="h-px mb-4" style={{ backgroundColor: 'var(--border)' }} />
          <p
            className="text-xs text-center"
            style={{ color: 'var(--text-muted)' }}
          >
            Tagliatela · Menú Digital
          </p>
        </div>
      </div>
    </>
  )
}
