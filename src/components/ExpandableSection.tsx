'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface ExpandableSectionProps {
  children: React.ReactNode
  maxHeight?: number // in pixels
  initiallyExpanded?: boolean
}

export const ExpandableSection = ({
  children,
  maxHeight = 100,
  initiallyExpanded = false,
}: ExpandableSectionProps) => {
  const [expanded, setExpanded] = useState(initiallyExpanded)

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded((prev) => !prev)
  }
  return (
    <div className="w-full">
      <div
        className={`transition-all overflow-hidden relative`}
        style={{ maxHeight: expanded ? '1000px' : `${maxHeight}px` }}
      >
        {children}
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      <button
        onClick={handleExpand}
        className="flex items-center gap-1 text-sm ml-auto mr-5 hover:underline mt-2"
      >
        {expanded ? (
          <>
            Ver menos <ChevronUp size={16} />
          </>
        ) : (
          <>
            Ver más <ChevronDown size={16} />
          </>
        )}
      </button>
    </div>
  )
}
