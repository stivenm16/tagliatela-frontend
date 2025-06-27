import Image from 'next/image'
import Link from 'next/link'

interface ColumItem {
  title: string
  href: string
}

interface Column {
  title: string
  items: ColumItem[]
}

const Column = ({ title, items }: Column) => (
  <div className="flex flex-col items-center uppercase">
    <h2 className="text-[0.65rem] w-[8.5rem] font-bold mb-2 bg-brand-dark py-3 text-center">
      {title}
    </h2>
    <ul className="flex flex-col gap-5">
      {items.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className="text-[0.65rem]  text-brand-dark w-[8.5rem] py-2 list-none text-center bg-border"
        >
          {item.title}
        </Link>
      ))}
    </ul>
  </div>
)

const fakeData = [
  {
    title: 'Recomendados',
    items: [
      { title: 'familia', href: 'familia/recomendados' },
      { title: 'Dietas', href: 'dietas/recomendados' },
      { title: 'Ingredientes', href: 'ingredientes/recomendados' },
      { title: 'Sabores', href: 'sabores/recomendados' },
    ],
  },
  {
    title: 'Pasta',
    items: [
      { title: 'Salsa', href: '/pasta/salsa' },
      { title: 'Tipo de Pastas', href: '/pasta/tipo-de-pastas' },
    ],
  },
  {
    title: 'Bebidas',
    items: [
      { title: 'Vinos', href: '/bebidas/vinos' },
      { title: 'Cocteles', href: '/bebidas/cocteles' },
      { title: 'Sangría', href: '/bebidas/sangria' },
    ],
  },
  {
    title: 'Productos Italianos',
    items: [
      { title: 'Quesos', href: '/productos-italianos/quesos' },
      { title: 'Embutidos', href: '/productos-italianos/embutidos' },
      { title: 'Gusto Secreto', href: '/productos-italianos/gusto-secreto' },
    ],
  },
  {
    title: 'Checkmeeting',
    items: [{ title: 'Destacados', href: '/checkmeeting/destacados' }],
  },
  {
    title: 'No disponibles',
    items: [{ title: 'Platos', href: '/no-disponibles/platos' }],
  },
  {
    title: 'Novedades',
    items: [{ title: 'Platos', href: '/novedades/platos' }],
  },
]
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10 text-white">
      <Image
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <div className="bg-brand p-3 uppercase text-white font-bold w-fit">
        Menú Principal
      </div>
      <div>
        <div className="flex gap-3 mt-4">
          {fakeData.map((column, index) => (
            <Column key={index} title={column.title} items={column.items} />
          ))}
        </div>
      </div>
    </div>
  )
}
