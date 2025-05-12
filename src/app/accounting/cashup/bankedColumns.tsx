"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import { Edit, Eye, Trash } from "lucide-react";
import Link from "next/link";

export type BankedColumns = {
	bankedDate: string;
	cashUpSheets: number;
	giroNumber: number;
	bankingTotal: string;
	bankedTotal: string;
	variance: string;
	sealedBy: string;
};
const columnHelper = createColumnHelper<BankedColumns>();
// date time epos cash pdq deliver difference kpi total status actions-> delete, view, edit (icons)
export const bankedColumns = [
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
	columnHelper.accessor("bankedDate", {
		id: "bankedDate",
		label: "BANKED DATE",
		header: "BANKED DATE",
		meta: {
			type: "date",
		},
		cell: (info) => info.getValue(),
		size: 170,
	}),
	columnHelper.accessor("cashUpSheets", {
		id: "cashUpSheets",
		label: "CASHUP SHEETS",
		header: "CASHUP SHEETS",
		meta: {
			type: "number",
		},
		cell: (info) => info.getValue(),
		size: 180,
	}),
	columnHelper.accessor("giroNumber", {
		id: "giroNumber",
		label: "GIRO NUMBER",
		header: "GIRO NUMBER",
		meta: {
			type: "number",
		},
		cell: (info) => info.getValue(),
		size: 230,
	}),
	columnHelper.accessor("bankingTotal", {
		id: "bankingTotal",
		label: "BANKING TOTAL",
		header: "BANKING TOTAL",
		meta: {
			type: "string",
		},
		cell: (info) => info.getValue(),
		size: 200,
	}),
	columnHelper.accessor("bankedTotal", {
		id: "bankedTotal",
		label: "BANKED TOTAL",
		header: "BANKED TOTAL",
		meta: {
			type: "string",
		},
		cell: (info) => info.getValue(),
		size: 180,
	}),
	columnHelper.accessor("variance", {
		id: "variance",
		label: "VARIANCE",
		header: "VARIANCE",
		meta: {
			type: "string",
		},
		cell: (info) => info.getValue(),
		size: 200,
	}),
	columnHelper.accessor("sealedBy", {
		id: "sealedBy",
		label: "SEALED BY",
		header: "SEALED BY",
		meta: {
			type: "string",
		},
		cell: (info) => info.getValue(),
		size: 154,
	}),
	columnHelper.display({
		id: "actions",
		header: "ACTIONS",
		cell: (props) => {
			return (
				<div className="flex items-center gap-2 w-10 ml-[20px]">
					<Button size={"icon"} variant={"ghost"} asChild>
						<Trash className="w-4 h-4" />
					</Button>
					<Button size={"icon"} variant={"ghost"} asChild onClick={()=>props.table.options.meta?.callbacks?.openSheet?.()}>
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
