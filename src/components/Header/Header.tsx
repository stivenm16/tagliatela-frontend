'use client'

import colorMatcher from '@/utils/colorMatcher'
import { ROUTES } from '@/utils/constants'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft } from '../Icons/ArrowLeft'
import { PastaFilters } from './Filters/PastaFilters'
import { SaucesFilters } from './Filters/SaucesFilters'
import { SuggestedFilters } from './Filters/SuggestedFilters'

const levelOfDepthPerCategory: Record<string, number> = {
  bebidas: 2,
  'productos-italianos': 2,
  pasta: 2,
  recomendados: 1,
  'platos-no-disponibles': 1,
  'check-meeting': 1,
}

const FiltersToDisplay = () => {
  const path = usePathname()
  const arrayPath = path.split('/').filter(Boolean)
  const route = arrayPath[0] as ROUTES

  if (arrayPath[arrayPath.length - 1] === 'tipos-de-pasta')
    return <SaucesFilters />
  if (levelOfDepthPerCategory[route] < arrayPath.length) return null
  if (ROUTES.RECOMENDADOS == `/${route}`) return <SuggestedFilters />
  if (ROUTES.PASTA == `/${arrayPath[1]}`) return <PastaFilters />
  if ('salsa' == `${arrayPath[1]}`) return <SaucesFilters />
}

export const Header = () => {
  const path = usePathname()
  const router = useRouter()
  const arrayPath = path.split('/').filter(Boolean)

  const route = arrayPath[0] as ROUTES
  const handleGoBack = () => {
    if (arrayPath.length === 1) {
      router.push('/')
    } else {
      router.back()
    }
  }

  return (
    <div
      style={{
        backgroundColor: colorMatcher(route),
        color: 'white',
      }}
      className={`fixed w-full top-0 uppercase h-20  z-10 justify-between flex gap-5  items-center bg-neutral-50`}
    >
      <div className="flex  gap-5">
        <div onClick={handleGoBack} className="cursor-pointer ml-5">
          <ArrowLeft className={''} />
        </div>

        <span className=" w-fit items-center text-xl font-bold">
          {path
            .split('/')
            .pop()
            ?.split('-')
            .join(' ')
            ?.replace('%C3%B1', 'ñ')
            ?.toUpperCase() || 'Home'}
        </span>
      </div>
      <FiltersToDisplay />
    </div>
  )
}
