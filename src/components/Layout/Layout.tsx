'use client'

import { FloatingMenu } from '../FloatingMenu'
import { Header } from '../Header/Header'
import { FilterProvider } from './context/FilterContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FilterProvider>
      <div className="bg-surface-2 h-screen">
        <Header />
        <div className=" h-fit">{children}</div>
        <FloatingMenu />
      </div>
    </FilterProvider>
  )
}
