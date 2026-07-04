import { Filters, useFilters } from '@/components/Layout/context/FilterContext'
import { JSX, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  category,
}: {
  id: string
  label: string
  icon: any
  activeColor: string
  category: keyof Filters
}) => {
  const [position, setPosition] = useState<'left' | 'right'>('right')
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  )
  const { updateFilter, setFocusedFilter, filters } = useFilters()
  const [isPositioned, setIsPositioned] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const tooltipRef = useRef<HTMLSpanElement>(null)

  // Measures the button + tooltip and sets the final coords.
  // Flips to the left when there isn't enough room on the right.
  const computePosition = useCallback(() => {
    const buttonEl = buttonRef.current
    const tooltipEl = tooltipRef.current
    if (!buttonEl) return

    const buttonRect = buttonEl.getBoundingClientRect()
    const top = buttonRect.top + buttonRect.height / 2

    // We always need a tooltip width to decide left/right.
    // Even on the very first run, the span is rendered unconditionally
    // (with visibility:hidden + opacity:0) so its offsetWidth is measurable.
    const tooltipWidth = tooltipEl?.offsetWidth ?? 0

    if (buttonRect.right + tooltipWidth + 12 > window.innerWidth) {
      setPosition('left')
      setCoords({
        top,
        left: buttonRect.left - tooltipWidth - 12,
      })
    } else {
      setPosition('right')
      setCoords({ top, left: buttonRect.right + 12 })
    }
    setIsPositioned(true)
  }, [])

  // Run synchronously after the first commit so the span is already in the DOM
  // and we can measure it before the browser paints (no flicker).
  useLayoutEffect(() => {
    computePosition()
  }, [computePosition])

  // Recompute on viewport changes.
  useEffect(() => {
    const handler = () => computePosition()
    window.addEventListener('resize', handler)
    window.addEventListener('scroll', handler, true)
    return () => {
      window.removeEventListener('resize', handler)
      window.removeEventListener('scroll', handler, true)
    }
  }, [computePosition])

  return (
    <div className="relative flex items-center">
      <button
        ref={buttonRef}
        className={`p-2 size-10 flex justify-center text-xl ${
          filters[category] === id
            ? 'bg-neutral-100 rounded-full shadow-[0_3px_3px_0px] shadow-neutral-300'
            : ''
        }`}
        onClick={() => {
          updateFilter(category, filters[category] === id ? null : id)
          if (category === 'family') {
            updateFilter('allergen', null)
            updateFilter('diet', null)
            updateFilter('flavour', null)
            updateFilter('ingredients', null)
          }
          setFocusedFilter(null)
        }}
      >
        <Icon />
      </button>

      {/* Rendered unconditionally so the ref is always populated and the
          tooltip width can be measured before paint. Hidden until positioned. */}
      {createPortal(
        <span
          ref={tooltipRef}
          style={{
            position: 'fixed',
            top: coords?.top ?? -9999,
            left: coords?.left ?? -9999,
            transform: 'translateY(-50%)',
            opacity: isPositioned ? 1 : 0,
            visibility: isPositioned ? 'visible' : 'hidden',
            pointerEvents: 'none',
          }}
          className="px-3 py-1 bg-white rounded-xl shadow text-sm font-medium whitespace-nowrap text-black z-[9999]"
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
  return (
    <div className="flex flex-col items-center gap-4 pt-6 px-[0-5px] bg-white rounded-full rounded-t-none shadow-lg">
      {items.map(({ id, label, icon }) => (
        <VerticalFilterItem
          key={id}
          id={id}
          label={label}
          icon={icon}
          activeColor={activeColor}
          category={category}
        />
      ))}
    </div>
  )
}