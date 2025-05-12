"use client";
import FullDataTable from "@/components/FullDataTable";
import { Button } from "@/components/ui/button";
import WMYDateRange from "@/components/ui/WMYDateRange";
import { endOfMonth, startOfMonth } from "date-fns";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { columns, ShiftCalendarTable } from "./shiftCalendarColumns";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { generateShiftCalendarData } from "./makeData";
import { Plus } from "lucide-react";
import { useFullDataTable } from "@/hooks/use-full-data-table";

const ShiftCalendar = () => {
	const [date, setDate] = useState<DateRange | undefined>({
		from: startOfMonth(new Date()),
		to: endOfMonth(new Date()),
	});
	// const [pagination, setPagination] = useState<PaginationState>({
	// 	pageIndex: 0,
	// 	pageSize: 10,
	// });
	const shiftCalendarData = useMemo<ShiftCalendarTable[]>(() => {
		if (date && date.from && date.to)
			return generateShiftCalendarData(date as { from: Date; to: Date });
		else return [];
	}, [date]);
	const props = useFullDataTable<ShiftCalendarTable>(shiftCalendarData, columns as ColumnDef<ShiftCalendarTable>[]);
	return (
		<div className="w-full p-4">
			<div className="w-full flex items-center justify-between mb-4">
				<div>
					<h1>Shift Calendar</h1>
					<div className="flex items-center gap-2">
						<Button className="py-1 rounded-[3px] h-8">
							Employees
						</Button>
						<Link href={"/emp-management/employees/view-calendar"}>
							<Button
								variant={"secondary"}
								className="py-1 rounded-[3px] h-8"
							>
								My Shifts
							</Button>
						</Link>
					</div>
				</div>
				<WMYDateRange date={date} setDate={setDate} />
			</div>
			<div className="w-full flex justify-end my-2">
				<Link href="/emp-management/shift-calendar/shift-schedular">
					<Button>
						<Plus className="w-4 h-4" />
						Add Schedule
					</Button>
				</Link>
			</div>
			<FullDataTable
				{...props}
			/>
		</div>
	);
};

export default ShiftCalendar;
