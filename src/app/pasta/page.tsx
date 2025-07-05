import PastaImg from '@/assets/images/pasta-background.png'
import SauceImg from '@/assets/images/salsa-background.png'
import { LinkImgContainer } from '@/components/LinkImgContainer'

const Page = () => {
  return (
    <div className="flex flex-col items-center font-bold uppercase text-xl justify-center px-5 pt-20 gap-10">
      <LinkImgContainer title="Salsa" href="/pasta/salsa" img={SauceImg} />
      <LinkImgContainer title="Pasta" href="/pasta/pasta" img={PastaImg} />
    </div>
  )
}

export default Page
