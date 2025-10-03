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
      modalContent={
        <BeveragesDialogContent
          ingredients={['Aperol', 'Royal Bliss Aromantic Berry']}
          qualities={['Refrescante', 'Afrutado', 'Ligero toque amargo']}
          pairing={['Entrantes frescos', ' Ensaladas', 'Quesos suaves']}
          title="Sangría di lambrusco"
          origin="Italiano"
          img={SangriaImg}
        />
      }
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
          ingredients={['Aperol', 'Royal Bliss Aromantic Berry']}
          qualities={['Refrescante', 'Afrutado', 'Ligero toque amargo']}
          pairing={['Entrantes frescos', ' Ensaladas', 'Quesos suaves']}
          title="Aperol Spritz"
          origin="Italiano"
          img={CocktailImg}
        />
      }
      img={CocktailImg}
    />
  )
}
const GenericBeveragesPage = () => {
  const path = usePathname()

  return (
    <div className=" gap-8 py-10 px-12 h-screen pb-40 overflow-y-scroll">
      <div className="">
        {path === '/bebidas/cocktails' ? (
          <div className="grid grid-cols-3 gap-8 mb-20">
            <DummyCocktail />
            <DummyCocktail />
            <DummyCocktail />
            <DummyCocktail />
          </div>
        ) : (
          <>
            <DummySangria />
            <DummySangria />
            <DummySangria />
            <DummySangria />
          </>
        )}
      </div>
    </div>
  )
}

export default GenericBeveragesPage
