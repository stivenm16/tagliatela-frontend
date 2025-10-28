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
  onClose,
}: {
  children: ReactNode
  applyBorder?: boolean
  closeButton?: boolean
  onClose: () => void
}) => {
  return (
    <AlertPortal>
      <div className="fixed top-[45%] left-[25px] md:left-1/4 ">
        <div
          className={`p-5  bg-white/80 backdrop-blur-sm uppercase  md:w-[26rem] w-[23rem] px-10 ${
            applyBorder ? 'border-2 border-red-600' : ''
          } rounded-2xl text-center shadow-lg relative`}
        >
          <span>{children}</span>
          {closeButton ? <CloseButton onClick={onClose} /> : null}
        </div>
      </div>
    </AlertPortal>
  )
}

export default Alert
