"use client";
import { Button } from "@/components/ui/button";
import WMYDateRange from "@/components/ui/WMYDateRange";
import { endOfMonth, startOfMonth } from "date-fns";
import { Download, Plus } from "lucide-react";
import React, { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { generateData } from "./makeData";
import { useFullDataTable } from "@/hooks/use-full-data-table";
import { payrollColumns, PayrollTable } from "./payroll-columns";
import { ColumnDef } from "@tanstack/react-table";
import FullDataTable from "@/components/FullDataTable";
import { useRouter } from "next/navigation";

const Payroll = () => {
	const router = useRouter();
	const [date, setDate] = useState<DateRange | undefined>({
		from: startOfMonth(new Date()),
		to: endOfMonth(new Date()),
	});
	const initData = useMemo(() => generateData(), []);
	const props = useFullDataTable(
		initData,
		payrollColumns as ColumnDef<PayrollTable>[]
	);
	return (
		<div className="w-full flex flex-col p-4">
			<div className="w-full flex items-center justify-between mb-4">
				<h1>Payroll Report</h1>
				<WMYDateRange date={date} setDate={setDate} />
			</div>
			<div className="max-w-max w-max flex items-center place-self-end gap-2 mb-4">
				<Button>
					<Download />
					Download
				</Button>
				<Button onClick={() => router.push("/emp-management/payroll/new-payroll")}>
					<Plus />
					Create New
				</Button>
			</div>
			<FullDataTable {...props} />
		</div>
	);
};

export default Payroll;
