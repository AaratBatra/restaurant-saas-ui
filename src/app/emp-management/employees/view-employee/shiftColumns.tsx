"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";

export type ShiftTable = {
	date: Date;
	location: string;
	startTime: string;
	endTime: string;
	break: string;
	approved: string;
};
const columnHelper = createColumnHelper<ShiftTable>();
// date time epos cash pdq deliver difference kpi total status actions-> delete, view, edit (icons)
export const shiftColumns = [
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
	columnHelper.accessor("location", {
		id: "location",
		label: "LOCATION",
		header: "LOCATION",
		meta: {
			type: "string",
		},
		cell: (info) => info.getValue(),
		size: 250,
	}),
	columnHelper.accessor("startTime", {
		id: "startTime",
		label: "START TIME",
		header: "START TIME",
		meta: {
			type: "string",
		},
		cell: (info) => info.getValue(),
		size: 200,
	}),
	columnHelper.accessor("endTime", {
		id: "endTime",
		label: "END TIME",
		header: "END TIME",
		meta: {
			type: "string",
		},
		cell: (info) => info.getValue(),
		size: 200,
	}),
	columnHelper.accessor("break", {
		id: "break",
		label: "BREAK",
		header: "BREAK",
		meta: {
			type: "string",
		},
		cell: (info) => info.getValue(),
		size: 160,
	}),
	columnHelper.accessor("approved", {
		id: "approved",
		label: "APPROVED",
		header: "APPROVED",
		meta: {
			type: "select",
			options: [
				{
					value: "pending",
					label: "PENDING",
				},
			],
		},
		cell: (info) => info.getValue(),
		size: 160,
	})
];
