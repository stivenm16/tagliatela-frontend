'use client'

import { FloatingMenu } from './FloatingMenu'
import { Header } from './Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface-2 h-full mb-[20rem]">
      <Header />
      <div className="pb-28">{children}</div>
      <FloatingMenu />
    </div>
  )
}
