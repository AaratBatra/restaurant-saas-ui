"use client";
import RangeSwitcher from "@/components/calendar-components/RangeSwitcher";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	addDays,
	subDays,
	addWeeks,
	subWeeks,
	format,
	areIntervalsOverlapping,
} from "date-fns";
import { ArrowLeft, CheckCircle, CopyPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import {
	departments,
	DeptData,
	generateDepartments,
	initialShifts,
} from "./mockData";
import DailyView from "./DailyView";
import WeeklyView from "./WeeklyView";
import BiWeeklyView from "./BiWeeklyView";
import ShiftForm from "./ShiftForm";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import type { Shift } from "@/types/ShiftCalendar";
import ShiftRangeSwitch from "./ShiftRangeSwitch";
import { useToast } from "@/hooks/use-toast";
import { faker } from "@faker-js/faker";
import AddEditShiftSheet from "./AddEditShiftSheet";

const ShiftSchedular = () => {
	const router = useRouter();
	//const [shifts, setShifts] = useState<Shift[]>(initialShifts);
	const [view, setView] = useState<string>("weekly");
	const [currentDate, setCurrentDate] = useState<Date>(new Date());
	const [data, setData] = useState<DeptData>([]);

	const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const { toast } = useToast();

	useEffect(() => {
		const generatedDepartments = generateDepartments(view, currentDate);
		setData(generatedDepartments);
	}, [view, currentDate]);

	const filteredData = useMemo(() => {
		if (!searchTerm.trim()) return data;

		return data
			.map((department) => {
				const filteredEmployees = department.employees.filter(
					(employee) =>
						employee.employeeName
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
				);

				return { ...department, employees: filteredEmployees };
			})
			.filter((department) => department.employees.length > 0); // Remove empty departments
	}, [data, searchTerm]);

	const handleAddShift = (newShift: Shift) => {
		data.find((dept) => dept.name === newShift.department)
			?.employees.find((emp) => emp.employeeName === newShift.employee)
			?.shifts.forEach((s) => {
				if (
					areIntervalsOverlapping(
						{ start: newShift.start, end: newShift.end },
						{ start: s.start, end: s.end }
					)
				) {
					toast({
						variant: "destructive",
						title: "Shift is overlapping",
						description:
							"Please select a different time slot or edit / remove the existing shift",
					});
					return;
				}
			});
		const newData = data.map((dept) => {
			if (newShift.department === dept.name) {
				return {
					...dept,
					employees: dept.employees.map((emp) => {
						if (newShift.employee === emp.employeeName) {
							return {
								...emp,
								shifts: [
									...emp.shifts,
									{
										id: faker.string.nanoid(10),
										title: newShift.title,
										start: newShift.start,
										end: newShift.end,
									},
								],
							};
						}
						return emp;
					}),
				};
			} else {
				return dept;
			}
		});
		setData(newData);
		setIsSheetOpen(false);
	};

	const handleEditShift = (editedShift: Shift) => {
		if (!editedShift.id) return;
		const dept = data.find((dept) => dept.name === editedShift.department);
		const employee = dept?.employees.find(
			(emp) => emp.employeeName === editedShift.employee
		);
		if (!dept || !employee) return;
		const shift = employee.shifts.find((s) => s.id === editedShift.id);
		if (!shift) {
			toast({
				variant: "destructive",
				title: "Shift not found",
			});
			return;
		} else {
			const newData = data.map((d) => ({
				...d,
				employees: d.employees.map((e) => ({
					...e,
					shifts: e.shifts.map((s) => {
						if (s.id === editedShift.id) {
							return {
								id: s.id,
								title: editedShift.title,
								start: editedShift.start,
								end: editedShift.end,
							};
						} else {
							return s;
						}
					}),
				})),
			}));
			setData(newData);
		}
		setIsSheetOpen(false);
	};

	const handleDeleteShift = (shiftToDelete: Shift) => {
		if (!shiftToDelete.id) return;
		const dept = data.find(
			(dept) => dept.name === shiftToDelete.department
		);
		const employee = dept?.employees.find(
			(emp) => emp.employeeName === shiftToDelete.employee
		);
		if (!dept || !employee) return;
		const shift = employee.shifts.find((s) => s.id === shiftToDelete.id);
		if (!shift) {
			toast({
				variant: "destructive",
				title: "Shift not found",
			});
			return;
		} else {
			const newData = data.map((d) => ({
				...d,
				employees: d.employees.map((e) => ({
					...e,
					shifts: e.shifts.filter((s) => s.id !== shiftToDelete.id),
				})),
			}));
			setData(newData);
		}
		setIsSheetOpen(false);
	};

	const handleCellClick = (
		employee: string,
		department: string,
		start: Date,
		end: Date
	) => {
		setSelectedShift({
			title: "New Shift",
			employee,
			department,
			start,
			end,
		});
		setIsSheetOpen(true);
	};

	const handleShiftClick = (shift: Shift) => {
		setSelectedShift(shift);
		setIsSheetOpen(true);
	};
	console.log(data);
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

					<h1>Shift Schedular</h1>
				</div>
				<div className="flex items-center gap-2">
					<Button>
						<CheckCircle className="w-4 h-4" /> PUBLISH
					</Button>
					<Button>
						<CopyPlus className="w-4 h-4" /> COPY SCHEDULE
					</Button>
					<Select
						defaultValue="weekly"
						onValueChange={(val) => setView(val)}
					>
						<SelectTrigger className="min-w-32 h-9 py-2">
							<SelectValue />
						</SelectTrigger>

						<SelectContent>
							<SelectGroup>
								<SelectItem value="daily">Daily</SelectItem>
								<SelectItem value="weekly">Weekly</SelectItem>
								<SelectItem value="biweekly">
									2 Weekly
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<ShiftRangeSwitch
						date={currentDate}
						setDate={setCurrentDate}
						mode={view}
					/>
				</div>
			</div>
			<br />
			{view === "weekly" ? (
				<WeeklyView
					departments={filteredData}
					currentDate={currentDate}
					onCellClick={handleCellClick}
					onShiftClick={handleShiftClick}
					onDelete={handleDeleteShift}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			) : view === "daily" ? (
				<DailyView
					departments={filteredData}
					currentDate={currentDate}
					onCellClick={handleCellClick}
					onShiftClick={handleShiftClick}
					onDelete={handleDeleteShift}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			) : (
				<BiWeeklyView
					departments={filteredData}
					currentDate={currentDate}
					onCellClick={handleCellClick}
					onShiftClick={handleShiftClick}
					onDelete={handleDeleteShift}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			)}
			<AddEditShiftSheet
				open={isSheetOpen}
				setOpen={setIsSheetOpen}
				onClose={() => setIsSheetOpen(false)}
				onSubmit={
					selectedShift && selectedShift.id
						? handleEditShift
						: handleAddShift
				}
				shift={selectedShift as Shift}
			/>
		</div>
	);
};

export default ShiftSchedular;

/*
<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
				<SheetContent>
					<SheetHeader>
						<SheetTitle className="flex items-center justify-between font-bold text-2xl mr-2">
							<div className="flex items-center gap-2">
								<Button
									className="w-6 h-16 font-extrabold hover:bg-transparent"
									variant={"ghost"}
									size={"icon"}
									type="button"
									onClick={() => setIsSheetOpen(false)}
								>
									<ArrowLeft className="!size-10" />
								</Button>
								<div className="flex flex-col items-start">
									{selectedShift && selectedShift.id
										? "Edit"
										: "Add"}{" "}
									Shift{" "}
									<p className="text-sm text-gray-500">
										{selectedShift &&
											format(
												selectedShift.start,
												"MM/dd/yyyy, hh:mm a"
											)}
									</p>
								</div>
							</div>
						</SheetTitle>
					</SheetHeader>
					<ShiftForm
						shift={selectedShift as Shift}
						onSubmit={
							selectedShift && selectedShift.id
								? handleEditShift
								: handleAddShift
						}
						onDelete={
							selectedShift && selectedShift.id
								? handleDeleteShift
								: undefined
						}
						onClose={() => setIsSheetOpen(false)}
					/>
				</SheetContent>
			</Sheet>
*/