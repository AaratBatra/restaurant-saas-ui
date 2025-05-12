import { Button } from '@/components/ui/button'
import { addDays, addWeeks, format, startOfWeek, subDays, subWeeks } from 'date-fns';
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'

const ShiftRangeSwitch = ({date, setDate, mode}: {date: Date, setDate: React.Dispatch<React.SetStateAction<Date>>, mode: string}) => {
  function render() {
    if (mode === "daily") {
        return format(date, "dd LLLL");
    } else if (mode === "weekly") {
        const sow = startOfWeek(date, { weekStartsOn: 1 });
        return `${format(sow, "LLL dd yyyy")} - ${format(addDays(sow, 6), "LLL dd yyyy")}`
    } else {
        const sow = startOfWeek(date, { weekStartsOn: 1 });
        return `${format(sow, "LLL dd yyyy")} - ${format(addDays(sow, 13), "LLL dd yyyy")}`
    }
  }
  function handlePrevious() {
    if (mode === "daily") {
        setDate(subDays(date, 1));
    } else if (mode === "weekly") {
        setDate(subWeeks(date, 1));
    } else {
        setDate(subWeeks(date, 2));
    }
  }
  function handleNext() {
    if (mode === "daily") {
        setDate(addDays(date, 1));
    } else if (mode === "weekly") {
        setDate(addWeeks(date, 1));
    } else {
        setDate(addWeeks(date, 2));
    }
  }
  return (
    <div className="h-9 min-w-max w-max flex items-center gap-2 border shadow-sm py-1 px-2 rounded-sm">
			<Button variant={"ghost"} size={"icon"} onClick={handlePrevious}>
				<ArrowLeft className="w-4 h-4" />
			</Button>
			<p className="text-sm">{render()}</p>
			<Button variant={"ghost"} size={"icon"} onClick={handleNext}>
				<ArrowRight className="w-4 h-4" />
			</Button>
		</div>
  )
}

export default ShiftRangeSwitch
