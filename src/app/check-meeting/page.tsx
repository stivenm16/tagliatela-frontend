import CMAndNDLayout from '@/components/CMAndNDLayout/CMAndNDLayout'
import Layout from '@/components/Layout/Layout'

const Page = () => {
  return (
    <Layout>
      <div className="pt-8 h-full flex flex-col">
        <CMAndNDLayout
          title="Recomendaciones del día"
          variant="check-meeting"
        />
      </div>
    </Layout>
  )
}

export default Page
