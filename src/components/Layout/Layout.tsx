'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { HamburgerMenu } from '../HamburgerMenu'
import { Header } from '../Header/Header'
import { FilterProvider } from './context/FilterContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <FilterProvider>
      <div className="flex flex-col h-screen bg-surface-2 overflow-hidden">
        <div className="w-full h-16 bg-red-400 shrink-0" />
        <Header />
        <div className="flex-1 min-h-0">{children}</div>
        <HamburgerMenu />
      </div>
    </FilterProvider>
  )
}
