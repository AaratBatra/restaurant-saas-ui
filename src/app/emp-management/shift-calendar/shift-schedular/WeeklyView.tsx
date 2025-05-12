import React, { useEffect, useState } from "react";
import {
	format,
	addDays,
	startOfWeek,
	isSameWeek,
	startOfDay,
	endOfDay,
	subHours,
	subMinutes,
	addHours,
} from "date-fns";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Department, Shift } from "@/types/ShiftCalendar";
import { Input } from "@/components/ui/input";
import { CirclePlus, Edit, Info, Search, Trash } from "lucide-react";
import { DeptData } from "./mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface WeeklyViewProps {
	departments: DeptData;
	currentDate: Date;
	onCellClick: (
		employee: string,
		department: string,
		start: Date,
		end: Date
	) => void;
	onShiftClick: (shift: Shift) => void;
	onDelete: (shiftToDelete: Shift) => void;
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
const WeeklyView = ({
	departments,
	currentDate,
	onCellClick,
	onShiftClick,
	onDelete,
	searchTerm,
	setSearchTerm,
}: WeeklyViewProps) => {
	const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
	const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
	const [depts, setDepts] = useState<DeptData>([]);
	useEffect(() => {
		setDepts(departments);
	}, [departments]);

	const renderShift = (
		shift: { id: string; title: string; start: Date; end: Date },
		employee: string,
		department: string
	) => {
		if (!isSameWeek(shift.start, currentDate, { weekStartsOn: 1 }))
			return null;
		const startDay = shift.start.getDay() || 7;
		const endDay = shift.end.getDay() || 7;
		const startOffset = startDay - 1;
		const duration = endDay - startDay + (endDay < startDay ? 7 : 0);
		return (
			<div
				key={shift.id}
				className="absolute bg-gray-100 border-l-4 border-l-black border border-gray-300 text-black text-[0.60rem] p-1 overflow-hidden cursor-pointer"
				style={{
					left: `${(startOffset / 7) * 100}%`,
					width: `${((duration || 1) / 7) * 100}%`,
					top: "2px",
					bottom: "2px",
				}}
				// onClick={(e) => {
				// 	e.stopPropagation();
				// 	onShiftClick({
				// 		...shift,
				// 		employee,
				// 		department,
				// 	});
				// }}
			>
				<div className="font-semibold text-[0.65rem] leading-3">
					{shift.title}
				</div>
				<div className="flex flex-col gap-1 absolute top-0 right-0">
					<Button
						className="w-3 h-3 rounded-full"
						variant={"ghost"}
						size={"icon"}
						onClick={() =>
							onCellClick(
								employee,
								department,
								addHours(shift.start,1),
								addHours(shift.end,1)
							)
						}
						asChild
					>
						<CirclePlus className="w-3 h-3" />
					</Button>
					<Popover>
						<PopoverTrigger type="button" className="w-3 h-3 rounded-full">
							<Info className="w-3 h-3" />
						</PopoverTrigger>
						<PopoverContent className="w-40" side="right">
							<div className="border-b border-b-black text-base">
								{format(shift.start, "HH:mm")} -{" "}
								{format(shift.end, "HH:mm")}
								<div className="w-full flex items-center justify-between text-sm mt-2">
									Draft
									<div className="flex">
										<Button
											className="w-4 h-4 rounded-full hover:text-red-500"
											variant={"ghost"}
											size={"icon"}
											onClick={() =>
												onDelete({...shift, employee: employee, department: department})
											}
											asChild
										>
											<Trash className="w-4 h-4" />
										</Button>
										<Button
											className="w-4 h-4 rounded-full hover:text-yellow-500"
											variant={"ghost"}
											size={"icon"}
											onClick={() =>
												onShiftClick({
													...shift,
													employee,
													department,
												})
											}
											asChild
										>
											<Edit className="w-4 h-4" />
										</Button>
									</div>
								</div>
							</div>
						</PopoverContent>
					</Popover>
				</div>
				<div>
					{format(shift.start, "HH:mm")} -{" "}
					{format(shift.end, "HH:mm")}
				</div>
				<div>
					Time:{" "}
					{subHours(shift.end, shift.start.getHours()).getHours()} h{" "}
					{subMinutes(
						shift.end,
						shift.start.getMinutes()
					).getMinutes()}{" "}
					m / 1 Shift
				</div>
			</div>
		);
	};

	return (
		<div className="flex-grow overflow-auto border rounded-md shadow-md">
			<div className="flex">
				<div className="w-48 px-2">
					DRAFT
					<div className="flex items-center border-b my-1">
						<Search className="w-4 h-4 place-self-center" />
						<Input
							className="border-none focus-within:outline-none focus-within:ring-0 focus-visible:ring-0 shadow-none"
							placeholder="Search Employees"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<div className="text-xs font-light">
						Hours/Payroll <br />
						0h 0m / £ 0.00
					</div>
				</div>
				{days.map((day) => (
					<div
						key={day.toString()}
						className="flex-1 text-center border-l p-2"
					>
						<div className="font-semibold">
							{format(day, "EEEE")}
						</div>
						<div>{format(day, "d MMMM")}</div>
						<div className="text-xs">2 People</div>
						<div className="text-sm">9 h 15 m / £ 1,412.52</div>
					</div>
				))}
			</div>
			<Accordion type="multiple" className="w-full">
				{depts.map((dept) => (
					<AccordionItem key={dept.id} value={dept.name}>
						<AccordionTrigger className="px-2 py-1 bg-gray-200">
							{dept.name}
						</AccordionTrigger>
						<AccordionContent>
							{dept.employees.map((employee) => (
								<div
									key={employee.employeeName}
									className="flex"
								>
									<div className="w-48 p-2 border-b flex items-center gap-2">
										<Avatar>
											<AvatarImage
												src={employee.avatar}
											/>
											<AvatarFallback>
												Avatar {employee.employeeName}
											</AvatarFallback>
										</Avatar>
										<div>
											{employee.employeeName}
											<div className="text-[0.60rem]">
												9 h 15 m / £ 1,412.52
											</div>
										</div>
									</div>
									<div className="flex-grow relative">
										{days.map((day, index) => (
											<div
												key={day.toString()}
												className="absolute border-l h-full cursor-pointer hover:bg-gray-100"
												style={{
													left: `${
														(index / 7) * 100
													}%`,
													width: `${100 / 7}%`,
												}}
												onClick={() =>
													onCellClick(
														employee.employeeName,
														dept.name,
														startOfDay(day),
														endOfDay(day)
													)
												}
											></div>
										))}
										{employee.shifts &&
											employee.shifts.map((shift) =>
												renderShift(
													shift,
													employee.employeeName,
													dept.name
												)
											)}
									</div>
								</div>
							))}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};

export default WeeklyView;
