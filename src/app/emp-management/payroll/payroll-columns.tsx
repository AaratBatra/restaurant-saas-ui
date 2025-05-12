"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { Download } from "lucide-react";

export type PayrollTable = {
	reportName: string;
	startDate: Date;
	endDate: Date;
};
const columnHelper = createColumnHelper<PayrollTable>();
// date time epos cash pdq deliver difference kpi total status actions-> delete, view, edit (icons)
export const payrollColumns = [
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
		label: "Report Name",
		header: "REPORT NAME",
		meta: { type: "string" },
		cell: (props) => props.getValue(),
		size: 400,
	}),
    columnHelper.accessor("startDate", {
        id: "startDate",
        label: "Start Date",
        header: "START DATE",
        meta: {type: "date"},
        cell: (props) => format(props.getValue(), "dd MMM yyyy"),
        size: 400
    }),
    columnHelper.accessor("endDate", {
        id: "endDate",
        label: "End Date",
        header: "END DATE",
        meta: {type: "date"},
        cell: (props) => format(props.getValue(), "dd MMM yyyy"),
        size: 400
    }),
	columnHelper.display({
		id: "actions",
		header: "DOWNLOAD",
		cell: (props) => {
			return (
				<div className="flex items-center w-full justify-center">
					<Button
						size={"icon"}
						variant={"ghost"}
						asChild
						className="w-5 h-5 hover:text-green-500 hover:cursor-pointer"
					>
						<Download className="w-4 h-4" />
					</Button>
				</div>
			);
		},
		minSize: 60,
		size: 60,
		maxSize: 60,
	}),
];
