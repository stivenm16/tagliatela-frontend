'use client'
import Logo from '@/components/Icons/LOGO.svg'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeading,
  DialogTrigger,
  useDialogContext,
} from './dialog/Dialog'
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

function DialogCloseIcon() {
  const { setOpen } = useDialogContext()
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation() // 🔥 prevent bubbling to parent trigger
    setOpen(false)
  }
  return (
    <button
      onClick={handleClick}
      className=" text-gray-500 hover:text-black"
      aria-label="Close"
    >
      <X className="w-5 h-5" />
    </button>
  )
}
export default function Home() {
  return (
    <div className="flex flex-col bg-surface-2 items-center justify-center h-screen gap-10 text-white">
      <Image src={Logo} alt="Next.js logo" width={180} height={38} priority />

      <div>
        <div className="grid grid-cols-2 gap-8 mt-4">
          {/* {fakeData.map((column, index) => (
            <Link
              href={column.items[0].href}
              className={`flex  h-52 w-52 justify-center text-wrap flex-row  font-bold items-center uppercase rounded-xl ${column.color} p-3`}
              key={index}
            >
              <span className="text-center">{column.title}</span>
            </Link>
          ))} */}
          <Dialog>
            <DialogTrigger>
              <div className="bg-red-100 h-56 w-72 font-black flex flex-col items-center text-black">
                <span>Parent</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="bg-red-500"
                    >
                      Open nested dialog
                    </div>
                  </DialogTrigger>
                  <DialogContent className="Dialog">
                    <DialogCloseIcon />
                    <DialogHeading>
                      My dialog heading nestedddddddd
                    </DialogHeading>
                    <DialogDescription>
                      <span className="relative">
                        <span>My dialog description nestedddddd</span>
                      </span>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </DialogTrigger>
            <DialogContent className="Dialog">
              <DialogCloseIcon />
              <DialogHeading>My dialog heading</DialogHeading>
              <DialogDescription>My dialog description</DialogDescription>
            </DialogContent>
          </Dialog>
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
