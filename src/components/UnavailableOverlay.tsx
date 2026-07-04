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
    <div className="relative inline-block grayscale opacity-60">
      {children}
      <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
        <span className="px-3 py-1 bg-white/90 text-red-700 font-bold uppercase tracking-wider text-xs rounded-lg shadow">
          No disponible
        </span>
      </div>
    </div>
  )
}
