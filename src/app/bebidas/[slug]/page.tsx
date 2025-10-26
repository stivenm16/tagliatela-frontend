'use client'

import CocktailImg from '@/assets/images/cocktail-reference.png'
import SangriaImg from '@/assets/images/sangria-reference.png'

import CardBeverages from '@/components/Cards/CardBeverages'
import BeveragesDialogContent from '@/components/Dialog/BeveragesDialog'
import { usePathname } from 'next/navigation'

const DummySangria = () => {
  return (
    <CardBeverages
      title="Sangría di lambrusco"
      origin="Italiano"
      classNameModal="w-[20rem]"
      modalContent={
        <BeveragesDialogContent
          title="Sangría di lambrusco"
          origin="Italiano"
          img={SangriaImg}
          description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          showFlag
        />
      }
      showFlag
      img={SangriaImg}
    />
  )
}
const DummyCocktail = () => {
  return (
    <CardBeverages
      title="Aperol Spritz"
      origin="Italiano"
      modalContent={
        <BeveragesDialogContent
          title="Aperol Spritz"
          origin="Italiano"
          img={CocktailImg}
          description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      }
      img={CocktailImg}
    />
  )
}
const GenericBeveragesPage = () => {
  const path = usePathname()

  return (
    <>
      <div className="pt-10  px-8 h-[55rem] overflow-y-scroll pb-20">
        {path === '/bebidas/cocktails' ? (
          <div className="grid grid-cols-3 gap-8">
            <DummyCocktail />
            <DummyCocktail />
            <DummyCocktail />
            <DummyCocktail />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            <DummySangria />
            <DummySangria />
            <DummySangria />
            <DummySangria />
          </div>
        )}
      </div>
    </>
  )
}

export default GenericBeveragesPage
