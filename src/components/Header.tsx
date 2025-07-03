'use client'

import { usePathname } from 'next/navigation'

import colorMatcher from '@/utils/colorMatcher'
import Link from 'next/link'
import { ArrowLeft } from './Icons/ArrowLeft'

export const Header = () => {
  const path = usePathname()
  return (
    <div
      style={{
        backgroundColor: colorMatcher(path.split('/').filter(Boolean)[0]),
        color: 'white',
      }}
      className={`relative uppercase h-20 flex justify-center items-center`}
    >
      <Link className="absolute top-[35%] left-10" href={'/'}>
        <ArrowLeft className={''} />
      </Link>
      <span className=" w-full items-center text-xl justify-center text-center">
        {path.split('/').pop()?.split('-').join(' ')?.toUpperCase() || 'Home'}
      </span>
    </div>
  )
}
