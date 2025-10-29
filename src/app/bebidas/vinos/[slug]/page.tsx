'use client'
import { Dropdown } from '@/components/Selects/Dropdown'
import { useState } from 'react'

const Page = () => {
  const [fruit, setFruit] = useState('bianchi')

  const fruits = [
    { label: 'Bianchi', value: 'Bianchi' },
    { label: 'Rosati', value: 'Rosati' },
    { label: 'Rossi', value: 'Rossi' },
    { label: 'Spumanti', value: 'Spumanti' },
  ]
  return (
    <div>
      <span className="uppercase text-pasta-main font-bold text-lg mx-auto w-full flex justify-center mt-20">
        Por favor selecciona una categoría:
      </span>
      <div className="w-1/2 flex flex-col gap-4 mx-auto mt-10">
        <Dropdown
          options={fruits}
          value={fruits[0].value}
          onChange={setFruit}
        />
        <Dropdown
          options={fruits}
          value={fruits[1].value}
          onChange={setFruit}
        />
        <Dropdown
          options={fruits}
          value={fruits[2].value}
          onChange={setFruit}
        />
        <Dropdown
          options={fruits}
          value={fruits[3].value}
          onChange={setFruit}
        />
      </div>
    </div>
  )
}

export default Page
