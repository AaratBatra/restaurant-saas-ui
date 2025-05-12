"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";

export type DocumentTable = {
	documentName: string;
	description: string;
	documentType: string;
	attachment: string;
};
const columnHelper = createColumnHelper<DocumentTable>();
// date time epos cash pdq deliver difference kpi total status actions-> delete, view, edit (icons)
export const documentColumns = [
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
	columnHelper.accessor("documentName", {
		id: "documentName",
		label: "DOCUMENT NAME",
		header: "DOCUMENT NAME",
		meta: {
			type: "string",
		},
		cell: (info) => info.getValue(),
		size: 280,
	}),
	columnHelper.accessor("description", {
		id: "description",
		label: "DESCRIPTION",
		header: "DESCRIPTION",
		meta: {
			type: "string",
		},
		cell: (info) => info.getValue(),
		size: 340,
	}),
	columnHelper.accessor("documentType", {
		id: "documentType",
		label: "DOCUMENT TYPE",
		header: "DOCUMENT TYPE",
		meta: {
			type: "select",
			options: [
				{ label: "PERSONAL", value: "personal" },
				{ label: "CONTRACT", value: "contract" },
			],
		},
		cell: (info) => info.getValue(),
		size: 280,
	}),
	columnHelper.accessor("attachment", {
		id: "attachment",
		label: "ATTACHMENT",
		header: "ATTACHMENT",
		meta: {
			type: "string",
		},
		cell: (info) => info.getValue(),
		size: 240,
	}),
	columnHelper.display({
		id: "actions",
		header: "ACTIONS",
		cell: (props) => {
			return (
				<div className="flex items-center w-full justify-center">
					<Button size={"icon"} variant={"ghost"} asChild>
						<Trash className="w-4 h-4" />
					</Button>
					<Button size={"icon"} variant={"ghost"} asChild>
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
