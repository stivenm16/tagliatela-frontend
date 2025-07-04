import Logo from '@/components/Icons/LOGO.svg'
import Image from 'next/image'
import Link from 'next/link'
// interface ColumItem {
//   title: string
//   href: string
// }

// interface Column {
//   title: string
//   items: ColumItem[]
// }

// const Column = ({ title, items }: Column) => (
//   <div className="flex flex-col items-center uppercase">
//     <h2 className="text-[0.65rem] w-[8.5rem] font-bold mb-2 bg-brand-dark py-3 text-center">
//       {title}
//     </h2>
//     <ul className="flex flex-col gap-5">
//       {items.map((item, index) => (
//         <Link
//           href={item.href}
//           key={index}
//           className="text-[0.65rem]  text-brand-dark w-[8.5rem] py-2 list-none text-center bg-accent"
//         >
//           {item.title}
//         </Link>
//       ))}
//     </ul>
//   </div>
// )

const fakeData = [
  {
    title: 'Recomendados',
    color: 'bg-suggested-main',
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
    items: [
      { title: 'Salsa', href: '/pasta/' },
      { title: 'Tipo de Pastas', href: '/pasta/tipo-de-pastas' },
    ],
  },
  {
    title: 'Bebidas',
    color: 'bg-beverages-main',
    items: [
      { title: 'Vinos', href: '/bebidas/vinos' },
      { title: 'Cocteles', href: '/bebidas/cocteles' },
      { title: 'Sangría', href: '/bebidas/sangria' },
    ],
  },
  {
    title: 'Productos Italianos',
    color: 'bg-italian-main',
    items: [
      { title: 'Quesos', href: '/productos-italianos' },
      { title: 'Embutidos', href: '/productos-italianos/embutidos' },
      { title: 'Gusto Secreto', href: '/productos-italianos/gusto-secreto' },
    ],
  },
  {
    title: 'Checkmeeting',
    color: 'bg-checkmeeting-main',
    items: [{ title: 'Destacados', href: '/checkmeeting/destacados' }],
  },
  {
    title: 'No disponibles',
    color: 'bg-not-available-main',
    items: [{ title: 'Platos', href: '/no-disponibles/platos' }],
  },
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
        <div className="grid grid-cols-2 gap-8 mt-4">
          {fakeData.map((column, index) => (
            <Link
              href={column.items[0].href}
              className={`flex  h-52 w-52 justify-center text-wrap flex-row  font-bold items-center uppercase rounded-xl ${column.color} p-3`}
              key={index}
            >
              <span className="text-center">{column.title}</span>
            </Link>
          ))}          
        </div>
        <Link
          href={'/novedades/platos'}
          className={`flex  w-full mt-8 justify-center text-wrap font-bold flex-row items-center uppercase rounded-md bg-news-main p-3`}
        >
          <span className="text-center">{'Novedades'}</span>
        </Link>
      </div>
    </div>
  )
}
