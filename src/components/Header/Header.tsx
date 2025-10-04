'use client'

import colorMatcher from '@/utils/colorMatcher'
import { ROUTES } from '@/utils/constants'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft } from '../Icons/ArrowLeft'
import { SuggestedFilters } from './Filters/SuggestedFilters'

export const Header = () => {
  const path = usePathname()
  const router = useRouter()
  const handleGoBack = () => {
    router.back()
  }

  const route = path.split('/').filter(Boolean)[0] as ROUTES
  console.log(route)
  return (
    <div
      style={{
        backgroundColor: colorMatcher(path.split('/').filter(Boolean)[0]),
        color: 'white',
      }}
      className={`relative uppercase h-20  z-1 justify-between flex gap-5  items-center bg-neutral-50`}
    >
      <div className="flex  gap-5">
        <div onClick={handleGoBack} className="cursor-pointer ml-5">
          <ArrowLeft className={''} />
        </div>

        <span className=" w-fit items-center text-xl font-bold">
          {path.split('/').pop()?.split('-').join(' ')?.toUpperCase() || 'Home'}
        </span>
      </div>
      {ROUTES.RECOMENDADOS == `/${route}` ? <SuggestedFilters /> : null}
    </div>
  )
}
