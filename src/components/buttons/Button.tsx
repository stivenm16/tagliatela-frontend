import { cn } from '@/lib/utils'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  isSelected?: boolean
  mainColor?: string
  activedColor?: string
}

export const Button: React.FC<ButtonProps> = ({
  label,
  isSelected = false,
  mainColor = 'bg-checkmeeting-main',
  activedColor = 'bg-news-main',
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'uppercase py-2 px-4 rounded-md text-white',
        isSelected ? activedColor : mainColor,
        className,
      )}
      {...props}
    >
      {label}
    </button>
  )
}
