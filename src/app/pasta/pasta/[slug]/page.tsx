'use client'
import PastaImgMedium from '@/assets/images/pasta-image-reference-medium.png'
import { FilterSaucesOption, Sauce } from '@/types/global'
import { fakeFilters } from '@/utils/data/fakeFilters'
import { fakeSauces } from '@/utils/data/fakeSauces'
import Image from 'next/image'
import { useState } from 'react'
import SaucesComponent from '../../components/SaucesComponent'
const Page = () => {
  const [filters, setFilters] = useState<FilterSaucesOption[]>(fakeFilters)

  const [sauces, setSauces] = useState<Sauce[]>(fakeSauces)
  const [selectedSauceId, setSelectedSauceId] = useState<number | null>(null)

  const toggleSauceSelection = (id: number) => {
    setSelectedSauceId(id)
  }

  const handleSelectChange = (
    selectedIndex: number | null,
    placeHolder: string,
  ) => {
    setFilters((prev) =>
      prev.map((filter) =>
        filter.placeHolder === placeHolder
          ? {
              ...filter,
              selectedValue: selectedIndex !== null ? [selectedIndex] : [],
            }
          : filter,
      ),
    )
  }
  return (
    <div className="">
      <div className="flex justify-start">
        <SaucesComponent
          toggleSauceSelection={toggleSauceSelection}
          sauces={fakeSauces.filter((sauce, index) => index < 5)}
          selectedSauceId={selectedSauceId}
          showTitle={false}
        />
      </div>
      <div className="flex flex-col mt-40 gap-6 p-4 rounded-3xl shadow-xl text-white bg-beverages-main w-fit mx-auto">
        <div className="flex gap-4 items-start">
          <Image
            src={PastaImgMedium}
            alt="Pasta"
            width={160}
            className="object-cover rounded-xl"
          />
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <span className="uppercase font-bold text-xl">pasta:</span>
              <span className="uppercase text-xl">Sorrentino</span>
            </div>
            <span className="font-light w-72">
              Pasta corta y acanalada, enrollada en forma de tubo y elaborada
              con masa de huevo
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
