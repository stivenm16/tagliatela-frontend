'use client'

import { Home, Plus, Search, User } from 'lucide-react'

export const FloatingMenu = () => {
  return (
    <div className="fixed bottom-30 right-5 z-50">
      <div className="flex flex-col gap-4 items-center p-4 bg-white/10 text-black backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
        <IconButton icon={<Home size={20} color="black" />} />
        <IconButton icon={<User size={20} color="black" />} />
        <IconButton icon={<Search size={20} color="black" />} />
        <IconButton icon={<Plus size={20} color="black" />} />
        <IconButton icon={<Search size={20} color="black" />} />
        <IconButton icon={<Plus size={20} color="black" />} />
        <IconButton icon={<User size={20} color="black" />} />
        <IconButton icon={<Search size={20} color="black" />} />
        <IconButton icon={<Plus size={20} color="black" />} />
      </div>
    </div>
  )
}

const IconButton = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <button className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 text-white">
      {icon}
    </button>
  )
}
