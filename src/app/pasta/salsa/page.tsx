'use client'
import PastaImg from '@/assets/images/pasta-image-reference.png'
import SauceImg from '@/assets/images/salsa.png'
import { CardDialog } from '@/components/Dialog'
import { CustomSelect } from '@/components/Select'
import { Sauce } from '@/types/global'
import Image from 'next/image'
import { useState } from 'react'
import SaucesComponent from '../components/SaucesComponent'
interface Option {
  selectedValue: number[]
  options: { value: string; label: string }[]
  placeHolder: string
}

const Page = () => {
  const [filters, setFilters] = useState<Option[]>([
    {
      placeHolder: 'Pasta',
      selectedValue: [0],
      options: [
        { value: 'pasta', label: 'Pasta' },
        { value: 'pasta', label: 'Pasta22222' },
        { value: 'pasta', label: 'Pasta33333' },
        { value: 'pasta', label: 'Pasta44444' },
      ],
    },

    {
      placeHolder: 'Salsa',
      selectedValue: [0],
      options: [
        { value: 'salsa', label: 'Salsa' },
        { value: 'salsa', label: 'Salsa22222' },
        { value: 'salsa', label: 'Salsa33333' },
        { value: 'salsa', label: 'Salsa44444' },
      ],
    },

    {
      placeHolder: 'Dessert',
      selectedValue: [0],
      options: [
        { value: 'dessert', label: 'dessert' },
        { value: 'dessert', label: 'dessert22222' },
        { value: 'dessert', label: 'dessert33333' },
        { value: 'dessert', label: 'dessert44444' },
      ],
    },
  ])

  const [sauces, setSauces] = useState<Sauce[]>([
    {
      id: 1,
      title: 'Salsa de tomate',
      description:
        'Crema al tarftufo, queso taleggio DOP, grana padono DOP, aceite de tomate seco y albahaca. Servido en un cestino de pan de pizza.           ',
      isNew: true,
      highlightedContent: 'Perfecta para pastas y pizzas.',
      isSuggested: true,
    },
    {
      id: 54,
      title: 'Salsa de tomate',
      description:
        'Crema al tarftufo, queso taleggio DOP, grana padono DOP, aceite de tomate seco y albahaca. Servido en un cestino de pan de pizza.           ',
      isNew: true,
      highlightedContent: 'Perfecta para pastas y pizzas.',
      isSuggested: true,
    },
    {
      id: 9,
      title: 'Salsa de tomate',
      description:
        'Crema al tarftufo, queso taleggio DOP, grana padono DOP, aceite de tomate seco y albahaca. Servido en un cestino de pan de pizza.           ',
      isNew: true,
      highlightedContent: 'Perfecta para pastas y pizzas.',
      isSuggested: true,
    },
    {
      id: 321,
      title: 'Salsa de tomate',
      description:
        'Crema al tarftufo, queso taleggio DOP, grana padono DOP, aceite de tomate seco y albahaca. Servido en un cestino de pan de pizza.           ',
      isNew: false,
      highlightedContent: 'Perfecta para pastas y pizzas.',
      isSuggested: false,
    },
    {
      id: 2423423423,
      title: 'Salsa Alfredo',
      description:
        'Crema al tarftufo, queso taleggio DOP, grana padono DOP, aceite de tomate seco y albahaca. Servido en un cestino de pan de pizza.           ',
      isNew: false,
      highlightedContent: 'Ideal para pastas al dente.',
      isSuggested: false,
    },
    {
      id: 3275671,
      title: 'Salsa de tomate',
      description:
        'Crema al tarftufo, queso taleggio DOP, grana padono DOP, aceite de tomate seco y albahaca. Servido en un cestino de pan de pizza.           ',
      isNew: false,
      highlightedContent: 'Perfecta para pastas y pizzas.',
      isSuggested: false,
    },
    {
      id: 634,
      title: 'Salsa Alfredo',
      description:
        'Crema al tarftufo, queso taleggio DOP, grana padono DOP, aceite de tomate seco y albahaca. Servido en un cestino de pan de pizza.           ',
      isNew: false,
      highlightedContent: 'Ideal para pastas al dente.',
      isSuggested: false,
    },
    {
      id: 3,
      title: 'Salsa Pesto',
      description: 'Una salsa fresca con albahaca.',
      isNew: false,
      highlightedContent: 'Excelente para ensaladas y pastas.',
      isSuggested: true,
    },
    {
      id: 4,
      title: 'Salsa Pesto',
      description: 'Una salsa fresca con albahaca.',
      isNew: false,
      highlightedContent: 'Excelente para ensaladas y pastas.',
      isSuggested: false,
    },
    {
      id: 42,
      title: 'Salsa Pesto',
      description: 'Una salsa fresca con albahaca.',
      isNew: false,
      highlightedContent: 'Excelente para ensaladas y pastas.',
      isSuggested: false,
    },
    {
      id: 7654,
      title: 'Salsa Pesto',
      description: 'Una salsa fresca con albahaca.',
      isNew: false,
      highlightedContent: 'Excelente para ensaladas y pastas.',
      isSuggested: false,
    },
    {
      id: 4534534,
      title: 'Salsa Pesto',
      description: 'Una salsa fresca con albahaca.',
      isNew: false,
      highlightedContent: 'Excelente para ensaladas y pastas.',
      isSuggested: false,
    },
  ])

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
      <CardDialog
        open={openModal}
        onChangeOpen={setOpenModal}
        className="w-[28rem] h-2/3"
      >
        <div className="flex flex-col  items-center gap-4 ">
          <h2 className="text-2xl font-bold text-pasta-main">
            {sauces.find((sauce) => sauce.id === selectedSauceId)?.title}
          </h2>
          <Image
            src={SauceImg}
            alt="Salsa"
            className="w-full h-40 object-cover rounded-sm"
            width={160}
            height={160}
          />
          <div>
            <h3 className="uppercase font-bold text-not-available-main my-4 text-center">
              Pasta Tradizionales
            </h3>
            <div className="flex items-center gap-8 mt-2 justify-center">
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={PastaImg}
                  alt="Pasta"
                  className="size-24 object-cover rounded-full"
                  width={100}
                  height={160}
                />
                <span className="uppercase text-center">Riagtone</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={PastaImg}
                  alt="Pasta"
                  className="size-24 object-cover rounded-full"
                  width={100}
                  height={160}
                />
                <span className="uppercase text-center">Riagtone</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={PastaImg}
                  alt="Pasta"
                  className="size-24 object-cover rounded-full"
                  width={100}
                  height={160}
                />
                <span className="uppercase text-center">Riagtone</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="uppercase font-bold text-beverages-main my-4 text-center">
              Pasta Ripiena
            </h3>
            <div className="flex items-center gap-8 mt-2 justify-center">
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={PastaImg}
                  alt="Pasta"
                  className="size-24 object-cover rounded-full"
                  width={100}
                  height={160}
                />
                <span className="uppercase text-center">Riagtone</span>
              </div>
            </div>
          </div>
        </div>
      </CardDialog>
      <div className="flex justify-center items-center gap-5 mt-20">
        {filters.map((filter) => (
          <CustomSelect
            key={filter.placeHolder}
            label={filter.options[filter.selectedValue[0]]?.label ?? 'None'}
            options={filter.options}
            selectedIndex={filter.selectedValue[0] ?? null}
            onChange={(index) => handleSelectChange(index, filter.placeHolder)}
            customStyles={{ width: '200px', marginRight: '10px' }}
          />
        ))}
      </div>
      <SaucesComponent
        sauces={sauces}
        toggleSauceSelection={toggleSauceSelection}
        selectedSauceId={selectedSauceId}
      />
    </div>
  )
}

export default Page
