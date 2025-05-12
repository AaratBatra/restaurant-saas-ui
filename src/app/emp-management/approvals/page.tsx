"use client";
import MonthSwitcher from "@/components/calendar-components/MonthSwitcher";
import { Button } from "@/components/ui/button";
import { DateTimeInput } from "@/components/ui/datetime-input";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { ArrowLeft, Check, RefreshCcw, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { generateData } from "./makeData";
import { useFullDataTable } from "@/hooks/use-full-data-table";
import { approvalColumns, ApprovalTable } from "./approval-columns";
import { ColumnDef } from "@tanstack/react-table";
import FullDataTable from "@/components/FullDataTable";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/ui/FormInput";

const cardsData = [
	{
		name: "Shifts",
		count: 10,
	},
	{
		name: "Leaves",
		count: 0,
	},
	{
		name: "Profile",
		count: 0,
	},
];
const Approvals = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const initData = useMemo(() => generateData(), []);
	const [openUpdateSheet, setOpenUpdateSheet] = useState(false);
	const [openEditSheet, setOpenEditSheet] = useState(false);
	const props = useFullDataTable(
		initData,
		approvalColumns as ColumnDef<ApprovalTable>[],
		{
			openUpdateSheet: () => setOpenUpdateSheet(true),
			openEditSheet: () => setOpenEditSheet(true),
		}
	);
	return (
		<div className="w-full p-4">
			<div className="w-full flex items-center justify-between">
				<div className="space-y-2">
					<h1>Approvals</h1>
					<div className="flex items-center gap-2">
						<Button className="py-1 rounded-[3px] h-8">
							Employees
						</Button>
						<Link href={"/emp-management/employees/view-calendar"}>
							<Button
								variant={"secondary"}
								className="py-1 rounded-[3px] h-8"
							>
								My Request
							</Button>
						</Link>
					</div>
				</div>
				<div className="flex items-center gap-3">
					{cardsData.map((card, idx) => (
						<div key={idx} className="relative w-32 h-24 flex items-center justify-center border rounded-lg shadow-md hover:shadow-lg">
							<span className="bg-black w-8 h-8 flex items-center justify-center text-white rounded-full absolute -top-1 -right-1">
								{card.count}
							</span>
							{card.name}
						</div>
					))}
				</div>
			</div>
			<div className="w-full flex items-center justify-end gap-6">
				<div className="flex items-center justify-end gap-2">
					<Link
						href={"#"}
						className="flex items-center justify-center w-12 h-12 rounded-full border border-black"
					>
						<Image
							src={
								"https://upload.wikimedia.org/wikipedia/commons/e/ef/Foodics_logo.jpg"
							}
							alt="FOODICS"
							width={80}
							height={80}
							className="w-[40px] h-[40px] object-contain"
						/>
					</Link>
					<Button>
						<RefreshCcw className="w-4 h-4" /> Fetch API Data
					</Button>
				</div>
				<DateTimePicker
					value={date}
					onChange={(d) => setDate(d)}
					hideTime
					timePicker={{ hour: false, minute: false }}
					renderTrigger={({ open, value, setOpen }) => (
						<DateTimeInput
							value={value}
							format="dd MMM yyyy"
							disabled={open}
							onCalendarClick={() => setOpen(!open)}
						/>
					)}
				/>
				<Button
					variant={"outline"}
					className="border-red-500 text-red-500"
				>
					<X />
					REJECT
				</Button>
				<Button
					variant={"outline"}
					className="border-green-500 text-green-500"
				>
					<Check />
					APPROVE
				</Button>
			</div>
			<div className="w-full">
				<FullDataTable {...props} />
			</div>
			<UpdateSheet open={openUpdateSheet} setOpen={setOpenUpdateSheet} />
			<EditSheet open={openEditSheet} setOpen={setOpenEditSheet} />
		</div>
	);
};

export default Approvals;

