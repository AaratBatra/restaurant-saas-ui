"use client";
import { Button } from "@/components/ui/button";
import { DateTimeInput } from "@/components/ui/float-date";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { Plus, Save, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import MultiSelect from "@/components/ui/multi-select";
import { Checkbox } from "@/components/ui/checkbox";
import { generateData } from "./makeData";
import { newPayrollColumns, NewPayrollTable } from "./new-payroll-columns";
import { useFullDataTable } from "@/hooks/use-full-data-table";
import { ColumnDef } from "@tanstack/react-table";
import FullDataTable from "@/components/FullDataTable";

const opts = [
	{ value: "management", label: "Management" },
	{ value: "BOH", label: "BOH" },
	{ value: "FOH", label: "FOH" },
];
const NewPayroll = () => {
	const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
	const [toDate, setToDate] = useState<Date | undefined>(undefined);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const initData = useMemo(() => generateData(), []);
	const props = useFullDataTable(
		initData,
		newPayrollColumns as ColumnDef<NewPayrollTable>[]
	);
	return (
		<div className="w-full p-4 flex flex-col gap-4">
			<div className="w-full flex items-center justify-between">
				<h1>Payroll Reports</h1>
				<div className="flex items-center gap-2">
					<Button disabled>
						<Plus />
						ADD FIELDS
					</Button>
					<Button disabled>
						<Save />
						SAVE REPORT
					</Button>
				</div>
			</div>
			<div className="w-full px-16 flex items-center justify-between mt-4">
				<DateTimePicker
					value={fromDate}
					onChange={(d) => setFromDate(d)}
					hideTime
					timePicker={{ hour: false, minute: false }}
					renderTrigger={({ open, value, setOpen }) => (
						<DateTimeInput
							label="From Date"
							value={value}
							format="dd MMM yyyy"
							disabled={open}
							onCalendarClick={() => setOpen(!open)}
						/>
					)}
				/>
				<DateTimePicker
					value={toDate}
					onChange={(d) => setToDate(d)}
					hideTime
					timePicker={{ hour: false, minute: false }}
					renderTrigger={({ open, value, setOpen }) => (
						<DateTimeInput
							label="To Date"
							value={value}
							format="dd MMM yyyy"
							disabled={open}
							onCalendarClick={() => setOpen(!open)}
						/>
					)}
				/>
				<div className="flex items-center border-b my-1">
					<Search className="w-4 h-4 place-self-center" />
					<Input
						className="border-none focus-within:outline-none focus-within:ring-0 focus-visible:ring-0 shadow-none"
						placeholder="Employee Name or ID"
						//value={searchTerm}
						//onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<div className="flex items-center border-b my-1">
					<Search className="w-4 h-4 place-self-center" />
					<MultiSelect
						placeholder="Select Department"
						options={opts}
						selectedOptions={selectedItems}
						setSelectedOptions={setSelectedItems}
					/>
				</div>
			</div>
			<div className="w-full px-16 flex items-center gap-2">
				<div className="flex items-center space-x-2">
					<Checkbox id="terms" />
					<label
						htmlFor="terms"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						MONTHLY
					</label>
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox id="terms" />
					<label
						htmlFor="terms"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						WEEKLY
					</label>
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox id="terms" />
					<label
						htmlFor="terms"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						HOURLY
					</label>
				</div>
			</div>
			<div className="w-full px-16">
				<FullDataTable {...props} />
			</div>
		</div>
	);
};

export default NewPayroll;
