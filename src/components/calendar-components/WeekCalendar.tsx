'use client';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import React, { useState } from 'react'
import {Calendar, CalendarProps, dateFnsLocalizer, Event} from 'react-big-calendar';
import "@/components/calendar-components/calendar-styles.css"
import { DayEvent } from "@/app/emp-management/employees/view-calendar/page";

const locales = {
    'en-US': enUS
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales
});

const WeekCalendar = <T extends Event,>(props: Omit<CalendarProps<T>, 'localizer' | 'events'> & { events?: T[] }) => {
  return (
    <div className="w-full h-full">
      <div className='h-[calc(85vh-5rem)] rounded-2xl shadow-md overflow-hidden border'>
        <Calendar localizer={localizer} toolbar={false} view="week" {...props} />
      </div>
    </div>
  )
}

export default WeekCalendar
