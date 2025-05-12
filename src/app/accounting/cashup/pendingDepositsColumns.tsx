"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { createColumnHelper } from "@tanstack/react-table";

export type PendingDeposits = {
	date: string;
	time: string;
	eposCash: number;
	difference: string;
};
const columnHelper = createColumnHelper<PendingDeposits>();
export const pendindDepositsColumns = [
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
			type: "date"
		},
		cell: (info) => info.getValue(),
		size: 380
	}),
	columnHelper.accessor("time", {
		id: "time",
		label: "TIME",
		header: "TIME",
		meta: {
			type: "select",
			options: [
				{ label: "AM", value: "AM" },
				{ label: "PM", value: "PM" },
			]
		},
		cell: (info) => info.getValue(),
		size: 340
	}),
	columnHelper.accessor("eposCash", {
		id: "eposCash",
		label: "Epos Cash",
		header: "EPOS CASH",
		meta: {
			type: "number"
		},
		cell: (info) => `£ ${info.getValue()}`,
		size: 360
	}),
	columnHelper.accessor("difference", {
		id: "difference",
		label: "DIFFERENCE",
		header: "DIFFERENCE",
		meta: {
			type: "string"
		},
		cell: (info) =>
			info.getValue().includes("+") ? (
				<span className="text-green-600">{info.getValue()}</span>
			) : (
				<span className="text-red-600">{info.getValue()}</span>
			),
		size: 250
	})
];
