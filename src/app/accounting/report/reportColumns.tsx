"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { format } from "date-fns";

export type ReportTable = {
	reportName: string;
	date: Date;
	username: string;
};
const columnHelper = createColumnHelper<ReportTable>();
// date time epos cash pdq deliver difference kpi total status actions-> delete, view, edit (icons)
export const reportColumns = [
	columnHelper.display({
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table?.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value: CheckedState) =>
					table?.toggleAllPageRowsSelected(!!value)
				}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				onClick={(e) => e.stopPropagation()}
			/>
		),
		size: 30,
		minSize: 30,
		maxSize: 30,
		enableResizing: false,
		enableColumnFilter: false,
		enableGlobalFilter: false,
		enablePinning: false,
		enableSorting: false,
		enableHiding: false,
	}),
	columnHelper.accessor("reportName", {
		id: "reportName",
		label: "REPORT NAME",
		header: "REPORT NAME",
		meta: {
			type: "string",
		},
		cell: (info) => info.getValue(),
		size: 400,
	}),
	columnHelper.accessor("date", {
		id: "date",
		label: "DATE",
		header: "DATE",
		meta: {
			type: "date",
		},
		cell: (info) => format(info.getValue(), "dd MMM yyyy"),
		size: 400,
	}),
	columnHelper.accessor("username", {
		id: "username",
		label: "USER NAME",
		header: "USER NAME",
		meta: {
			type: "string",
		},
		cell: (info) => info.getValue(),
		size: 400,
	}),
	columnHelper.display({
		id: "actions",
		header: "ACTIONS",
		cell: (props) => {
			return (
				<div className="flex items-center gap-2 w-10 ml-[20px]">
					<Button size={"icon"} variant={"ghost"} className="w-5 h-5" asChild>
						<Trash className="w-4 h-4" />
					</Button>
				</div>
			);
		},
		minSize: 60,
		size: 60,
		maxSize: 60,
	}),
];
