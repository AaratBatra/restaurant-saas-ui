"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import { Edit, Eye, Trash } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

export type CashUpTable = {
	date: string;
	time: string;
	epos: string;
	cash: number;
	pdq: string;
	deliver: string;
	difference: string;
	kpi: string;
	total: string;
	status: string;
};
const columnHelper = createColumnHelper<CashUpTable>();

// date time epos cash pdq deliver difference kpi total status actions-> delete, view, edit (icons)
export const columns = [
	columnHelper.display({
		id: "select",
		header: ({ table }) => {
			return (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(val: CheckedState) =>
						table?.toggleAllPageRowsSelected(!!val)
					}
					aria-label="Select all"
				/>
			);
		},
		cell: ({ row }) => {
			return (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
					onClick={(e) => e.stopPropagation()}
				/>
			);
		},
		size: 30,
		minSize: 20,
		maxSize: 32,
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
		cell: (info) => info.getValue(),
		size: 160,
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
			],
		},
		cell: (info) => info.getValue(),
		size: 120,
	}),
	columnHelper.accessor("epos", {
		id: "epos",
		label: "EPOS",
		header: "EPOS",
		meta: {
			type: "number",
		},
		cell: (info) => info.getValue(),
		size: 120,
	}),
	columnHelper.accessor("cash", {
		id: "cash",
		label: "CASH",
		header: "CASH",
		meta: {
			type: "number",
		},
		cell: (info) => `£ ${info.getValue()}`,
		size: 120,
	}),
	columnHelper.accessor("pdq", {
		id: "pdq",
		label: "PDQ",
		header: "PDQ",
		meta: {
			type: "number",
		},
		cell: (info) => info.getValue(),
		size: 120,
	}),
	columnHelper.accessor("deliver", {
		id: "deliver",
		label: "DELIVER",
		header: "DELIVER",
		meta: {
			type: "number",
		},
		cell: (info) => info.getValue(),
		size: 150,
	}),
	columnHelper.accessor("difference", {
		id: "difference",
		label: "DIFFERENCE",
		header: "DIFFERENCE",
		meta: {
			type: "string",
		},
		cell: (info) =>
			info.getValue().includes("+") ? (
				<span className="text-green-600">{info.getValue()}</span>
			) : (
				<span className="text-red-600">{info.getValue()}</span>
			),
		size: 160,
	}),
	columnHelper.accessor("kpi", {
		id: "kpi",
		label: "KPI",
		header: "KPI",
		meta: {
			type: "number",
		},
		cell: (info) => info.getValue(),
		size: 120,
	}),
	columnHelper.accessor("total", {
		id: "total",
		label: "TOTAL",
		header: "TOTAL",
		meta: {
			type: "number",
		},
		cell: (info) => info.getValue(),
		size: 120,
	}),
	columnHelper.accessor("status", {
		id: "status",
		label: "STATUS",
		header: "STATUS",
		meta: {
			type: "select",
			options: [
				{ value: "PUBLISHED", label: "PUBLISHED" },
				{ value: "BANKED", label: "BANKED" },
				{ value: "DRAFT", label: "DRAFT" },
			],
		},
		cell: (info) => info.getValue(),
		size: 120,
	}),
	columnHelper.display({
		id: "actions",
		header: "ACTIONS",
		cell: (props) => {
			if (props.row.getValue("status") !== "PUBLISHED") {
				return (
					<div className="flex items-center gap-2 w-10 ml-[20px]">
						<Button size={"icon"} variant={"ghost"} asChild>
							<Edit className="w-4 h-4" />
						</Button>
						<Button size={"icon"} variant={"ghost"} asChild>
							<Trash className="w-4 h-4" />
						</Button>
					</div>
				);
			} else {
				return (
					<div className="flex items-center gap-2 w-10 ml-[20px]">
						<Button size={"icon"} variant={"ghost"} asChild>
							<Trash className="w-4 h-4" />
						</Button>
						<Button size={"icon"} variant={"ghost"} asChild>
							<Link
								href={"/accounting/cashup/view"}
								className="no-underline hover:no-underline"
							>
								<Eye className="w-4 h-4" />
							</Link>
						</Button>
					</div>
				);
			}
		},
		minSize: 60,
		size: 60,
		maxSize: 60,
	}),
];
