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
    <div className="flex flex-col items-center gap-8 px-12">
      <span className="uppercase font-bold text-pasta-main text-2xl mt-16 ">
        Disponibles
      </span>
      <div className="flex flex-wrap gap-8">
        {path === '/bebidas/cocktails' ? (
          <>
            <DummyCocktail />
            <DummyCocktail />
            <DummyCocktail />
            <DummyCocktail />
          </>
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
