"use client";
import MonthSwitcher from "@/components/calendar-components/MonthSwitcher";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useFullDataTable } from "@/hooks/use-full-data-table";
import React, { useMemo, useState } from "react";
import { attendanceColumns, AttendanceTable } from "./attendance-columns";
import { ColumnDef } from "@tanstack/react-table";
import { generateData } from "./makeData";
import FullDataTable from "@/components/FullDataTable";
import RangeSwitcher from "@/components/calendar-components/RangeSwitcher";
import { DateRange } from "react-day-picker";
import ShiftRangeSwitch from "../shift-calendar/shift-schedular/ShiftRangeSwitch";

const Attendance = () => {
	const [date, setDate] = useState<Date>(new Date());
	const [mode, setMode] = useState("daily");
	const initData = useMemo(() => generateData(), [mode]);
	const props = useFullDataTable(
		initData,
		attendanceColumns as ColumnDef<AttendanceTable>[]
	);
	return (
		<div className="w-full p-4">
			<div className="w-full flex items-center justify-between mb-4">
				<h1>Attendance</h1>
				<div className="flex items-center gap-2 w-max">
					{/* w-[350px] */}
					<Select
						defaultValue="daily"
						onValueChange={(val) => setMode(val)}
					>
						<SelectTrigger className="w-40 px-4">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="daily">DAILY</SelectItem>
							<SelectItem value="weekly">WEEKLY</SelectItem>
						</SelectContent>
					</Select>
					{/* <RangeSwitcher date={date} setDate={setDate} mode={mode} /> */}
					<ShiftRangeSwitch
						date={date}
						setDate={setDate}
						mode={mode}
					/>
				</div>
			</div>
			<FullDataTable {...props} />
		</div>
	);
};

export default Attendance;
