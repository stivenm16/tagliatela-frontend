'use client'
import { usePathname } from 'next/navigation'

const GenericBeveragesPage = () => {
  const path = usePathname()

  return <div>{path.split('/').pop()}</div>
}

export default GenericBeveragesPage
