'use client'
import Layout from '@/components/Layout'
import { usePathname } from 'next/navigation'

const GenericBeveragesPage = () => {
  const path = usePathname()

  return (
    <Layout>
      <h1>{path.split('/').pop()}</h1>
    </Layout>
  )
}

export default GenericBeveragesPage
