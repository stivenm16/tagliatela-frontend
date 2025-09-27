'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const AlertPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(children, document.body)
}

const Alert = ({
  text,
  applyBorder,
  closeButton = true,
}: {
  text: string
  applyBorder?: boolean
  closeButton?: boolean
}) => {
  const [open, setOpen] = useState(true)

  if (!open) return null

  return (
    <AlertPortal>
      <div className="fixed top-[45%] left-1/4 -50">
        <div
          className={`p-5 bg-white/80 backdrop-blur-sm uppercase w-[25rem] px-10 ${
            applyBorder ? 'border-2 border-red-600' : ''
          } rounded-2xl w-2/3 text-center shadow-lg relative`}
        >
          <span>{text}</span>
          {closeButton ? (
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ✕
            </button>
          ) : null}
        </div>
      </div>
    </AlertPortal>
  )
}

export default Alert
