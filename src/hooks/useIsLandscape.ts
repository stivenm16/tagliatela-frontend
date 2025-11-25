import { useEffect, useState } from "react"

function useIsLandscape() {
  const [isLandscape, setIsLandscape] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(orientation: landscape)')

    const update = () => setIsLandscape(mediaQuery.matches)

    update() // Run on mount
    mediaQuery.addEventListener('change', update)

    return () => {
      mediaQuery.removeEventListener('change', update)
    }
  }, [])

  return isLandscape
}

export default useIsLandscape