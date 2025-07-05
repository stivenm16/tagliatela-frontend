'use client'

import { usePathname, useRouter } from 'next/navigation'

import colorMatcher from '@/utils/colorMatcher'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
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
      className={`relative uppercase h-20 flex justify-center items-center`}
    >
      <div onClick={handleGoBack} className="absolute left-5 cursor-pointer">
        <ArrowLeft className={''} />
      </div>

      <span className=" w-full items-center text-xl font-bold justify-center text-center">
        {path.split('/').pop()?.split('-').join(' ')?.toUpperCase() || 'Home'}
      </span>
      <Link className="absolute top-[35%] right-5" href={'/'}>
        <HomeIcon />
      </Link>
    </div>
  )
}
