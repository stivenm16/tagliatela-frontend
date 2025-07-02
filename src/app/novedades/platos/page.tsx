'use client'
import { InfoButton } from '@/components/buttons/InfoButton'
import { CustomMultiSelect } from '@/components/buttons/MultiSelect'
import { Card } from '@/components/Card'
import { ExpandableSection } from '@/components/ExpandableSection'
import Layout from '@/components/Layout'
import { CustomSelect } from '@/components/Select'
import Image from 'next/image'
import { useState } from 'react'

const Page = () => {
  const [selected, setSelected] = useState<number | null>(null)
  const [multiSelected, setMultiSelected] = useState<number[]>([])

  const options = [
    'Lasagna',
    'Risotto',
    'Pollo alla Cacciatora',
    'Bistecca',
    'Melanzane alla Parmigiana',
  ]
  const fakeData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Plato ${i + 1}`,
    description: `Descripción del plato ${i + 1}`,
    img: `https://picsum.photos/200/300?random=${i + 1}`,
  }))
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center px-5 gap-10">
        {multiSelected.length > 0 && (
          <div className="text-sm text-gray-500">
            Seleccionados: {multiSelected.map((i) => options[i]).join(', ')}
          </div>
        )}
        <h1>Platos</h1>
        <CustomSelect
          label={selected === null ? 'Selecciona un plato' : options[selected]}
          options={options}
          selectedIndex={selected}
          onChange={setSelected}
        />
        <CustomMultiSelect
          label="Multi PIATTI PRINCIPALLI"
          options={options}
          selectedIndices={multiSelected}
          onChange={setMultiSelected}
        />
        <InfoButton description="Descripción de la información" />
        <div className="grid grid-cols-2 gap-10">
          {fakeData.map((item) => (
            <Card
              key={item.id}
              modalContent={
                <>
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={200}
                    height={300}
                    className="rounded-lg mb-4"
                  />
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </>
              }
            >
              <ExpandableSection maxHeight={500} initiallyExpanded={false}>
                <div className="flex flex-col items-center justify-center gap-2 ">
                  <h2 className="capitalize font-bold">{item.title}</h2>
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={200}
                    height={50}
                    className="my-3 rounded-lg "
                  />
                  <h2 className="capitalize font-medium">Ingredientes</h2>

                  <ul className="list-disc  max-w-48 ">
                    <li>
                      Ingrediente 1 Lorem ipsum dolor sit amet consectetur
                      adipisicing elit.
                    </li>
                    <li>
                      Ingrediente 2 Deleniti eum sunt placeat! Quisquam iure
                    </li>
                    <li>
                      Ingrediente 3 architecto libero vero obcaecati alias quia
                      aut quas maxime omnis ducimus enim, vitae, praesentium
                      deleniti quam
                    </li>
                    <li>Ingrediente 4</li>
                  </ul>
                </div>
              </ExpandableSection>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Page
