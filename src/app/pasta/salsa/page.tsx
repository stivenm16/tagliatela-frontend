'use client'
import { FilterSaucesOption, Sauce } from '@/types/global'
import { fakeFilters } from '@/utils/data/fakeFilters'
import { fakeSauces } from '@/utils/data/fakeSauces'
import { useState } from 'react'
import AlertSauces from '../components/AlertSauces'
import SaucesComponent from '../components/SaucesComponent'

const Page = () => {
  const [filters, setFilters] = useState<FilterSaucesOption[]>(fakeFilters)
  const [sauces, setSauces] = useState<Sauce[]>(fakeSauces)
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
    setSelectedSauceId(id)
  }

  return (
    <div>
      <AlertSauces />
      <SaucesComponent
        sauces={sauces}
        toggleSauceSelection={toggleSauceSelection}
        selectedSauceId={selectedSauceId}
      />
    </div>
  )
}

export default Page
