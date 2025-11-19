'use client'
import CheeseImg from '@/assets/images/cheese-background.png'
import SausagesImg from '@/assets/images/sausages-background.png'
import SecretTasteImg from '@/assets/images/secret-taste-background.png'
import { LinkImgContainer } from '@/components/LinkImgContainer'
import useIsLandscape from '@/hooks/useIsLandscape'

const Page = () => {
  const isLandscape = useIsLandscape()
  return (
    <div className="flex flex-col items-center">
      <span className="uppercase text-pasta-main text-xl drop-shadow-2xl font-bold my-10 ">
        Por favor selecciona una categoria:
      </span>
      <div
        className={` grid ${
          isLandscape ? 'grid-cols-3' : 'grid-cols-2'
        }  items-center font-bold uppercase text-xl justify-center px-5 gap-12`}
      >
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
