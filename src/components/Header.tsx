'use client'

import { usePathname, useRouter } from 'next/navigation'

import colorMatcher from '@/utils/colorMatcher'
import { ArrowLeft } from './Icons/ArrowLeft'

export const Header = () => {
  const path = usePathname()
  const router = useRouter()
  const handleGoBack = () => {
    router.back()
  }

  return (
    <div
      style={{
        backgroundColor: colorMatcher(path.split('/').filter(Boolean)[0]),
        color: 'white',
      }}
      className={`relative uppercase h-20 flex gap-5  items-center bg-neutral-50`}
    >
      <div onClick={handleGoBack} className="cursor-pointer ml-5">
        <ArrowLeft className={''} />
      </div>

      <span className=" w-fit items-center text-xl font-bold">
        {path.split('/').pop()?.split('-').join(' ')?.toUpperCase() || 'Home'}
      </span>
      <div className="w-full" id="filters-container"></div>
    </div>
  )
}
