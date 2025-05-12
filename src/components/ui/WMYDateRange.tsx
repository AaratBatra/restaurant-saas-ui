"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
	addDays,
	format,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	endOfMonth,
	startOfYear,
	endOfYear,
} from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { type DateRange } from "react-day-picker";

export default function WMYDateRange({
	date,
	setDate,
	className,
}: React.HTMLAttributes<HTMLDivElement> & {
	date: DateRange | undefined;
	setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}) {
	// Check if the current preset is active
	const isActive = (from: Date, to: Date) =>
		date?.from?.getTime() === from.getTime() &&
		date?.to?.getTime() === to.getTime();

	return (
		<div>
			<div className={cn("flex gap-4 items-center justify-end", className)}>
				<ul className="w-16 list-none flex gap-2 border-b-2 border-b-gray-500 items-baseline justify-center text-sm">
					<li
						className={cn(
							"text-gray-500 hover:text-black hover:border-b-2 hover:border-b-black cursor-pointer",
							isActive(startOfWeek(new Date()), endOfWeek(new Date())) &&
								"text-black border-b-2 border-b-black"
						)}
						onClick={() =>
							setDate({
								from: startOfWeek(new Date()),
								to: endOfWeek(new Date()),
							})
						}
					>
						W
					</li>
					<li
						className={cn(
							"text-gray-500 hover:text-black hover:border-b-2 hover:border-b-black cursor-pointer",
							isActive(startOfMonth(new Date()), endOfMonth(new Date())) &&
								"text-black border-b-2 border-b-black"
						)}
						onClick={() =>
							setDate({
								from: startOfMonth(new Date()),
								to: endOfMonth(new Date()),
							})
						}
					>
						M
					</li>
					<li
						className={cn(
							"text-gray-500 hover:text-black hover:border-b-2 hover:border-b-black cursor-pointer",
							isActive(startOfYear(new Date()), endOfYear(new Date())) &&
								"text-black border-b-2 border-b-black"
						)}
						onClick={() =>
							setDate({
								from: startOfYear(new Date()),
								to: endOfYear(new Date()),
							})
						}
					>
						Y
					</li>
				</ul>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							id="date"
							variant={"ghost"}
                            size={"icon"}
							className={cn(
								"w-5 h-5 text-center font-normal cursor-pointer",
								!date && "text-muted-foreground"
							)}
							asChild
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							autoFocus
							mode="range"
							defaultMonth={date?.from}
							selected={date}
							onSelect={setDate}
							numberOfMonths={2}
						/>
					</PopoverContent>
				</Popover>
			</div>
            <span className="text-xs">
            {date?.from ? (
				date.to ? (
					<>
						{format(date.from, "LLL dd, y")} -{" "}
						{format(date.to, "LLL dd, y")}
					</>
				) : (
					format(date.from, "LLL dd, y")
				)
			) : (
				<></>
			)}
            </span>
		</div>
	);
}
