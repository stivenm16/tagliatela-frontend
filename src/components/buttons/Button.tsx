import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}

export const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <button
      className="bg-checkmeeting-main uppercase py-2 px-4 rounded-md text-white"
      {...props}
    >
      {label}
    </button>
  )
}
