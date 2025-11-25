import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

interface DropdownProps {
  label?: string
  options: { label: string; value: string | number }[]
  value: string | number | null // <-- allow null
  onChange: (value: string | number | null) => void
  placeholder?: string // <-- new optional prop
  className?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="relative">
        <select
          value={value ?? ''}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onChange={(e) =>
            onChange(e.target.value === '' ? null : e.target.value)
          }
          className={`block w-full font-bold appearance-none rounded-4xl border border-gray-300 ${
            value ? 'bg-pasta-main' : 'bg-beverages-main'
          } uppercase text-white px-4 py-2 pr-8 shadow-sm`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown Arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>
    </div>
  )
}
