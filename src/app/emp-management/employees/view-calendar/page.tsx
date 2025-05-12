"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Plus, PlusCircle, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import ShiftRangeSwitch from "../../shift-calendar/shift-schedular/ShiftRangeSwitch";
import WeekCalendar from "@/components/calendar-components/WeekCalendar";
import {
	addHours,
	format,
	parse,
	setHours,
	setMinutes,
	setSeconds,
	startOfWeek,
} from "date-fns";
import { Components, EventProps, Event, DateCellWrapperProps } from "react-big-calendar";
import { generateVacations } from "./generateVacations";
import AddEditSheet, { schema } from "./AddEditSheet";
import { z } from "zod";
import { faker } from "@faker-js/faker";
import { useToast } from "@/hooks/use-toast";
import { updateTime } from "@/utils/time-utils";
type SheetData = z.infer<typeof schema>;
export type DayEvent = {
	id: string;
	start: Date;
	end: Date;
	title: string;
	allDay?: boolean;
};

const ViewCalendar = () => {
	const router = useRouter();
	const [date, setDate] = useState(new Date());
	const [vacations, setVacations] = useState<DayEvent[]>([]);
	const [selectedVacation, setSelectedVacation] = useState<
		DayEvent | undefined
	>(undefined);
	const [selectedSlot, setSelectedSlot] = useState<Date>();
	const [sheetOpen, setSheetOpen] = useState(false);
	const { toast } = useToast();
	useEffect(() => {
		const vacations = generateVacations();
		vacations.push({
			id: faker.string.nanoid(8),
			start: new Date(2025, 0, 2),
			end: addHours(new Date(), 1),
			title: "all day vacation",
			allDay: true,
		});
		setVacations(vacations);
	}, []);
	function handleSubmit(data: SheetData) {
		if (data.id) {
			setVacations((prev) => {
				return prev.map((vacation) => {
					if (vacation.id === data.id) {
						const startDate = updateTime(
							data.shiftDate,
							data.shiftStartTime
						);
						const endDate = updateTime(
							data.shiftDate,
							data.shiftEndTime
						);
						return {
							id: data.id,
							title: data.title,
							start: startDate,
							end: endDate,
						};
					}
					return vacation;
				});
			});
			toast({
				title: "Shift updated successfully",
			});
		} else {
			const startDate = updateTime(data.shiftDate, data.shiftStartTime);
			const endDate = updateTime(data.shiftDate, data.shiftEndTime);
			setVacations((prev) => [
				...prev,
				{
					id: faker.string.nanoid(8),
					title: data.title,
					start: startDate,
					end: endDate,
				},
			]);
			toast({
				title: "Shift added successfully",
			});
		}
		setSelectedVacation(undefined);
		setSelectedSlot(undefined);
		setSheetOpen(false);
	}
	function handleDeleteVacation(vacation: DayEvent) {
		console.log("deleting: ", vacation);
		setVacations((prev) => prev.filter((v) => v.id !== vacation.id));
		setSelectedVacation(undefined);
		setSelectedSlot(undefined);
	}
	const components: Components<DayEvent, object> = useMemo(
		() => ({
			event: (props: EventProps<DayEvent>) => {
				return (
					<div className="relative !z-30 w-full !min-h-[70px] !h-full flex items-center justify-start cursor-pointer text-wrap max-md:text-xs text-black bg-white shadow-md rounded-md text-xs border border-gray-200">
						<div className="flex flex-col gap-1">
							<span className="text-sm font-semibold">
								{props.event.title}
							</span>
							{format(props.event.start, "h:mm a")} -{" "}
							{format(props.event.end, "h:mm a")}
						</div>
						<div className="absolute bottom-0 right-0 flex items-center gap-1">
							<Button
								className="!z-30 w-4 h-4"
								variant={"ghost"}
								size={"icon"}
								onClick={() => {
									setSelectedVacation(props.event);
									setSheetOpen(true);
								}}
								asChild
							>
								<Edit className="w-4 h-4 hover:text-yellow-400" />
							</Button>
							<Button
								className="!z-30 w-4 h-4"
								variant={"ghost"}
								size={"icon"}
								onClick={() =>
									handleDeleteVacation(props.event)
								}
								asChild
							>
								<Trash className="w-4 h-4 hover:text-red-400" />
							</Button>
						</div>
					</div>
				);
			},
			// header: (props) => {
			// 	return (
			// 		<div>
			// 			{format(props.date, "eeee")} <br />
			// 			{format(props.date, "MMM cc")}
			// 		</div>
			// 	);
			// },
			timeSlotWrapper: (props: {value?: Date, children?: React.ReactNode}) => {
				return (
					<div className="relative w-full h-[40px]">
						<Button
							className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-full !h-full p-0 bg-transparent shadow-none group cursor-pointer hover:bg-transparent hover:text-black"
							onClick={() => {
								setSelectedSlot(props.value)
								setSheetOpen(true);
							}}
						>
							<PlusCircle className="group-hover:opacity-100 opacity-0 w-4 h-4" />
						</Button>
						{props.children}
					</div>
				);
			},
		}),
		[]
	);
	useEffect(() => {
		if (!open) setSelectedVacation(undefined);
	}, [open]);
	// console.log(date);
	// console.log(startOfWeek(date, { weekStartsOn: 1 }));
	return (
		<div className="w-full p-4">
			<div className="w-full flex items-baseline justify-between mb-4">
				<div className="flex items-baseline gap-2">
					<Button
						variant={"ghost"}
						size={"icon"}
						onClick={() => router.back()}
						className="place-self-end pb-2"
						asChild
					>
						<ArrowLeft className="w-8 h-8" />
					</Button>

					<h1>Employee: X</h1>
				</div>
				<div className="flex items-center gap-2">
					<Button
						onClick={() => {
							router.push('/emp-management/leaves')
						}}
					>
						<Plus className="w-4 h-4" /> ADD VACATION
					</Button>
					<ShiftRangeSwitch
						date={date}
						setDate={setDate}
						mode={"weekly"}
					/>
				</div>
			</div>
			<div className="w-full">
				<WeekCalendar<DayEvent>
					events={vacations}
					date={date}
					onNavigate={setDate}
					components={components}
					step={60}
					timeslots={1}
				/>
			</div>
			<AddEditSheet
				open={sheetOpen}
				setOpen={setSheetOpen}
				vacation={selectedVacation}
				onSubmit={handleSubmit}
				slot={selectedSlot}
			/>
		</div>
	);
};

export default ViewCalendar;
