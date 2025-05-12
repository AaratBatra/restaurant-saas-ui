"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import {  Trash } from "lucide-react";

export type NewPayrollTable = {
	employeeName: string;
	employeeId: string;
	department: string;
	employeeType: string;
};
const columnHelper = createColumnHelper<NewPayrollTable>();
// date time epos cash pdq deliver difference kpi total status actions-> delete, view, edit (icons)
export const newPayrollColumns = [
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
	columnHelper.accessor("employeeName", {
		id: "employeeName",
		label: "Employee Name",
		header: "EMPLOYEE NAME",
		meta: { type: "string" },
		cell: (props) => (
			<div className="flex items-center gap-1">
				<Avatar className="h-6 w-6">
					<AvatarImage src="https://github.com/shadcn.png" />
				</Avatar>
				{props.getValue()}
			</div>
		),
		size: 280,
	}),
    columnHelper.accessor("employeeId", {
        id: "employeeId",
        label: "Employee Id",
        header: "EMPLOYEE ID",
        meta: {type: "string"},
        cell: (props) => props.getValue(),
        size: 260
    }),
    columnHelper.accessor("department", {
        id: "department",
        label: "Department",
        header: "DEPARTMENT",
        meta: {type: "string"},
        cell: (props) => props.getValue(),
        size: 300
    }),
    columnHelper.accessor("employeeType", {
        id: "employeeType",
        label: "Employee Type",
        header: "EMPLOYEE TYPE",
        meta: {type: "select", options: [{value: "MONTHLY EMPLOYEE", label: "MONTHLY EMPLOYEE"}, {value: "WEEKLY EMPLOYEE", label: "WEEKLY EMPLOYEE"}, {value: "HOURLY EMPLOYEE", label: "HOURLY EMPLOYEE"}]},
        cell: (props) => props.getValue(),
        size: 300
    }),
	columnHelper.display({
		id: "actions",
		header: "ACTIONS",
		cell: (props) => {
			return (
				<div className="flex items-center w-full justify-center">
					<Button
						size={"icon"}
						variant={"ghost"}
						asChild
						className="w-5 h-5 hover:text-red-500 hover:cursor-pointer"
					>
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
