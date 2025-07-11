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
  ...props
}) => {
  return (
    <button
      className={`${
        isSelected ? activedColor : mainColor
      } uppercase py-2 px-4 rounded-md text-white`}
      {...props}
    >
      {label}
    </button>
  )
}
