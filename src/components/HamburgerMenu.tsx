'use client'

import BeveragesIcon from '@/../../public/svgs/beverages-navbar-icon.svg'
import CheckmeetingIcon from '@/../../public/svgs/checkmeeting-navbar-icon.svg'
import HomeIcon from '@/../../public/svgs/home-navbar-icon.svg'
import ItalianIcon from '@/../../public/svgs/italian-navbar-icon.svg'
import NotAvailable from '@/../../public/svgs/not-available-navbar-icon.svg'
import PastaIcon from '@/../../public/svgs/pasta-navbar-icon.svg'
import SuggestedIcon from '@/../../public/svgs/suggested-navbar-icon.svg'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface RouteItem {
  name: string
  label: string
  icon: React.ReactNode
  color: string
  bgClass: string
}

const routes: RouteItem[] = [
  {
    name: '',
    label: 'Inicio',
    icon: <HomeIcon />,
    color: 'var(--suggested-main)',
    bgClass: 'bg-suggested-main',
  },
  {
    name: 'recomendados',
    label: 'Recomendar',
    icon: <SuggestedIcon />,
    color: 'var(--suggested-main)',
    bgClass: 'bg-suggested-main',
  },
  {
    name: 'pasta',
    label: 'Pastas',
    icon: <PastaIcon />,
    color: 'var(--pasta-main)',
    bgClass: 'bg-pasta-main',
  },
  {
    name: 'productos-italianos',
    label: 'Producto Italiano',
    icon: <ItalianIcon />,
    color: 'var(--italian-main)',
    bgClass: 'bg-italian-main',
  },
  {
    name: 'bebidas',
    label: 'Bebidas',
    icon: <BeveragesIcon />,
    color: 'var(--beverages-main)',
    bgClass: 'bg-beverages-main',
  },
  {
    name: 'check-meeting',
    label: 'CheckMeeting',
    icon: <CheckmeetingIcon />,
    color: 'var(--checkmeeting-main)',
    bgClass: 'bg-checkmeeting-main',
  },
  {
    name: 'platos-no-disponibles',
    label: 'No Disponibles',
    icon: <NotAvailable />,
    color: 'var(--not-available-main)',
    bgClass: 'bg-not-available-main',
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
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 hover:shadow-xl"
        style={{
          backgroundColor: 'var(--checkmeeting-main)',
        }}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {/* Animated hamburger → X */}
        <div className="relative size-5 flex flex-col items-center justify-center gap-[5px]">
          <span
            className={`block h-[2.5px] w-full rounded-full bg-white transition-all duration-300 ease-out origin-center ${
              isOpen ? 'translate-y-[7.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[2.5px] w-full rounded-full bg-white transition-all duration-200 ease-out ${
              isOpen ? 'opacity-0 scale-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-[2.5px] w-full rounded-full bg-white transition-all duration-300 ease-out origin-center ${
              isOpen ? '-translate-y-[7.5px] -rotate-45' : ''
            }`}
          />
        </div>
      </button>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isOpen
            ? 'bg-black/50 backdrop-blur-sm pointer-events-auto'
            : 'bg-transparent backdrop-blur-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sliding panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 z-40 h-full w-80 max-w-[90vw] transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
          willChange: 'transform',
        }}
      >
        {/* Header with accent */}
        <div
          className="relative flex items-center justify-between px-6 pt-8 pb-5 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--surface) 0%, #ffffff 100%)',
          }}
        >
          {/* Decorative accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: 'linear-gradient(90deg, var(--checkmeeting-main), var(--suggested-main), var(--pasta-main))',
            }}
          />
          <div className="flex items-center gap-3">
            <div
              className="size-2 rounded-full"
              style={{ backgroundColor: 'var(--checkmeeting-main)' }}
            />
            <h2
              className="text-lg font-bold uppercase tracking-wider"
              style={{ color: 'var(--text-primary)' }}
            >
              Navegar
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="size-9 rounded-full flex items-center justify-center hover:bg-black/5 transition-all duration-200 active:scale-90"
            aria-label="Cerrar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--text-muted)' }}>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-1.5 px-4 pt-4 pb-8 overflow-y-auto max-h-[calc(100vh-10rem)]">
          {routes.map((r) => {
            const isActive = currentRoute === r.name
            return (
              <Link
                key={r.name}
                href={`/${r.name}`}
                onClick={() => setIsOpen(false)}
                className="group relative flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200"
                style={{
                  backgroundColor: isActive ? `${r.color}12` : 'transparent',
                }}
              >
                {/* Active indicator */}
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full"
                    style={{ backgroundColor: r.color }}
                  />
                )}

                {/* Icon in colored circle */}
                <div
                  className={`size-11 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:shadow-md ${
                    isActive ? r.bgClass : ''
                  }`}
                  style={{
                    backgroundColor: !isActive ? `${r.color}20` : undefined,
                  }}
                >
                  <div className="[&_svg_path]:fill-white [&_svg]:size-6">
                    {r.icon}
                  </div>
                </div>

                {/* Label and subtitle */}
                <div className="flex flex-col">
                  <span
                    className="text-base font-semibold transition-all duration-200"
                    style={{
                      color: isActive ? r.color : 'var(--text-primary)',
                    }}
                  >
                    {r.label}
                  </span>
                  {isActive && (
                    <span
                      className="text-xs mt-0.5"
                      style={{ color: r.color }}
                    >
                      Sección actual
                    </span>
                  )}
                </div>

                {/* Spacer + arrow for active */}
                <div className="ml-auto">
                  {isActive && (
                    <div
                      className="size-2 rounded-full"
                      style={{ backgroundColor: r.color }}
                    />
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="px-6 py-4">
            <div
              className="h-px mb-3"
              style={{ backgroundColor: 'var(--border)' }}
            />
            <p
              className="text-xs text-center font-medium tracking-wide uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              Tagliatela · Menú Digital
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
