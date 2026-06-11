import CMAndNDLayout from '@/components/CMAndNDLayout/CMAndNDLayout'
import Layout from '@/components/Layout/Layout'

const Page = () => {
  return (
    <Layout>
      <div className="mt-6 h-full flex flex-col">
        <CMAndNDLayout variant="no-disponibles" />
      </div>
    </Layout>
  )
}
export default Page
