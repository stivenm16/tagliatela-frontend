'use client'

import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import CloseButton from './buttons/AlertCloseButton'

const AlertPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(children, document.body)
}

const Alert = ({
  children,
  applyBorder,
  closeButton = true,
}: {
  children: ReactNode
  applyBorder?: boolean
  closeButton?: boolean
}) => {
  const [open, setOpen] = useState(true)

  if (!open) return null

  return (
    <AlertPortal>
      <div className="fixed top-[45%] left-1/4 -50">
        <div
          className={`p-5 bg-white/80 backdrop-blur-sm uppercase w-[26rem] px-10 ${
            applyBorder ? 'border-2 border-red-600' : ''
          } rounded-2xl w-2/3 text-center shadow-lg relative`}
        >
          <span>{children}</span>
          {closeButton ? <CloseButton onClick={() => setOpen(false)} /> : null}
        </div>
      </div>
    </AlertPortal>
  )
}

export default Alert
