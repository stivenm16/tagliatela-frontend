import { ChevronDown } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface DropdownProps {
  label?: string
  options: { label: string; value: string | number }[]
  value: string | number | null // <-- allow null
  onChange: (value: string | number | null) => void
  placeholder?: string
  className?: string
  variant?: 'pasta' | 'beverages'
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  variant = 'pasta',
}) => {
  const [open, setOpen] = useState(false)
  const [openUpwards, setOpenUpwards] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  // Detect whether dropdown should open upwards
  useEffect(() => {
    if (!open || !wrapperRef.current) return
    const rect = wrapperRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const dropdownHeight = 220
    setOpenUpwards(spaceBelow < dropdownHeight)
  }, [open])

  const bgClass =
    variant === 'pasta'
      ? value
        ? 'bg-pasta-main'
        : 'bg-beverages-main'
      : 'bg-gray-600'

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? placeholder

  return (
    <div ref={wrapperRef} className={`relative text-sm ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {label}
        </label>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-between w-full rounded-3xl px-6 py-2 uppercase font-bold text-white shadow-md transition-all duration-200 ${bgClass}`}
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown menu */}
      <div
        className={`
          absolute z-20 w-full rounded-md bg-white border border-gray-200 shadow-xl 
          overflow-hidden transform transition-all duration-300
          ${
            openUpwards
              ? 'bottom-full mb-2 origin-bottom'
              : 'mt-2 top-full origin-top'
          }
          ${
            open
              ? 'opacity-100 scale-y-100 max-h-56 overflow-y-auto'
              : 'opacity-0 scale-y-95 max-h-0 pointer-events-none'
          }
        `}
      >
        <ul className="p-2">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              className={`
                px-4 py-2 rounded-md cursor-pointer
                text-[#5B0D31] uppercase font-semibold
                transition-colors duration-150
                ${
                  option.value === value
                    ? 'bg-[#F4E3EB] text-[#5B0D31]'
                    : 'hover:bg-[#F4E3EB]'
                }
              `}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
