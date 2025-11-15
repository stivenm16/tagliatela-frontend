'use client'
import PastaImgMedium from '@/assets/images/pasta-image-reference-medium.png'
import SauceThumbnail from '@/assets/images/sauce-thumbnail.png'
import BeveragesIcon from '@/assets/svgs/beverages-card-icon.svg'
import IngredientsIcon from '@/assets/svgs/filters/ingredients/ingredients-icon.svg'
import StarIcon from '@/assets/svgs/star.svg'
import Card from '@/components/Cards/Card'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/Dialog/Dialog'
import { Skeleton } from '@/components/ui/skeleton'
import axiosInstance from '@/lib/axios'
import { Sauce } from '@/types/global'
import Image from 'next/image'
import { useState } from 'react'
import NewDishFloatingButton from './NewDishFloatingButton'

interface SaucesComponentProps {
  sauces: Sauce[]
  toggleSauceSelection: (id: number) => void
  selectedSauceId: number | null
  selectedPasta: string
}
const SaucesComponent = ({ sauces, selectedPasta }: SaucesComponentProps) => {
  const [sauceSelectedInfo, setSauceSelectedInfo] = useState<Sauce | null>(null)

  const getSauceData = async (id: number) => {
    const response = await axiosInstance.get(`/sauce/${id}`, {
      withCredentials: true,
    })

    return response.data
  }

  const handleSauceSelection = async (id: number) => {
    setSauceSelectedInfo(null)
    setTimeout(async () => {
      const sauceData = await getSauceData(id)
      setSauceSelectedInfo(sauceData)
    }, 500)
  }

  const pastasFormatted =
    sauceSelectedInfo &&
    sauceSelectedInfo.pastas?.flatMap(({ type, pastas }: any) =>
      pastas.map((pasta: any) => ({
        ...pasta,
        type,
      })),
    )

  function sortByMatch(list: any, match?: string) {
    if (!match) return list
    return [...list].sort((a, b) => {
      const aMatch = a.name.toLowerCase().includes(match.toLowerCase())
      const bMatch = b.name.toLowerCase().includes(match.toLowerCase())
      return aMatch === bMatch ? 0 : aMatch ? -1 : 1
    })
  }

  const backgroundCardColor = (type: string) =>
    type !== 'ripiena' ? 'bg-[rgba(132,133,105,0.6)]' : 'bg-[#F3D1D1]'
  return (
    <div className="">
      <div className="flex gap-5 gap-y-4 flex-wrap px-6 justify-start w-fit">
        {sauces.map((sauce) => (
          <Dialog key={sauce.id}>
            <DialogContent>
              <Card
                key={sauce.id}
                height="34rem"
                width="35.5rem"
                backgroundCard="bg-neutral-50"
                flipContentOptions={[
                  {
                    content: (
                      <div
                        key={sauce.id}
                        onClick={(e) => e.stopPropagation()}
                        className="flex flex-col justify-center text-white items-center text-center gap-4"
                      >
                        <h2 className="text-center uppercase text-2xl pt-10 font-bold">
                          {sauce.title}
                        </h2>
                        <span className="font-light w-4/5">
                          {sauce.description}
                        </span>
                        <div className="flex flex-col w-full h-full gap-3 relative p-10 pt-4">
                          <Image
                            src={SauceThumbnail}
                            alt={sauce.title}
                            className=" rounded-xl shadow-lg"
                          />
                        </div>
                      </div>
                    ),
                    icon: BeveragesIcon,
                    label: 'Bebidas',
                    color: 'bg-pasta-main',
                    iconWidth: 15,
                  },
                  {
                    content: (
                      <>
                        <div
                          key={sauce.id}
                          onClick={(e) => e.stopPropagation()}
                          className="flex flex-col justify-center text-white items-center text-center gap-4"
                        >
                          <h2 className="text-center uppercase text-2xl pt-10 font-bold">
                            {sauce.title}
                          </h2>
                          <span className="font-light w-4/5">
                            {sauce.description}
                          </span>
                          <div className="flex flex-col w-full h-full gap-3 relative p-10 pt-4">
                            <Image
                              src={SauceThumbnail}
                              alt={sauce.title}
                              className=" rounded-xl shadow-lg"
                            />
                          </div>
                        </div>
                      </>
                    ),
                    icon: IngredientsIcon,
                    label: 'Ingredientes',
                    color: 'bg-italian-main',
                    iconWidth: 24,
                  },
                ]}
              >
                {sauceSelectedInfo ? (
                  <div
                    key={sauce.id}
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-col justify-center items-center text-center gap-2"
                  >
                    <h2 className="text-center uppercase text-2xl pt-6 font-bold">
                      {sauce.title}
                    </h2>
                    <span className="font-light w-4/5">
                      {sauceSelectedInfo.description}
                    </span>
                    <div className="flex flex-col w-full h-full gap-3 relative p-10 pt-2 pb-2">
                      <Image
                        src={SauceThumbnail}
                        alt={sauce.title}
                        className="h-40 object-cover rounded-xl shadow-lg"
                      />
                    </div>
                    <div className="flex gap-4 overflow-x-scroll w-[30rem] pb-10 pt-7">
                      {pastasFormatted &&
                        sortByMatch(pastasFormatted, selectedPasta).map(
                          (_, index) => {
                            const type = _.type.split(' ')[1].toLowerCase()
                            return (
                              <div
                                key={index}
                                className="inline-flex flex-col items-center w-28"
                              >
                                <div className="relative w-full mt-6">
                                  <div className="absolute inset-0 flex justify-center  -top-[50px] z-[-1] overflow-hidden h-[50px]">
                                    <div
                                      className={`size-28 rounded-full ${
                                        _.name.toLowerCase() == selectedPasta &&
                                        backgroundCardColor(type)
                                      }`}
                                    />
                                  </div>
                                  <div
                                    className={`pt-1  ${
                                      _.name.toLowerCase() == selectedPasta &&
                                      backgroundCardColor(type) + ' shadow-xl'
                                    }  rounded-b-xl flex flex-col items-center p-3 `}
                                  >
                                    <div
                                      className={`-mt-10 size-24 rounded-full border-4 ${
                                        type === 'ripiena'
                                          ? 'border-[#CC7C7A]'
                                          : 'border-suggested-main'
                                      } overflow-hidden shadow-xl  z-1`}
                                    >
                                      <Image
                                        src={PastaImgMedium}
                                        alt="pasta"
                                        className="object-cover w-full h-full "
                                      />
                                    </div>

                                    <span className="text-sm my-3 font-semibold text-pasta-main">
                                      {_.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          },
                        )}
                    </div>
                  </div>
                ) : (
                  <div className="pt-10 px-10">
                    <Skeleton className="w-full h-72 bg-gray-200 mx-auto flex self-center items-center" />
                  </div>
                )}
              </Card>
            </DialogContent>
            <DialogTrigger onClick={(e) => handleSauceSelection(sauce.id)}>
              <div key={sauce.id}>
                <div
                  className={`flex flex-col w-full h-full gap-3 relative rounded-xl`}
                >
                  {sauce.isSuggested && (
                    <StarIcon className="absolute -top-3 -left-3" />
                  )}
                  {sauce.isNew && <NewDishFloatingButton />}
                  <Image
                    src={SauceThumbnail}
                    alt={sauce.title}
                    className={`size-40 rounded-xl  shadow-lg ${
                      sauce.isSuggested ? 'bg-checkmeeting-main p-1' : ''
                    } `}
                  />
                  <h2 className="text-center uppercase w-40 ">{sauce.title}</h2>
                </div>
              </div>
            </DialogTrigger>
          </Dialog>
        ))}
      </div>
    </div>
  )
}

export default SaucesComponent
