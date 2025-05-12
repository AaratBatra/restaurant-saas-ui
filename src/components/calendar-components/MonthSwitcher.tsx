import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { subMonths, format, addMonths } from 'date-fns'

const MonthSwitcher = ({date, setDate}: {date: Date, setDate: React.Dispatch<React.SetStateAction<Date>>}) => {
  return (
    <div className='w-max min-w-max flex items-center gap-2 border shadow-sm px-2 rounded-md'>
      <Button variant={"ghost"} size={"icon"} onClick={() => setDate(subMonths(date, 1))}><ArrowLeft className='w-3 h-3' /></Button>
      <p className='text-sm'>{format(date, 'LLLL yyyy')}</p>
      <Button variant={"ghost"} size={"icon"} onClick={() => setDate(addMonths(date, 1))}><ArrowRight className='w-3 h-3' /></Button>
    </div>
  )
}

export default MonthSwitcher
