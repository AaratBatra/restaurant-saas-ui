"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { Calendar, Edit, Eye, Trash } from "lucide-react";
import Link from "next/link";

// period-start period-end total shift total leaves status actions
export type ShiftCalendarTable = {
	id: string;
	periodStart: Date;
	periodEnd: Date;
	totalShift: number;
	totalLeaves: number;
	status: string;
};
const columnHelper = createColumnHelper<ShiftCalendarTable>();
// date time epos cash pdq deliver difference kpi total status actions-> delete, view, edit (icons)
export const columns = [
	columnHelper.display({
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table?.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) =>
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
	columnHelper.accessor("periodStart", {
		id: "periodStart",
		label: "PERIOD START",
		header: "PERIOD START",
		meta: {
			type: "date",
		},
		cell: (info) => format(info.getValue(), "dd MMM yyyy"), // 01 Feb 2025
		size: 320,
	}),
	columnHelper.accessor("periodEnd", {
		id: "periodEnd",
		label: "PERIOD END",
		header: "PERIOD END",
		meta: {
			type: "date",
		},
		cell: (info) => format(info.getValue(), "dd MMM yyyy"),
		size: 320,
	}),
	columnHelper.accessor("totalShift", {
		id: "totalShift",
		label: "TOTAL SHIFTS",
		header: "TOTAL SHIFTS",
		meta: {
			type: "number",
		},
		cell: (info) => info.getValue(),
		size: 200,
	}),
	columnHelper.accessor("totalLeaves", {
		id: "totalLeaves",
		label: "TOTAL LEAVES",
		header: "TOTAL LEAVES",
		meta: {
			type: "number",
		},
		cell: (info) => `${info.getValue()}`,
		size: 200,
	}),
	columnHelper.accessor("status", {
		id: "status",
		label: "STATUS",
		header: "STATUS",
		meta: {
			type: "select",
			options: [{ value: "DRAFT", label: "DRAFT" }],
		},
		cell: (info) => info.getValue(),
		size: 200,
	}),
	columnHelper.display({
		id: "actions",
		header: "ACTIONS",
		cell: (props) => (
            <Link href={`/emp-management/shift-calendar/shift-schedular?id=${props.row.original.id}`} className="w-full flex items-center justify-center">
                <Button variant={"ghost"} size={"icon"} className="w-4 h-4" asChild>
                    <Calendar className="h-4 w-4 hover:text-indigo-600" />
                </Button>
            </Link>
        ),
		minSize: 60,
		size: 60,
		maxSize: 60,
	}),
];
