const CloseButton = ({
  onClick,
  size,
}: {
  onClick: () => void
  size?: number
}) => {
  return (
    <button
      onClick={onClick}
      className={`absolute -top-${
        size ? 10 : 2
      }  bg-red-600 text-white rounded-full size-${
        size ?? 8
      } flex items-center justify-center`}
      style={{
        right: size ? 4 : -10,
      }}
    >
      ✕
    </button>
  )
}

export default CloseButton
