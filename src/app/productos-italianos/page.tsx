import CheeseImg from '@/assets/images/cheese-background.png'
import SausagesImg from '@/assets/images/sausages-background.png'
import SecretTasteImg from '@/assets/images/secret-taste-background.png'
import { LinkImgContainer } from '@/components/LinkImgContainer'

const Page = () => {
  return (
    <div className="flex flex-col items-center">
      <span className="uppercase my-4 mt-8">
        POR FAVOR SELECCIONA LA CATEGORÍA:
      </span>
      <div className="flex flex-col items-center font-bold uppercase text-xl justify-center px-5 gap-5">
        <LinkImgContainer
          title="Quesos"
          href="/productos-italianos/quesos"
          img={CheeseImg}
        />
        <LinkImgContainer
          title="Embutidos"
          href="/productos-italianos/embutidos"
          img={SausagesImg}
        />
        <LinkImgContainer
          title="Gusto Secreto"
          href="/productos-italianos/gusto-secreto"
          img={SecretTasteImg}
        />
      </div>
    </div>
  )
}

export default Page
