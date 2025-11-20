'use client'

import CocktailImg from '@/assets/images/cocktail-reference.png'
import SangriaImg from '@/assets/images/sangria-reference.png'

import CardBeverages from '@/components/Cards/CardBeverages'
import BeveragesDialogContent from '@/components/Dialog/BeveragesDialog'
import { Skeleton } from '@/components/ui/skeleton'
import useIsLandscape from '@/hooks/useIsLandscape'
import axiosInstance from '@/lib/axios'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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

const BeveragesRenderItems = ({
  beverages,
  beverageType,
}: {
  beverages: any[]
  beverageType: string
}) => {
  const isLandscape = useIsLandscape()
  console.log('beverages', beverages)
  return (
    <>
      {beverageType === 'cocktails' ? (
        <div
          className={`grid ${
            isLandscape ? 'grid-cols-4' : 'grid-cols-3'
          } gap-8`}
        >
          {beverages.map((beverage) => (
            <CardBeverages
              key={beverage.id}
              title={beverage.name}
              origin={beverage.origin ?? 'Italiano'}
              modalContent={
                <BeveragesDialogContent
                  title={beverage.name}
                  origin={beverage.origin ?? 'Italiano'}
                  description={beverage.description}
                  img={CocktailImg}
                />
              }
              img={CocktailImg}
            />
          ))}
        </div>
      ) : (
        <div
          className={`grid ${
            isLandscape ? 'grid-cols-4' : 'grid-cols-3'
          } gap-8`}
        >
          {beverages.map((beverage) => (
            <CardBeverages
              key={beverage.id}
              title={beverage.name}
              origin={beverage.origin ?? 'Italiano'}
              classNameModal="w-[20rem]"
              modalContent={
                <BeveragesDialogContent
                  title={beverage.name}
                  origin={beverage.origin ?? 'Italiano'}
                  description={beverage.description}
                  img={SangriaImg}
                  showFlag
                />
              }
              showFlag
              img={SangriaImg}
            />
          ))}
        </div>
      )}
    </>
  )
}
const GenericBeveragesPage = () => {
  const path = usePathname()
  const [beverages, setBeverages] = useState<any[]>()
  const isLandscape = useIsLandscape()
  const endpoint = path.split('/').filter(Boolean)[1] // 'cocktails' or 'sangrias'
  const getBeverages = async () => {
    const response = await axiosInstance.get(
      `/drinks/${endpoint === 'cocktails' ? 'cocktail' : 'sangria'}`,
      {
        withCredentials: true,
      },
    )

    return response.data
  }

  useEffect(() => {
    const beverages = getBeverages()
    beverages.then((data) => setBeverages(data))
  }, [])

  return (
    <>
      <div className="pt-10  px-8 h-[55rem] overflow-y-scroll pb-20">
        {beverages && beverages.length > 0 ? (
          <BeveragesRenderItems beverages={beverages} beverageType={endpoint} />
        ) : (
          <div
            className={`grid ${isLandscape ? 'grid-cols-4' : 'grid-cols-3'}`}
          >
            <Skeleton className="w-56 h-72 mb-6 bg-white/50" />
            <Skeleton className="w-56 h-72 mb-6 bg-white/50" />
            <Skeleton className="w-56 h-72 mb-6 bg-white/50" />
            <Skeleton className="w-56 h-72 mb-6 bg-white/50" />
            <Skeleton className="w-56 h-72 mb-6 bg-white/50" />
            <Skeleton className="w-56 h-72 mb-6 bg-white/50" />
            <Skeleton className="w-56 h-72 mb-6 bg-white/50" />
            <Skeleton className="w-56 h-72 mb-6 bg-white/50" />
          </div>
        )}
      </div>
    </>
  )
}

export default GenericBeveragesPage
