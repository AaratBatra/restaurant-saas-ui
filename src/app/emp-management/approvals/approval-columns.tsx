"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { Check, Edit, Eye, Trash, X } from "lucide-react";
import Link from "next/link";

export type ApprovalTable = {
	employeeName: string;
	employeeId: string;
	requestType: string;
	department: string;
	shiftDate: Date;
	startTime: string;
	endTime: string;
	punchIn: string;
	punchOut: string;
	totalHours: string;
	status: string;
};
const columnHelper = createColumnHelper<ApprovalTable>();
// date time epos cash pdq deliver difference kpi total status actions-> delete, view, edit (icons)
export const approvalColumns = [
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
		size: 220,
	}),
    columnHelper.accessor("employeeId", {
        id: "employeeId",
        label: "Employee Id",
        header: "EMPLOYEE ID",
        meta: {type: "string"},
        cell: (props) => props.getValue(),
        size: 160
    }),
    columnHelper.accessor("requestType", {
        id: "requestType",
        label: "Request Type",
        header: "REQUEST TYPE",
        meta: {type: "string"},
        cell: (props) => props.getValue(),
        size: 160
    }),
    columnHelper.accessor("department", {
        id: "department",
        label: "Department",
        header: "DEPARTMENT",
        meta: {type: "string"},
        cell: (props) => props.getValue(),
        size: 160
    }),
    columnHelper.accessor("shiftDate", {
        id: "shiftDate",
        label: "Shift Date",
        header: "SHIFT DATE",
        meta: {type: "date"},
        cell: (props) => format(props.getValue(), "dd MMM yyyy"),
        size: 160
    }),
    columnHelper.accessor("startTime", {
        id: "startTime",
        label: "Start Time",
        header: "START TIME",
        meta: {type: "string"},
        cell: (props) => props.getValue(),
        size: 140
    }),
    columnHelper.accessor("endTime", {
        id: "endTime",
        label: "End Time",
        header: "END TIME",
        meta: {type: "string"},
        cell: (props) => props.getValue(),
        size: 140
    }),
    columnHelper.accessor("punchIn", {
        id: "punchIn",
        label: "Punch In",
        header: "PUNCH IN",
        meta: {type: "string"},
        cell: (props) => props.getValue(),
        size: 140
    }),
    columnHelper.accessor("punchOut", {
        id: "punchOut",
        label: "Punch Out",
        header: "PUNCH OUT",
        meta: {type: "string"},
        cell: (props) => props.getValue(),
        size: 140
    }),
    columnHelper.accessor("totalHours", {
        id: "totalHours",
        label: "Total Hours",
        header: "TOTAL HOURS",
        meta: {type: "string"},
        cell: (props) => props.getValue(),
        size: 140
    }),
    columnHelper.accessor("status", {
        id: "status",
        label: "Status",
        header: "Status",
        meta: {type: "select", options: [{value: "PENDING", label: "PENDING"}, {value: "APPROVED", label: "APPROVED"}, {value: "REJECTED", label: "REJECTED"}]},
        cell: (props) => props.getValue(),
        size: 140
    }),
	columnHelper.display({
		id: "actions",
		header: "ACTIONS",
		cell: (props) => {
			return (
				<div className="flex items-center gap-1 w-full justify-center">
					<Button
						size={"icon"}
						variant={"ghost"}
						asChild
						className="w-8 h-8 hover:text-green-500 hover:cursor-pointer"
                        onClick={() => props.table.options.meta?.callbacks?.openUpdateSheet?.()}
					>
						<Eye className="w-6 h-6" />
					</Button>
					<Button
						size={"icon"}
						variant={"ghost"}
						asChild
						className="w-8 h-8 text-red-500 hover:cursor-pointer"
					>
						<X className="w-6 h-6" />
					</Button>
					<Button
						size={"icon"}
						variant={"ghost"}
						asChild
						className="w-8 h-8 text-green-500 hover:cursor-pointer"
					>
						<Check className="w-6 h-6" />
					</Button>
					<Button
						size={"icon"}
						variant={"ghost"}
						asChild
						className="w-8 h-8 hover:text-yellow-500 hover:cursor-pointer"
                        onClick={() => props.table.options.meta?.callbacks?.openEditSheet?.()}
					>
						<Edit className="w-6 h-6" />
					</Button>
				</div>
			);
		},
		minSize: 100,
		size: 100,
		maxSize: 100,
	}),
];
