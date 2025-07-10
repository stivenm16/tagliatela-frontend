'use client'
import Logo from '@/components/Icons/LOGO.svg'
import Image from 'next/image'
import Link from 'next/link'

// import { ClickableItem } from './novedades/platos/page'

const fakeData2 = [
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
      { title: 'Vinos', href: '/bebidas' },
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
    items: [{ title: 'Destacados', href: '/check-meeting' }],
  },
  {
    title: 'No disponibles',
    color: 'bg-not-available-main',
    items: [{ title: 'Platos', href: '/platos-no-disponibles' }],
  },
  // {
  //   title: 'Novedades',
  //   items: [{ title: 'Platos', href: '/novedades/platos' }],
  // },
]

export default function Home() {
  const fakeData = Array.from({ length: 1 }, (_, i) => ({
    id: i + 1,
    title: `Queso Taleggio DOP ${i + 1}`,
    description: `Queso de vaca, semiblando, cremoso y untuoso al untar. ${
      i + 1
    }`,
  }))

  const fakeIngredients = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    name: `Queso Montasio DOP`,
    description: `Descripción del ${i + 1}`,
  }))
  return (
    <div className="flex flex-col bg-surface-2 items-center justify-center h-screen gap-10 text-white">
      <Image src={Logo} alt="Next.js logo" width={180} height={38} priority />

      <div>
        <div className="grid grid-cols-2 gap-8 mt-4 ">
          {fakeData2.map((column, index) => (
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

      {/* <div className="grid grid-cols-2 gap-10">
        {fakeData.map((item, i) => (
          <CardRefactor
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
          </CardRefactor>
        ))}
      </div> */}
    </div>
  )
}
