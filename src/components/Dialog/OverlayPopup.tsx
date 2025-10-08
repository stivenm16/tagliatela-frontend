'use client'
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import * as React from 'react'

interface OverlayPopupProps {
  open: boolean
  onClose: () => void
  lockScroll?: boolean
  children: React.ReactNode
}

function OverlayPopup({
  open,
  onClose,
  lockScroll = true,
  children,
}: OverlayPopupProps) {
  const { refs, context } = useFloating({
    open,
    onOpenChange: (o) => !o && onClose(),
  })

  // Handle dismissal (click outside, ESC key, etc.)
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' })
  const role = useRole(context)

  const { getFloatingProps } = useInteractions([dismiss, role])

  if (!open) return null

  return (
    <FloatingPortal>
      <FloatingOverlay
        data-state={open ? 'open' : 'closed'}
        className="Overlay-popup Dialog-overlay "
        lockScroll={lockScroll}
      >
        <div
          aria-hidden
          className="fixed inset-0"
          style={{
            backgroundColor: 'rgba(0,0,0,0.0)', // dim the page a bit
            backdropFilter: 'blur(6px)', // fallback if you can't set tailwind class
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 50,
          }}
        />
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            className="relative"
          >
            {children}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  )
}

export default OverlayPopup
