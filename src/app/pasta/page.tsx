import Link from 'next/link'

const Container = ({ title, href }: { title: string; href: string }) => {
  return (
    <Link
      className={` ${
        title === 'Pasta' ? 'bg-brand' : 'bg-brand-dark'
      }  w-[30rem] h-56 flex items-center justify-center rounded-xl text-white`}
      href={href}
    >
      {title}
    </Link>
  )
}
const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center px-5 pt-20 gap-10">
      <Container title="Pasta" href="/pasta/pasta" />
      <Container title="Salsa" href="/pasta/salsa" />
    </div>
  )
}

export default Page
