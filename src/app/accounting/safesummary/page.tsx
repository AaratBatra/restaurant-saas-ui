"use client";
import { Button } from "@/components/ui/button";
import WMYDateRange from "@/components/ui/WMYDateRange";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { ArrowLeft, Plus, Save } from "lucide-react";
import React, { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { generateData } from "./makeData";
import { useFullDataTable } from "@/hooks/use-full-data-table";
import { SafeSummaryTable, safleSummaryColumns } from "./safe-summary-columns";
import { ColumnDef } from "@tanstack/react-table";
import FullDataTable from "@/components/FullDataTable";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormDate } from "@/components/ui/FormDate";
import { FormInput } from "@/components/ui/FormInput";

const SafeSummary = () => {
	const [date, setDate] = useState<DateRange | undefined>({
		from: startOfMonth(new Date()),
		to: endOfMonth(new Date()),
	});
	const initData = useMemo(() => generateData(), []);
	const props = useFullDataTable<SafeSummaryTable>(
		initData,
		safleSummaryColumns as ColumnDef<SafeSummaryTable>[],
		{
			openSheet: () => setOpen({bool: true, mode: "edit"}),
		}
	);
	const [open, setOpen] = useState<{ bool: boolean; mode: "add" | "edit" }>({bool: false, mode: "add"});
	return (
		<div className="w-full p-4">
			<div className="w-full flex items-center justify-between mb-4">
				<h1>Safe Summary</h1>
				<WMYDateRange date={date} setDate={setDate} />
			</div>
			<div className="w-full flex items-center gap-16">
				<div className="p-6 w-52 h-40 shadow-xl rounded-lg border">
					<div className="mb-2">
						<p>Last Declaration</p>
						<h3>Safe Float</h3>
					</div>
					<h1 className="font-bold">£ 0</h1>
				</div>
				<div className="p-6 w-52 h-40 shadow-xl rounded-lg border">
					<div className="mb-2">
						<p>Last Declaration</p>
						<h3>Till Float</h3>
					</div>
					<h1 className="font-bold">£ 0</h1>
				</div>
				<div className="p-6 w-52 h-40 shadow-xl rounded-lg border">
					<div className="mb-2">
						<p>Last Declaration</p>
						<h3>Sales Cash</h3>
					</div>
					<h1 className="font-bold">£ 0</h1>
				</div>
			</div>
			<div className="w-full flex flex-col gap-2">
				<Button className="place-self-end" onClick={() => setOpen({bool: true, mode: "add"})}>
					<Plus className="w-4 h-4" />
					ADD NEW
				</Button>
				<FullDataTable {...props} />
			</div>
			<AddEditSafeSummary open={open.bool} setOpen={(o: boolean) => setOpen({bool: o, mode: "add"})} mode={open.mode} />
		</div>
	);
};

export default SafeSummary;

function AddEditSafeSummary({
	open,
	setOpen,
	mode
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	mode: "add" | "edit";
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
										{mode === "add" ? "Add" : "Edit"} Safe Summary
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Button
										type="submit"
									>
										<Save className="w-4 h-4" /> SUBMIT
									</Button>
								</div>
							</SheetTitle>
						</SheetHeader>
						<div className="w-full flex flex-col gap-4 mt-4">
							<div className="grid grid-cols-2">
								<FormDate name="date" label="Date" required />
								<FormInput name="witness" label="Witness" required />
								<FormInput name="safeFloat" label="Safe Float" required />
								<FormInput name="tillFloat" label="Till Float" required />
							</div>
							<FormInput name="salesCash" label="Sales Cash" required />
							<FormInput name="misc" label="Misc/Other Expenditure" required />
							<FormInput className="w-[350px]" name="miscDetails" label="Please give details if any Misc or other expenditure" />
							<FormInput className="w-[350px]" name="note" label="Note" />
						</div>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
