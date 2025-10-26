import { CMAndNDLayoutProps } from '../CMAndNDLayout'

const CloseButton = ({
  onClick,
  size,
  variant,
  icon = '✕',
}: {
  onClick: () => void
  variant?: CMAndNDLayoutProps['variant']
  size?: number
  icon?: React.ReactNode | string
}) => {
  return (
    <button
      onClick={onClick}
      className={`absolute -top-${size ? 10 : 2}  
      }  text-white rounded-full size-${
        size ?? 8
      } flex items-center justify-center`}
      style={{
        right: size ? 4 : -10,
        backgroundColor:
          variant === 'no-disponibles'
            ? 'var(--not-available-main)'
            : 'var(--checkmeeting-main)',
      }}
    >
      {icon}
    </button>
  )
}

export default CloseButton
