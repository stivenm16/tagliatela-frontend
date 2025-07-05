'use client'
import PastaImg from '@/assets/images/pasta-image-reference.png'
import SauceImg from '@/assets/images/salsa.png'
import { FilterSaucesOption, Sauce } from '@/types/global'
import { fakeFilters } from '@/utils/data/fakeFilters'
import { fakeSauces } from '@/utils/data/fakeSauces'
import { useState } from 'react'
import { FiltersSauces } from '../components/FiltersSauces'
import SauceDialog from '../components/SauceDialog'
import SaucesComponent from '../components/SaucesComponent'

const Page = () => {
  const [filters, setFilters] = useState<FilterSaucesOption[]>(fakeFilters)

  const [sauces, setSauces] = useState<Sauce[]>(fakeSauces)

  const [openModal, setOpenModal] = useState(false)
  const [selectedSauceId, setSelectedSauceId] = useState<number | null>(null)
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

  const toggleSauceSelection = (id: number) => {
    setOpenModal(true)
    setSelectedSauceId(id)
  }

  return (
    <div>
      <SauceDialog
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedSauceId={selectedSauceId}
        sauces={sauces}
        SauceImg={SauceImg}
        PastaImg={PastaImg}
      />
      <div className="flex justify-center items-center gap-5 mt-20">
        <FiltersSauces
          filters={filters}
          handleSelectChange={handleSelectChange}
        />
      </div>
      <SaucesComponent
        sauces={sauces}
        showTitle={true}
        toggleSauceSelection={toggleSauceSelection}
        selectedSauceId={selectedSauceId}
      />
    </div>
  )
}

export default Page
