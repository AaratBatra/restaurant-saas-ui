"use client";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { DateTimeInput } from "@/components/ui/float-date";
import { Save } from "lucide-react";
import React, { useState } from "react";

const opts = [
	{
		name: "EPOS",
		items: [
			"Food",
			"Drinks",
			"Discount",
			"Others",
			"VAT",
			"Service Charge",
			"Credit Card Tips",
		],
		checked: false,
	},
	{
		name: "Petty Cash",
		items: [
			"Food",
			"Drink",
			"Repairs",
			"PPS",
			"Misc",
			"Deposit Received",
			"Deposit Paid",
			"Voucher",
		],
		checked: false,
	},
	{
		name: "PDQ Takings",
		items: ["PDQ All", "Stripe"],
		checked: false,
	},
	{
		name: "Till Systems",
		items: ["First Floor", "Ground Floor"],
		checked: false,
	},
	{
		name: "Third Party Takings",
		items: ["Uber", "Supper", "Deliveroo", "Yums Program"],
		checked: false,
	},
	{
		name: "KPI",
		items: [
			"Table Covers",
			"Discount",
			"Third Party Covers",
			"Void Covers",
			"Refunds",
			"Complaints",
			"Discounts",
		],
		checked: false,
	},
	{
		name: "Safe Summary",
		items: [],
		checked: false,
	},
];
const NewReport = () => {
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);
	const [data, setData] = useState(opts);
	return (
		<div className="w-full p-4">
			<div className="w-full flex items-center justify-between">
				<div className="flex items-center gap-2">
					<BackButton /> <h1>Create New Report</h1>
				</div>
				<Button>
					<Save />
					SAVE REPORT
				</Button>
			</div>
			<div className="flex max-w-xl items-center gap-6 my-4">
				<DateTimePicker
					value={startDate}
					onChange={(d) => setStartDate(d)}
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
					value={endDate}
					onChange={(d) => setEndDate(d)}
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
			</div>
			<div className="w-full my-4">
				<h3>Select Sections</h3>
				<div className="flex items-center gap-4">
					{data.map((item, idx) => (
						<CheckItem
							key={idx}
							item={item.name}
							checked={item.checked}
							onCheckedChange={(c: boolean) =>
								setData((prev) =>
									prev.map((p, i) => ({
										...p,
										checked: i === idx ? c : p.checked,
									}))
								)
							}
						/>
					))}
				</div>
				{data
					.filter((d) => d.checked)
					.map((d, idx) => {
						return (
							<div key={idx} className="my-4">
								<h3 className="capitalize font-bold">
									Select {d.name} Fields
								</h3>
								<div className="flex items-center gap-4">
									{d.items &&
										d.items.length > 0 &&
										d.items.map((item, idx) => (
											<CheckItem key={idx} item={item} />
										))}
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default NewReport;

function CheckItem({
	item,
	checked,
	onCheckedChange,
}: {
	item: string;
	checked?: boolean;
	onCheckedChange?: (c: boolean) => void;
}) {
	return (
		<div className="flex items-center space-x-2 shadow-sm border p-2 rounded-md">
			<Checkbox
				checked={checked}
				onCheckedChange={(c) => onCheckedChange?.(c as boolean)}
				id={item}
			/>
			<label
				htmlFor={item}
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				{item}
			</label>
		</div>
	);
}
