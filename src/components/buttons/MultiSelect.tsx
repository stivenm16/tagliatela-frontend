'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface CustomMultiSelectProps {
  label: string
  options: string[]
  selectedIndices?: number[]
  onChange: (newSelected: number[]) => void
  variant?: 'check-meeting' | 'no-disponibles'
}

export const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  label,
  options,
  selectedIndices = [],
  onChange,
  variant,
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
        ? 'bg-news-main'
        : 'bg-checkmeeting-main'
    } else {
      return selectedIndices.length > 0
        ? 'bg-news-main'
        : 'bg-not-available-main'
    }
  }
  return (
    <div ref={wrapperRef} className="relative w-64 text-sm font-medium">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-between w-full rounded-md ${variantCheked()} px-4 py-2 text-white shadow-md transition-all duration-200`}
      >
        <span className="uppercase font-bold">{label}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute z-10 mt-2 w-full rounded-md bg-white border border-gray-200 shadow-xl overflow-hidden transform transition-all duration-300 origin-top ${
          open
            ? 'opacity-100 scale-y-100 max-h-96'
            : 'opacity-0 scale-y-95 max-h-0 pointer-events-none'
        }`}
      >
        <ul className="p-4 space-y-3">
          {options.map((option, idx) => (
            <li
              key={idx}
              className="flex items-center cursor-pointer"
              onClick={() => toggleSelection(idx)}
            >
              <span
                className={`inline-block h-4 w-4 rounded-sm border-2 mr-3 transition-all duration-200 ${
                  selectedIndices.includes(idx)
                    ? 'bg-[#5B0D31] border-[#5B0D31]'
                    : 'border-[#5B0D31]'
                }`}
              />
              <span className="text-[#5B0D31] uppercase">{option}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
