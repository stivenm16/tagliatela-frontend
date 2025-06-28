'use client'

import { Header } from './Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface-2 h-full">
      <Header />
      <>{children}</>
    </div>
  )
}
