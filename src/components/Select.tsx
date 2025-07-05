'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Option {
  label: string
  value: string
}
interface CustomSelectProps {
  label: string
  options: Option[]
  selectedIndex?: number | null
  onChange: (index: number | null) => void
  customStyles?: React.CSSProperties
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  selectedIndex = 0,
  onChange,
  customStyles = {},
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

  return (
    <div
      ref={wrapperRef}
      className="relative text-sm font-medium "
      style={customStyles}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full rounded-md bg-[#5B0D31] px-4 py-2 uppercase text-white shadow-md transition-all duration-200"
      >
        <span>{label}</span>
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
              onClick={() => {
                onChange(idx)
                setOpen(false)
              }}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full border-2 mr-3 transition-all duration-200 ${
                  selectedIndex === idx
                    ? 'bg-[#5B0D31] border-[#5B0D31]'
                    : 'border-[#5B0D31]'
                }`}
              />
              <span className="text-[#5B0D31] uppercase">{option.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
