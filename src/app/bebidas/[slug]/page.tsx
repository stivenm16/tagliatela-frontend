'use client'

import CocktailImg from '@/assets/images/cocktail-reference.png'

import CardBeverages from '@/components/Cards/CardBeverages'
import BeveragesDialogContent from '@/components/Dialog/BeveragesDialog'
import { Skeleton } from '@/components/ui/skeleton'
import useIsLandscape from '@/hooks/useIsLandscape'
import axiosInstance from '@/lib/axios'
import { getDishImage } from '@/utils/getImage'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const CardBeverageItem = ({ beverage, category, showFlag }: any) => {
  const [imgSrc, setImgSrc] = useState<string>('')
  const [fullImgSrc, setFullImgSrc] = useState<string>('')
  useEffect(() => {
    let isMounted = true
    console.log()
    getDishImage({
      dishName: beverage.name,
      category,
      family: 'beverages',
      variant: '200x320',
    }).then((src) => {
      if (isMounted) setImgSrc(src as any)
    })

    getDishImage({
      dishName: beverage.name,
      category,
      family: 'beverages',
      variant: '240x440',
    }).then((src) => {
      if (isMounted) setFullImgSrc(src as any)
    })
    return () => {
      isMounted = false
    }
  }, [beverage.name])
  return (
    <CardBeverages
      key={beverage.id}
      title={beverage.name}
      origin={beverage.origin ?? 'Italiano'}
      modalContent={
        <BeveragesDialogContent
          title={beverage.name}
          origin={beverage.origin ?? 'Italiano'}
          description={beverage.description}
          img={fullImgSrc || CocktailImg}
          showFlag={showFlag}
        />
      }
      showFlag={showFlag}
      img={imgSrc || CocktailImg}
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
  return (
    <>
      {beverageType === 'cocktails' ? (
        <div
          className={`grid ${
            isLandscape ? 'grid-cols-4' : 'grid-cols-3'
          } gap-8`}
        >
          {beverages.map((beverage) => (
            <CardBeverageItem
              key={beverage.id}
              beverage={beverage}
              category="cocteles"
              showFlag={false}
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
            <CardBeverageItem
              key={beverage.id}
              beverage={beverage}
              category="sangrias"
              showFlag={true}
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
