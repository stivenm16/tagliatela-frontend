'use client'
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
          img={'/images/cheese-background.png'}
        />
        <LinkImgContainer
          title="Embutidos"
          href="/productos-italianos/embutidos"
          img={'/images/sausages-background.png'}
        />
        <LinkImgContainer
          title="Otros"
          href="/productos-italianos/otros"
          img={'/images/secret-taste-background.png'}
        />
      </div>
    </div>
  )
}

export default Page
