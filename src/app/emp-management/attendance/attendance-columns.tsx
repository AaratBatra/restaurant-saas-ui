"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type AttendanceTable = {
	employeeName: string;
	employeeId: string;
	department: string;
	status: string;
};
const columnHelper = createColumnHelper<AttendanceTable>();
// date time epos cash pdq deliver difference kpi total status actions-> delete, view, edit (icons)
export const attendanceColumns = [
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
		size: 320,
	}),
    columnHelper.accessor("employeeId", {
        id: "employeeId",
        label: "Employee Id",
        header: "EMPLOYEE ID",
        meta: {type: "string"},
        cell: (props) => props.getValue(),
        size: 300
    }),
    columnHelper.accessor("department", {
        id: "department",
        label: "Department",
        header: "DEPARTMENT",
        meta: {type: "string"},
        cell: (props) => props.getValue(),
        size: 320
    }),
    columnHelper.accessor("status", {
        id: "status",
        label: "Status",
        header: "Status",
        meta: {type: "select", options: [{value: "Off Duty", label: "OFF DUTY"}]},
        cell: (props) => <span className="text-red-700">{props.getValue()}</span>,
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
						//w-5 h-5
						className="hover:text-indigo-500 hover:cursor-pointer"
					>
						<Link href={"/emp-management/employees/view-calendar"}><Calendar className="w-4 h-4" /></Link>
						
					</Button>
				</div>
			);
		},
		minSize: 60,
		size: 60,
		maxSize: 60,
	}),
];
