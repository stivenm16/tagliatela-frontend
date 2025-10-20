import { Filters, useFilters } from '@/components/Layout/context/FilterContext'
import { JSX, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type VerticalFilterMenuProps = {
  items: FilterItem[]
  activeColor: string
  category: keyof Filters
}

export type FilterItem = {
  id: string
  label: string
  icon: JSX.Element
  selectedColorIcon?: string
}
const VerticalFilterItem = ({
  id,
  label,
  icon: Icon,
  hovered,
  setHovered,
  updateFilter,
  setFocusedFilter,
  category,
}: {
  id: string
  label: string
  icon: any
  activeColor: string
  hovered: string | null
  setHovered: (id: string | null) => void
  updateFilter: (category: keyof Filters, value: string | null) => void
  setFocusedFilter: (filter: keyof Filters | null) => void
  category: keyof Filters
}) => {
  const [position, setPosition] = useState<'left' | 'right'>('right')
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  )
  const [isPositioned, setIsPositioned] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const tooltipRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (hovered === id && buttonRef.current) {
      setIsPositioned(false)
      const rect = buttonRef.current.getBoundingClientRect()
      const top = rect.top + rect.height / 2

      // Set initial position temporarily
      setPosition('right')
      setCoords({ top, left: rect.right + 12 })

      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        if (tooltipRef.current && buttonRef.current) {
          const tooltipWidth = tooltipRef.current.offsetWidth
          const buttonRect = buttonRef.current.getBoundingClientRect()

          // Check if tooltip fits on the right
          if (buttonRect.right + tooltipWidth + 12 > window.innerWidth) {
            setPosition('left')
            setCoords({
              top: buttonRect.top + buttonRect.height / 2,
              left: buttonRect.left - tooltipWidth - 12,
            })
          } else {
            setPosition('right')
            setCoords({
              top: buttonRect.top + buttonRect.height / 2,
              left: buttonRect.right + 12,
            })
          }
          setIsPositioned(true)
        }
      }, 0)
    } else {
      setIsPositioned(false)
    }
  }, [hovered, id])
  return (
    <div
      className="relative flex items-center"
      onMouseDown={() => setHovered(id)}
      onMouseUp={() => setHovered(null)}
      onMouseLeave={() => setHovered(null)}
      onTouchStart={() => setHovered(id)}
      onTouchEnd={() => setHovered(null)}
    >
      <button
        ref={buttonRef}
        className={`p-2 size-10 flex justify-center text-xl `}
        onClick={() => {
          updateFilter(category, id === hovered ? null : id)
          setFocusedFilter(null)
        }}
      >
        <Icon />
      </button>

      {hovered === id &&
        coords &&
        createPortal(
          <span
            ref={tooltipRef}
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
              transform: 'translateY(-50%)',
              opacity: isPositioned ? 1 : 0,
            }}
            className="px-3 py-1 bg-white rounded-xl shadow text-sm font-medium whitespace-nowrap transition-opacity duration-200 text-black z-[9999]"
          >
            {label}
          </span>,
          document.body,
        )}
    </div>
  )
}
export const VerticalFilterMenu = ({
  items,
  activeColor,
  category,
}: VerticalFilterMenuProps) => {
  const [hovered, setHovered] = useState<string | null>(null)
  const { updateFilter, setFocusedFilter } = useFilters()

  return (
    <div className="flex flex-col items-center gap-4 bg-white rounded-full shadow-lg">
      {items.map(({ id, label, icon }) => (
        <VerticalFilterItem
          key={id}
          id={id}
          label={label}
          icon={icon}
          activeColor={activeColor}
          hovered={hovered}
          setHovered={setHovered}
          updateFilter={updateFilter}
          setFocusedFilter={setFocusedFilter}
          category={category}
        />
      ))}
    </div>
  )
}
