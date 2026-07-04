'use client'

import { ReactNode } from 'react'

interface UnavailableOverlayProps {
  isAvailable?: boolean
  children: ReactNode
}

export function UnavailableOverlay({
  isAvailable,
  children,
}: UnavailableOverlayProps) {
  if (isAvailable !== false) {
    return <>{children}</>
  }

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full opacity-60">{children}</div>
      <div className="absolute inset-0 rounded-2xl flex items-center justify-center pointer-events-none">
        <span className="text-pasta-main font-bold uppercase tracking-wider text-sm text-center leading-tight">
          No
          <br />
          disponible
        </span>
      </div>
    </div>
  )
}
