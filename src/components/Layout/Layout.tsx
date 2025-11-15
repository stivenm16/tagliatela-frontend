'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { FloatingMenu } from '../FloatingMenu'
import { Header } from '../Header/Header'
import { FilterProvider } from './context/FilterContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <FilterProvider>
      <div className="flex flex-col min-h-screen bg-surface-2">
        <div className="w-full h-16 bg-red-400" />
        <Header />
        <div className="mt-10">{children}</div>
        <FloatingMenu />
      </div>
    </FilterProvider>
  )
}
