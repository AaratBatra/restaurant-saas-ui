"use client";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import React from "react";
import {
	Calendar,
	CalendarProps,
	dateFnsLocalizer,
	Event,
} from "react-big-calendar";
import "@/components/calendar-components/calendar-styles.css";

const locales = {
	"en-US": enUS,
};
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

const LeavesCalendar = <T extends Event,>(
	props: Omit<CalendarProps<T>, "localizer" | "events"> & { events: T[] }
) => {
	return (
		<div className="w-full h-full">
			<div className="h-[calc(85vh-5rem)] rounded-2xl shadow-md overflow-hidden border">
				<Calendar
					localizer={localizer}
					toolbar={false}
					view="month"
					{...props}
				/>
			</div>
		</div>
	);
};

export default LeavesCalendar;
