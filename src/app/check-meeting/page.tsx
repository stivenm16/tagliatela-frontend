import CMAndNDLayout from '@/components/CMAndNDLayout'
import Layout from '@/components/Layout/Layout'

const Page = () => {
  return (
    <Layout>
      <div className="mt-6">
        <CMAndNDLayout
          title="Recomendaciones del día"
          variant="check-meeting"
        />
      </div>
    </Layout>
  )
}

export default Page
