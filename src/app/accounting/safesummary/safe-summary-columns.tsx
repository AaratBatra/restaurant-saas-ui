"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { Edit, Eye, Trash } from "lucide-react";
import Link from "next/link";

export type SafeSummaryTable = {
	date: Date;
	witness: string;
	safeFloat: number;
	tillFloat: number;
	salesCash: number;
};
const columnHelper = createColumnHelper<SafeSummaryTable>();
// date time epos cash pdq deliver difference kpi total status actions-> delete, view, edit (icons)
export const safleSummaryColumns = [
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
	columnHelper.accessor("date", {
		id: "date",
		label: "DATE",
		header: "DATE",
		meta: {
			type: "date",
		},
		cell: (info) => format(info.getValue(), "dd MMM yyyy"),
		size: 240,
	}),
	columnHelper.accessor("witness", {
		id: "witness",
		label: "WITNESS",
		header: "WITNESS",
		meta: {
			type: "string",
		},
		cell: (info) => info.getValue(),
		size: 240,
	}),
	columnHelper.accessor("safeFloat", {
		id: "safeFloat",
		label: "SAFE FLOAT",
		header: "SAFE FLOAT",
		meta: {
			type: "number",
		},
		cell: (info) => info.getValue(),
		size: 240,
	}),
	columnHelper.accessor("tillFloat", {
		id: "tillFLoat",
		label: "TILL FLOAT",
		header: "TILL FLOAT",
		meta: {
			type: "number",
		},
		cell: (info) => info.getValue(),
		size: 240,
	}),
	columnHelper.accessor("salesCash", {
		id: "salesCash",
		label: "SALES CASH",
		header: "SALES CASH",
		meta: {
			type: "number",
		},
		cell: (info) => `£ ${info.getValue()}`,
		size: 240,
	}),
	columnHelper.display({
		id: "actions",
		header: "ACTIONS",
		cell: (props) => {
			return (
				<div className="flex items-center w-full justify-center gap-2">
					<Button size={"icon"} variant={"ghost"} className="w-4 h-4 hover:text-red-500 hover:cursor-pointer" asChild>
						<Trash className="w-4 h-4" />
					</Button>
					<Button
						size={"icon"}
						variant={"ghost"}
						asChild
						className="w-4 h-4 hover:text-green-500 hover:cursor-pointer"
						onClick={() =>
							props.table.options.meta?.callbacks?.openSheet?.()
						}
					>
						<Eye className="w-4 h-4" />
					</Button>
				</div>
			);
		},
		minSize: 60,
		size: 60,
		maxSize: 60,
	}),
];
