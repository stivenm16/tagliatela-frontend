'use client'

import { usePathname, useRouter } from 'next/navigation'

import { ArrowLeft } from './Icons/ArrowLeft'

export const Header = () => {
  const path = usePathname()
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return (
    <div className="bg-surface relative uppercase h-20 flex justify-center items-center">
      <div className="absolute top-[35%] left-10" onClick={handleBack}>
        <ArrowLeft className={''} />
      </div>
      <span className=" w-full items-center text-xl justify-center text-center">
        {path.split('/').pop()}
      </span>
    </div>
  )
}
