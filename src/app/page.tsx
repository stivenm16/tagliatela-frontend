'use client'
import BeveragesIcon from '@/assets/svgs/beverages-home-icon.svg'
import Checckmeeting from '@/assets/svgs/checkmeeting-home-icon.svg'
import ItalianIcon from '@/assets/svgs/italian-home-icon.svg'
import NotAvailable from '@/assets/svgs/not-available-home-icon.svg'
import PastaIcon from '@/assets/svgs/pasta-home-icon.svg'
import SuggestedIcon from '@/assets/svgs/suggested-home-icon.svg'
import Logo from '@/components/Icons/LOGO.svg'
import Image from 'next/image'
import Link from 'next/link'

const fakeData2 = [
  {
    title: 'Recomendados',
    color: 'bg-suggested-main',
    icon: SuggestedIcon,
    items: [
      { title: 'familia', href: '/recomendados' },
      { title: 'Dietas', href: 'dietas/recomendados' },
      { title: 'Ingredientes', href: 'ingredientes/recomendados' },
      { title: 'Sabores', href: 'sabores/recomendados' },
    ],
  },
  {
    title: 'Pasta',
    color: 'bg-pasta-main',
    icon: PastaIcon,
    items: [
      { title: 'Salsa', href: '/pasta/' },
      { title: 'Tipo de Pastas', href: '/pasta/tipo-de-pastas' },
    ],
  },
  {
    title: 'Bebidas',
    color: 'bg-beverages-main',
    icon: BeveragesIcon,
    items: [
      { title: 'Vinos', href: '/bebidas' },
      { title: 'Cocteles', href: '/bebidas/cocteles' },
      { title: 'Sangría', href: '/bebidas/sangria' },
    ],
  },
  {
    title: 'Productos Italianos',
    color: 'bg-italian-main',
    icon: ItalianIcon,
    items: [
      { title: 'Quesos', href: '/productos-italianos' },
      { title: 'Embutidos', href: '/productos-italianos/embutidos' },
      { title: 'Gusto Secreto', href: '/productos-italianos/gusto-secreto' },
    ],
  },
  // {
  //   title: 'Checkmeeting',
  //   color: 'bg-checkmeeting-main',
  //   items: [{ title: 'Destacados', href: '/check-meeting' }],
  // },
  // {
  //   title: 'No disponibles',
  //   color: 'bg-not-available-main',
  //   items: [{ title: 'Platos', href: '/platos-no-disponibles' }],
  // },
  // {
  //   title: 'Novedades',
  //   items: [{ title: 'Platos', href: '/novedades/platos' }],
  // },
]

export default function Home() {
  return (
    <div className="flex flex-col bg-surface-2 items-center justify-center h-screen gap-10 text-white">
      <Image src={Logo} alt="Next.js logo" width={180} height={38} priority />

      <div>
        <div className="grid grid-cols-2 gap-8 mt-4 ">
          {fakeData2.map((column, index) => (
            <Link
              href={column.items[0].href}
              className={`flex flex-col  size-[14rem]  justify-center text-wrap gap-4 font-bold items-center uppercase rounded-full  ${column.color} p-3`}
              key={index}
            >
              <>
                <Image src={column.icon} alt={column.title} />
                <span className="text-center  w-40">{column.title}</span>
              </>
            </Link>
          ))}
        </div>
        <div className="flex gap-5 justify-center">
          <Link
            href={'/check-meeting'}
            className={`flex  size-40 mt-8 justify-center text-wrap font-bold flex-row items-center uppercase rounded-full bg-checkmeeting-main`}
          >
            <Image src={Checckmeeting} alt={'Checkmeeting'} />
          </Link>
          <Link
            href={'/platos-no-disponibles'}
            className={`flex  size-40 mt-8 justify-center text-wrap font-bold flex-row items-center uppercase rounded-full bg-not-available-main`}
          >
            <Image src={NotAvailable} alt={'Not Available'} />
          </Link>
        </div>
        {/* <Link
          href={'/novedades/platos'}
          className={`flex  w-full mt-8 justify-center text-wrap font-bold flex-row items-center uppercase rounded-md bg-news-main p-3`}
        >
          <span className="text-center">{'Novedades'}</span>
        </Link> */}
      </div>
    </div>
  )
}
