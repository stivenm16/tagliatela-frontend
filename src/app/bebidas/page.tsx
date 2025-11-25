'use client'
import CocktailsImg from '@/assets/images/cocktails-background.png'
import SangriaImg from '@/assets/images/sangria-background.png'
import ViniImg from '@/assets/images/vini-italia-background.png'
import { LinkImgContainer } from '@/components/LinkImgContainer'
import useIsLandscape from '@/hooks/useIsLandscape'

const Page = () => {
  const isLandscape = useIsLandscape()
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="uppercase text-pasta-main text-xl drop-shadow-2xl font-bold my-10 ">
        Por favor selecciona una categoria:
      </span>
      <div
        className={` grid ${
          isLandscape ? 'grid-cols-3' : 'grid-cols-2'
        } px-28  font-bold uppercase text-xl gap-8`}
      >
        <LinkImgContainer
          title="VINI D´ ITALIA"
          href="/bebidas/vinos"
          img={ViniImg}
          style={{ width: '16rem', height: '20rem', borderRadius: '14px' }}
        />
        <LinkImgContainer
          title="Cocktails"
          href="/bebidas/cocktails"
          img={CocktailsImg}
          style={{ width: '16rem', height: '20rem', borderRadius: '14px' }}
        />
        <LinkImgContainer
          title="Sangría"
          href="/bebidas/sangria"
          img={SangriaImg}
          style={{ width: '16rem', height: '20rem', borderRadius: '14px' }}
        />
      </div>
    </div>
  )
}

export default Page
