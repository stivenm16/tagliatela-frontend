'use client'

import { FamilyType } from '@/types/global'
import { ChevronDown, MinusIcon, PlusIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Option = {
  id: number
  name: string
}

type OptionGroup = {
  label: string
  options: Option[]
}

interface CustomMultiSelectProps {
  label: string | FamilyType
  options: Option[] | OptionGroup[]
  selectedIndices?: number[]
  onChange: (newSelected: number[]) => void
  variant?: 'check-meeting' | 'no-disponibles'
  quantities?: Record<number, number>
  onQuantityChange?: (
    category: FamilyType,
    dishId: number,
    delta: number,
  ) => void
}

const isGrouped = (
  options: Option[] | OptionGroup[],
): options is OptionGroup[] => {
  return (options as OptionGroup[])[0]?.options !== undefined
}

export const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  label,
  options,
  selectedIndices = [],
  onChange,
  variant,
  quantities,
  onQuantityChange,
}) => {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const [openUpwards, setOpenUpwards] = useState(false)

  useEffect(() => {
    if (!open || !wrapperRef.current) return

    const rect = wrapperRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const dropdownHeight = 200 // same as your max-h-96 (approx 384px)

    setOpenUpwards(spaceBelow < dropdownHeight)
  }, [open])

  const toggleSelection = (index: number) => {
    if (selectedIndices.includes(index)) {
      onChange(selectedIndices.filter((i) => i !== index))
    } else {
      onChange([...selectedIndices, index])
    }
  }

  const variantCheked = () => {
    if (variant == 'check-meeting') {
      return selectedIndices.length > 0
        ? 'bg-pasta-main'
        : 'bg-checkmeeting-main'
    } else {
      return selectedIndices.length > 0
        ? 'bg-suggested-main'
        : 'bg-not-available-main'
    }
  }

  const getLabel = (label: string) => {
    if (label.toLowerCase() === 'postres') return 'Dolci'
    if (label.toLowerCase() === 'le pizze') return 'Pizzas'
    return label
  }

  const renderCheckMeetingControl = (
    option: Option,
    category: FamilyType,
  ) => {
    const quantity = quantities?.[option.id] ?? 0
    const isActive = quantity > 0
    const btnClass = isActive
      ? 'bg-checkmeeting-main text-white'
      : 'bg-gray-300 text-white'

    return (
      <div className="flex items-center gap-1.5 w-20 shrink-0 mr-3">
        <button
          type="button"
          disabled={!isActive}
          onClick={(e) => {
            e.stopPropagation()
            if (isActive) onQuantityChange?.(category, option.id, -1)
          }}
          className={`${btnClass} rounded-full w-5 h-5 shrink-0 flex items-center justify-center disabled:opacity-60`}
        >
          <MinusIcon size={12} />
        </button>
        <span
          className={`font-bold text-xs min-w-[1.25rem] text-center ${
            isActive ? 'text-checkmeeting-main' : 'text-transparent'
          }`}
        >
          {quantity || '0'}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onQuantityChange?.(category, option.id, 1)
          }}
          className={`${btnClass} rounded-full w-5 h-5 shrink-0 flex items-center justify-center`}
        >
          <PlusIcon size={12} />
        </button>
      </div>
    )
  }

  const renderOption = (option: Option, category: FamilyType) => {
    if (variant === 'check-meeting') {
      return (
        <li
          key={option.id}
          className="flex items-center cursor-pointer"
        >
          {renderCheckMeetingControl(option, category)}
          <span className="text-[#5B0D31] uppercase">{option.name}</span>
        </li>
      )
    }

    return (
      <li
        key={option.id}
        className="flex items-center cursor-pointer"
        onClick={() => toggleSelection(option.id)}
      >
        <span
          className={`inline-block h-4 w-4 rounded-sm border-2 mr-3 transition-all duration-200 ${
            selectedIndices.includes(option.id)
              ? 'bg-[#5B0D31] border-[#5B0D31]'
              : 'border-[#5B0D31]'
          }`}
        />
        <span className="text-[#5B0D31] uppercase">{option.name}</span>
      </li>
    )
  }
  return (
    <div ref={wrapperRef} className="relative w-80 text-sm font-medium">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-between w-full rounded-3xl ${variantCheked()} px-6 py-2 text-white shadow-md transition-all duration-200`}
      >
        <span className="uppercase font-bold">{getLabel(label)}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`
          absolute z-10 w-full rounded-md bg-white border border-gray-200 shadow-xl 
          overflow-hidden transform transition-all duration-300 
          ${
            openUpwards
              ? 'bottom-full mb-2 origin-bottom'
              : 'mt-2 top-full origin-top'
          }
          ${
            open
              ? 'opacity-100 scale-y-100 max-h-56 overflow-y-scroll'
              : 'opacity-0 scale-y-95 max-h-0 pointer-events-none'
          }
        `}
      >
        <ul className="p-4 space-y-3">
          <ul className="p-4 space-y-4">
            {isGrouped(options)
              ? options.map((group, groupIdx) => (
                  <div key={groupIdx}>
                    {/* Section label */}
                    <div className="text-xs font-bold text-gray-400 uppercase mb-2 px-1">
                      {group.label}
                    </div>

                    {/* Section options */}
                    <ul className="space-y-3">
                      {group.options.map((option) =>
                        renderOption(option, group.label as FamilyType),
                      )}
                    </ul>
                  </div>
                ))
              : options.map((option) =>
                  renderOption(option, label as FamilyType),
                )}
          </ul>
        </ul>
      </div>
    </div>
  )
}
