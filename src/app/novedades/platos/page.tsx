'use client'
import { Card } from '@/components/Card'
import Layout from '@/components/Layout'
import { CustomMultiSelect } from '@/components/MultiSelect'
import { CustomSelect } from '@/components/Select'
import { useState } from 'react'

const Page = () => {
  const [selected, setSelected] = useState(0)
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
        <h1>Platos</h1>
        <CustomSelect
          label="PIATTI PRINCIPALLI"
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
        <div className="grid grid-cols-2 gap-10">
          {fakeData.map((item) => (
            <Card
              key={item.id}
              img={item.img}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Page
