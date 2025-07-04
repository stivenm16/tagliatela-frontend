'use client'
import PastaImgMedium from '@/assets/images/pasta-image-reference-medium.png'
import PastaImg from '@/assets/images/pasta-image-reference.png'
import SauceImg from '@/assets/images/salsa.png'
import { FilterSaucesOption, Sauce } from '@/types/global'
import { fakeFilters } from '@/utils/data/fakeFilters'
import { fakeSauces } from '@/utils/data/fakeSauces'
import Image from 'next/image'
import { useState } from 'react'
import { FiltersSauces } from '../../components/FiltersSauces'
import SauceDialog from '../../components/SauceDialog'
import SaucesComponent from '../../components/SaucesComponent'
const Page = () => {
  const [filters, setFilters] = useState<FilterSaucesOption[]>(fakeFilters)

  const [sauces, setSauces] = useState<Sauce[]>(fakeSauces)
  const [openModal, setOpenModal] = useState(false)
  const [selectedSauceId, setSelectedSauceId] = useState<number | null>(null)

  const toggleSauceSelection = (id: number) => {
    setOpenModal(true)
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
      <SauceDialog
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedSauceId={selectedSauceId}
        sauces={sauces}
        SauceImg={SauceImg}
        PastaImg={PastaImg}
      />
      <div className="flex flex-col mt-20 gap-6 px-20">
        <span className="uppercase text-not-available-main font-bold text-xl">
          Pasta tradizionale
        </span>
        <div className="flex gap-4 items-end">
          <Image src={PastaImgMedium} alt="Pasta" className="object-cover" />
          <div className="flex flex-col gap-2">
            <span className="uppercase">GARGANELLI AL ´UOVO</span>
            <span className="font-light w-72">
              Pasta corta y acanalada, enrollada en forma de tubo y elaborada
              con masa de huevo
            </span>
          </div>
        </div>
      </div>
      <div className="flex  flex-col justify-center items-center gap-5 ">
        <span className="uppercase text-center font-bold text-2xl my-8">
          Recomendaciones de Salsa
        </span>

        <div className="flex gap-5 ">
          <FiltersSauces
            filters={filters}
            handleSelectChange={handleSelectChange}
          />
        </div>
        <div className="flex justify-start">
          <SaucesComponent
            toggleSauceSelection={toggleSauceSelection}
            sauces={fakeSauces.filter((sauce, index) => index < 5)}
            selectedSauceId={selectedSauceId}
            showTitle={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
