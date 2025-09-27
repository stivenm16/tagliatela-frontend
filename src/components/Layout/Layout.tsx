'use client'

import { FloatingMenu } from '../FloatingMenu'
import { Header } from '../Header'
import { FilterProvider } from './context/FilterContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FilterProvider>
      <div className="bg-surface-2 h-full mb-[20rem]">
        <Header />
        <div className="pb-28 h-fit">{children}</div>
        <FloatingMenu />
      </div>
    </FilterProvider>
  )
}
