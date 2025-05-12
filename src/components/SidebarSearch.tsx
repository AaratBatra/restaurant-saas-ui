'use client'
import { Search, X } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input';

const SidebarSearch = ({filter, setFilter}: {filter: string, setFilter: React.Dispatch<React.SetStateAction<string>>}) => {
  const [toggleInput, setToggleInput] = React.useState(false);
  return (
    <div className='w-full flex items-center justify-end'>
      {toggleInput && (
        <Input type='text' placeholder='Search...' value={filter} onChange={(e) => setFilter(e.target.value)} />
      )}
      {
        toggleInput ? (
            <X className='font-bold h-6 w-6 cursor-pointer hover:font-extrabold' onClick={() => {setToggleInput(!toggleInput); setFilter("")}} />
        ) : (
            <Search className='font-bold h-6 w-6 cursor-pointer hover:font-extrabold' onClick={() => setToggleInput(!toggleInput)} />
        )
      }
    </div>
  )
}

export default SidebarSearch
