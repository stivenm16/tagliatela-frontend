'use client'
import DishImg from '@/assets/images/pasta-image-reference.png'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from './buttons/Button'
import { CustomMultiSelect } from './buttons/MultiSelect'

const fieldsToRender = [
  'Aperitivi',
  'Antipasti',
  'Curoe Felici',
  'Insalate',
  'Pati Principali',
  'Guarniciones',
  'Dolce Artigianali',
  'Edizione',
]
const options = [
  'Lasagna',
  'Risotto',
  'Pollo alla Cacciatora',
  'Bistecca',
  'Melanzane alla Parmigiana',
]

interface CMAndNDLayoutProps {
  variant: 'check-meeting' | 'no-disponibles'
  title?: string
}

interface SelectedDishes {
  field: string
  selectedDishes: number[]
}
const CMAndNDLayout = ({ title, variant }: CMAndNDLayoutProps) => {
  const [selectedDishes, setSelectedDishes] = useState<SelectedDishes[]>(
    fieldsToRender.map((field) => {
      return {
        field,
        selectedDishes: [],
      }
    }),
  )

  const clearAllSelections = () => {
    setSelectedDishes(
      fieldsToRender.map((field) => {
        return {
          field,
          selectedDishes: [],
        }
      }),
    )
  }
  const handleOnChange = (field: string, selectedOptions: number[]) => {
    setSelectedDishes((prev) => {
      return prev.map((s) => {
        if (s.field === field) {
          return {
            ...s,
            selectedDishes: selectedOptions,
          }
        }
        return s
      })
    })
  }
  return (
    <div className="w-full flex flex-col">
      {title && (
        <span className="uppercase text-checkmeeting-main text-xl text-center mx-auto w-full font-bold">
          {title}
        </span>
      )}
      <div className="flex relative px-10 mt-10">
        <div className="w-[60%] flex flex-col items-center">
          <span className="uppercase text-center">Seleccionados</span>
          <div className="flex flex-col mt-8 h-[40rem] overflow-y-scroll w-full mb-2">
            {selectedDishes.map((s, i) => {
              return (
                <div key={i} className="flex flex-col items-center gap-5">
                  {s.selectedDishes.map((d, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col w-full h-full relative  justify-center items-center"
                      >
                        <Image src={DishImg} alt={'tem.title'} />
                        <h2 className="text-center uppercase">{d}</h2>
                        <h2 className="text-center uppercase">{s.field}</h2>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <div className="flex flex-col gap-3 w-full px-2">
            <Button label="Confirmar" />
            <Button label="Borrar" onClick={clearAllSelections} />
          </div>
        </div>
        <div className="border-r border-checkmeeting-main  h-[50rem]" />
        <div className="w-full flex flex-col gap-4 items-center">
          {fieldsToRender.map((field) => (
            <CustomMultiSelect
              label={field}
              options={options}
              key={field}
              variant={variant}
              selectedIndices={
                selectedDishes.find((s) => s.field === field)?.selectedDishes ||
                []
              }
              onChange={(selectedOptions) =>
                handleOnChange(field, selectedOptions)
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CMAndNDLayout
