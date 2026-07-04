'use client'

import Logo from '@/components/Icons/LOGO.svg'
import { FloatingActions } from '@/components/home/FloatingActions'
import { HomeCategoryColumns } from '@/components/home/HomeCategoryColumns'
import { HomeHeroCards } from '@/components/home/HomeHeroCards'
import { HomeWidgets } from '@/components/home/HomeWidgets'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-2 px-6 py-6 relative">
      <header className="flex justify-center mb-6">
        <Logo className="w-48 h-auto" />
      </header>

      <main className="flex-1 flex flex-col gap-8">
        <section className="flex flex-col xl:flex-row gap-8 items-start justify-center">
          <HomeHeroCards />
          <HomeCategoryColumns />
        </section>

        <section className="flex justify-center pb-20">
          <HomeWidgets />
        </section>
      </main>

      <FloatingActions />
    </div>
  )
}
