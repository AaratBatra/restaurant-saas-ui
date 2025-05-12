"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import { Calendar, Edit, Eye, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type EmployeeTable = {
	employeeName: {
		avatar: string;
		name: string;
	};
	employeeId: string;
	department: "Management" | "BOH" | "FOH";
	employeeType: "Hourly Employee" | "Monthly Employee";
	reportTo: {
		avatar: string;
		name: string;
	};
	location: string;
};
const columnHelper = createColumnHelper<EmployeeTable>();
// date time epos cash pdq deliver difference kpi total status actions-> delete, view, edit (icons)
export const employeeColumns = [
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
		label: "EMPLOYEE NAME",
		header: "EMPLOYEE NAME",
		meta: {
			type: "string",
		},
		cell: (info) => (
			<div className="flex items-center gap-1">
				<Avatar className="h-6 w-6">
					<AvatarImage src={info.getValue().avatar} alt="avatar" />
				</Avatar>
				<span>{info.getValue().name}</span>
			</div>
		),
		size: 240,
	}),
	columnHelper.accessor("employeeId", {
		id: "employeeId",
		label: "EMPLOYEE ID",
		header: "EMPLOYEE ID",
		meta: {
			type: "string",
		},
		cell: (info) => info.getValue(),
		size: 160,
	}),
	columnHelper.accessor("department", {
		id: "department",
		label: "DEPARTMENT",
		header: "DEPARTMENT",
		meta: {
			type: "select",
			options: [
				{ label: "Management", value: "Management" },
				{ label: "BOH", value: "BOH" },
				{ label: "FOH", value: "FOH" },
			],
		},
		cell: (info) => info.getValue(),
		size: 180,
	}),
	columnHelper.accessor("employeeType", {
		id: "employeeType",
		label: "EMPLOYEE TYPE",
		header: "EMPLOYEE TYPE",
		meta: {
			type: "select",
			options: [
				{ label: "Hourly Employee", value: "Hourly Employee" },
				{ label: "Monthly Employee", value: "Monthly Employee" },
			],
		},
		cell: (info) => info.getValue(),
		size: 180,
	}),
	columnHelper.accessor("reportTo", {
		id: "reportTo",
		label: "REPORT TO",
		header: "REPORT TO",
		meta: {
			type: "string",
		},
		cell: (info) => (
			<div className="flex items-center gap-1">
				<Avatar className="h-6 w-6">
					<AvatarImage src={info.getValue().avatar} alt="avatar" />
				</Avatar>
				<span>{info.getValue().name}</span>
			</div>
		),
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
	columnHelper.display({
		id: "actions",
		header: "ACTIONS",
		cell: (props) => {
			return (
				<div className="flex w-full items-center gap-2 justify-center">
					<Button
						size={"icon"}
						variant={"ghost"}
						className="hover:text-indigo-500"
						asChild
					>
						<Link
							href={`/emp-management/employees/view-calendar`}
							className="no-underline hover:no-underline"
						>
							<Calendar className="w-4 h-4" />
						</Link>
					</Button>
					<Button size={"icon"} variant={"ghost"} asChild className="hover:text-green-500">
						<Link
							href={"/emp-management/employees/view-employee"}
							className="no-underline hover:no-underline"
						>
							<Eye className="w-4 h-4" />
						</Link>
					</Button>
					<Button size={"icon"} variant={"ghost"} asChild className="hover:text-yellow-500">
                        <Link href={"/emp-management/employees/edit-employee"} className="no-underline hover:no-underline">
						    <Edit className="w-4 h-4" />
                        </Link>
					</Button>
				</div>
			);
		},
		minSize: 60,
		size: 60,
		maxSize: 60,
	}),
];
