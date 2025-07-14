'use client'
import CardReferenceImage from '@/assets/images/card-reference-image.png'
import Card from '@/components/Cards/Card'
import { ClickableItem } from '@/components/Dialog/ClickableItem'
import GeneralDialogContent from '@/components/Dialog/GeneralDialog'
import Layout from '@/components/Layout'
import { CustomSelect } from '@/components/Select'
import Image from 'next/image'
import { useState } from 'react'

const Page = () => {
  const [dietOptions, setDietOptions] = useState([
    {
      label: 'Vegetariana',
      value: '0',
    },
    {
      label: 'Vegana',
      value: '1',
    },
    {
      label: 'Sin gluten',
      value: '2',
    },
    {
      label: 'Embarazada',
      value: '3',
    },
  ])
  const [allergenOptions, setAllergenOptions] = useState([
    {
      label: 'Leche',
      value: '0',
    },
    {
      label: 'Huevos',
      value: '1',
    },
    {
      label: 'Maní',
      value: '2',
    },
    {
      label: 'Soja',
      value: '3',
    },
    {
      label: 'Trigo',
      value: '4',
    },
    {
      label: 'Mariscos',
      value: '5',
    },
  ])
  const [ingredientOptions, setIngredientOptions] = useState([
    {
      label: 'Vegetales',
      value: '0',
    },
    {
      label: 'Productos del mar',
      value: '1',
    },
    {
      label: 'Carne',
      value: '2',
    },
  ])
  const [flavorOptions, setFlavorOptions] = useState([
    {
      label: 'Picante',
      value: '0',
    },
    {
      label: 'Suave',
      value: '1',
    },
    {
      label: 'Ligero',
      value: '2',
    },
    {
      label: 'Crujiente',
      value: '3',
    },
  ])
  const [familyOptions, setFamilyOptions] = useState([
    { label: 'Antipasti', value: '0' },
    { label: 'Curoe Felici', value: '1' },
    { label: 'Dolce Artigianali', value: '2' },
    { label: 'Insalate', value: '3' },
    { label: 'Piatti Principali', value: '4' },
  ])

  const [filtersSelected, setFiltersSelected] = useState({
    diet: null,
    allergen: null,
    ingredient: null,
    flavor: null,
    family: null,
  })

  const fakeData = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Queso Taleggio DOP ${i + 1}`,
    description: `Queso de vaca, semiblando, cremoso y untuoso al untar. ${
      i + 1
    }`,
  }))

  const fakeIngredients = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    name: `Ingrediente ${i + 1}`,
    description: `Descripción del ${i + 1}`,
  }))

  const handleSelectChange = (name: string, value: number | null) => {
    setFiltersSelected({
      ...filtersSelected,
      [name]: value,
    })
  }
  return (
    <Layout>
      <div className="flex flex-col gap-5 px-20 mt-20">
        <CustomSelect
          label={
            filtersSelected.family !== null
              ? familyOptions[filtersSelected.family].label
              : ''
          }
          placeHolder="Familia"
          options={familyOptions}
          selectedIndex={filtersSelected.family ?? null}
          mainColor="bg-suggested-main"
          activedColor="bg-pasta-main"
          onChange={(value) => handleSelectChange('family', value)}
        />

        <div className="grid grid-cols-2 gap-5">
          <CustomSelect
            label={
              filtersSelected.diet !== null
                ? dietOptions[filtersSelected.diet].label
                : ''
            }
            placeHolder="Dieta"
            options={dietOptions}
            selectedIndex={filtersSelected.diet ?? null}
            mainColor="bg-suggested-main"
            activedColor="bg-pasta-main"
            onChange={(value) => handleSelectChange('diet', value)}
          />
          <CustomSelect
            label={
              filtersSelected.allergen !== null
                ? allergenOptions[filtersSelected.allergen].label
                : ''
            }
            placeHolder="Alergenos"
            options={allergenOptions}
            selectedIndex={filtersSelected.allergen ?? null}
            mainColor="bg-suggested-main"
            activedColor="bg-pasta-main"
            onChange={(value) => handleSelectChange('allergen', value)}
          />
          <CustomSelect
            label={
              filtersSelected.ingredient !== null
                ? ingredientOptions[filtersSelected.ingredient].label
                : ''
            }
            placeHolder="Ingredientes"
            options={ingredientOptions}
            selectedIndex={filtersSelected.ingredient ?? null}
            mainColor="bg-suggested-main"
            activedColor="bg-pasta-main"
            onChange={(value) => handleSelectChange('ingredient', value)}
          />
          <CustomSelect
            label={
              filtersSelected.flavor !== null
                ? flavorOptions[filtersSelected.flavor].label
                : ''
            }
            placeHolder={'Sabores'}
            options={flavorOptions}
            selectedIndex={filtersSelected.flavor ?? null}
            mainColor="bg-suggested-main"
            activedColor="bg-pasta-main"
            onChange={(value) => handleSelectChange('flavor', value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-10 mt-10">
          {fakeData.map((item, i) => (
            <Card
              key={item.id}
              modalContent={
                <GeneralDialogContent
                  title={item.title}
                  description={item.description}
                  img={CardReferenceImage}
                />
              }
              height="33rem"
              width="18rem"
              backgroundCard="bg-neutral-50"
              flipContent={
                <div className="flex flex-col items-center gap-2 h-full w-full text-white">
                  <h2 className="capitalize font-bold text-2xl mt-6">
                    {item.title}
                  </h2>
                  <Image
                    src={CardReferenceImage}
                    alt={item.title}
                    width={240}
                    height={50}
                    className="overflow-hidden"
                  />
                  <h2 className="capitalize font-medium">Ingredientes</h2>

                  <ul className="list-none  flex flex-col gap-2 w-full px-6 mt-4">
                    {fakeIngredients.map((ingrediente) => (
                      <ClickableItem
                        key={ingrediente.id}
                        title={ingrediente.name}
                        description={ingrediente.description}
                        isFlipped={true}
                      />
                    ))}
                  </ul>
                </div>
              }
              isSuggested={i == 0}
            >
              <div className="flex flex-col items-center gap-2 h-full w-full ">
                <h2 className="capitalize font-bold text-2xl mt-6">
                  {item.title}
                </h2>
                <Image
                  src={CardReferenceImage}
                  alt={item.title}
                  width={240}
                  height={50}
                  className="overflow-hidden"
                />
                <h2 className="capitalize font-medium">Ingredientes</h2>

                <ul className="list-none  flex flex-col gap-2 w-full px-6 mt-4">
                  {fakeIngredients.map((ingrediente) => (
                    <ClickableItem
                      key={ingrediente.id}
                      title={ingrediente.name}
                      description={ingrediente.description}
                      isFlipped={false}
                    />
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Page
