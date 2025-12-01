'use client'
import PastaImgMedium from '@/assets/images/pasta-image-reference-medium.png'
import { SauceT, useFilters } from '@/components/Layout/context/FilterContext'
import useIsLandscape from '@/hooks/useIsLandscape'
import { getDishImage } from '@/utils/getImage'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import SaucesComponent from '../../components/SaucesComponent'
import { Sauce } from '@/types/global'

const Page = () => {
  const [selectedSauceId, setSelectedSauceId] = useState<number | null>(null)
  const { pasta } = useFilters()
  const isLandscape = useIsLandscape()
  const [imgSrc, setImgSrc] = useState<string>('')

  const toggleSauceSelection = (id: number) => {
    setSelectedSauceId(id)
  }

  useEffect(() => {
    let isMounted = true
    console.log()
    getDishImage({
      dishName: pasta?.name as string,
      category: pasta?.type.split(' ')[1].toLowerCase() as string,
      family: 'pastas',
      variant: '148,5x148,5',
    }).then((src) => {
      if (isMounted) setImgSrc(src as any)
    })

    return () => {
      isMounted = false
    }
  }, [pasta?.name])
  return (
    <div
      className={` pb-24 flex flex-col  justify-center gap-28 overflow-y-scroll ring-0 border-0 pt-5 ${
        pasta?.sauces && pasta?.sauces.length > 5 && isLandscape
          ? 'h-screen pt-72'
          : ''
      } `}
    >
      <>
        <div className="flex justify-start">
          <SaucesComponent
            toggleSauceSelection={toggleSauceSelection}
            selectedPasta={pasta?.name.toLowerCase() || ''}
            sauces={
              pasta?.sauces
                ? (pasta.sauces as any[]).map((sauce) => ({
                    ...sauce,
                    description: sauce.description || '',
                    title: sauce.name,
                    highlightedContent: '',
                    isSuggested: sauce.isRecommended,
                    isNew: sauce.isNew,
                  }))
                : []
            }
            selectedSauceId={selectedSauceId}
          />
        </div>
      </>
      <div
        className={`flex flex-col  gap-6 p-4 rounded-3xl shadow-xl text-white ${
          pasta?.type.split(' ')[1].toLowerCase() === 'tradizionale'
            ? 'bg-suggested-main'
            : 'bg-beverages-main'
        } w-fit mx-auto mb-40`}
      >
        <div className="flex gap-4 items-start">
          <Image
            src={imgSrc || PastaImgMedium}
            alt="Pasta"
            width={160}
            className="object-cover rounded-xl"
          />
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <span className="uppercase font-bold text-xl">pasta:</span>
              <span className="uppercase text-xl">{pasta?.name}</span>
            </div>
            <span className="font-light w-72">{pasta?.description}</span>
            <div className="grid grid-cols-2 w-72 h-12 overflow-y-scroll">
              {pasta?.ingredients.map((ing, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div className=" size-2 ml-2 bg-white rounded-full shrink-0" />
                  <span className=" w-72">{ing}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