function UpdateSheet({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const form = useForm();
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent
				className="!w-[400px] sm:!w-[800px] sm:max-w-[36rem]"
				hideclose
			>
				<Form {...form}>
					<form>
						<SheetHeader>
							<SheetTitle className="flex items-center justify-between font-bold text-2xl mr-2">
								<div className="flex items-center gap-2">
									<Button
										className="w-6 h-16 font-extrabold hover:bg-transparent"
										variant={"ghost"}
										size={"icon"}
										type="button"
										onClick={() => setOpen(false)}
									>
										<ArrowLeft className="!size-10" />
									</Button>
									<div className="flex flex-col items-start">
										Update punch In/Out Request
										<p className="text-sm text-gray-500">
											{format(
												new Date(),
												"MM/dd/yyyy, hh:mm a"
											)}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Button
										variant={"ghost"}
										size={"icon"}
										className="w-5 h-5 text-red-500"
										type="submit"
										asChild
									>
										<X className="w-4 h-4" />
									</Button>
									<Button
										variant={"ghost"}
										size={"icon"}
										className="w-5 h-5 text-green-500"
										type="submit"
										asChild
									>
										<Check className="w-4 h-4" />
									</Button>
								</div>
							</SheetTitle>
						</SheetHeader>
						<div className="w-full flex flex-col gap-4">
							<p className="mb-2">
								Location: Red Farm Covent Garden
							</p>
							<div>
								<p>Employee Name: Hang</p>
								<p>Department: BOH</p>
							</div>
							<p>Shift Type: Day Shift</p>
							<div className="grid grid-cols-2 gap-y-2 gap-x-4">
								<div>
									Shift Start Time <br />
									14:30
								</div>
								<div>
									Shift End Time <br />
									00:00
								</div>
								<div>
									Punch In Time <br />
									14:34
								</div>
								<div>
									Punch Out Time <br />
									23:49
								</div>
							</div>
							<div className="w-full flex-col mt-40 border-t border-t-gray-200 pt-2 space-y-4">
								<FormField
									control={form.control}
									name="sendChanges"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>
													Send Changes
												</FormLabel>
												<FormDescription>
													If changing shift from one
													employee to another, both
													employees will notified
												</FormDescription>
											</div>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="sendMessage"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>
													Send Message
												</FormLabel>
												<FormDescription>
													If changing shift from one
													employee to another, both
													employees will notified
												</FormDescription>
											</div>
										</FormItem>
									)}
								/>
							</div>
						</div>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}

function EditSheet({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const form = useForm();
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent
				className="!w-[400px] sm:!w-[800px] sm:max-w-[36rem]"
				hideclose
			>
				<Form {...form}>
					<form>
						<SheetHeader>
							<SheetTitle className="flex items-center justify-between font-bold text-2xl mr-2">
								<div className="flex items-center gap-2">
									<Button
										className="w-6 h-16 font-extrabold hover:bg-transparent"
										variant={"ghost"}
										size={"icon"}
										type="button"
										onClick={() => setOpen(false)}
									>
										<ArrowLeft className="!size-10" />
									</Button>
									<div className="flex flex-col items-start">
										Edit Punch IN/OUT
										<p className="text-sm text-gray-500">
											{format(
												new Date(),
												"MM/dd/yyyy, hh:mm a"
											)}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Button
										variant={"ghost"}
										size={"icon"}
										className="w-5 h-5 text-red-500"
										type="submit"
										asChild
									>
										<X className="w-4 h-4" />
									</Button>
									<Button
										variant={"ghost"}
										size={"icon"}
										className="w-5 h-5 text-green-500"
										type="submit"
										asChild
									>
										<Check className="w-4 h-4" />
									</Button>
								</div>
							</SheetTitle>
						</SheetHeader>
						<div className="w-full flex flex-col gap-12 mt-4">
							<h2>Original Shift Timings</h2>
							<div className="grid grid-cols-2 gap-y-2 gap-x-4">
								<div>
									Shift Start Time <br />
									14:30
								</div>
								<div>
									Shift End Time <br />
									00:00
								</div>
								<div>
									Punch In Time <br />
									14:34
								</div>
								<div>
									Punch Out Time <br />
									23:49
								</div>
							</div>
							<h2>Edit PunchIn/Out Time</h2>
							<div className="flex items-center gap-4">
								<FormInput
									name="punchIn"
									label="Punch IN Time"
									type="time"
									className="w-[220px]"
								/>
								<FormInput
									name="punchOut"
									label="Punch OUT Time"
									type="time"
									className="w-[220px]"
								/>
							</div>
						</div>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
