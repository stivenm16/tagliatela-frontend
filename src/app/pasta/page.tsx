import { LinkImgContainer } from '@/components/LinkImgContainer'

const Page = () => {
  return (
    <div className="flex flex-col items-center font-bold uppercase text-xl justify-center px-5 pt-10 gap-10">
      <span>Por favor selecciona una categoría:</span>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-10">
        <LinkImgContainer
          title="Salsa"
          href="/pasta/salsa"
          img={'/images/salsa-background.png'}
        />
        <LinkImgContainer
          title="Pasta"
          href="/pasta/pasta"
          img={'/images/pasta-background.png'}
        />
      </div>
    </div>
  )
}

export default Page
