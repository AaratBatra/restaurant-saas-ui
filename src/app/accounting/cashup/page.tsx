"use client";
import WMYDateRange from "@/components/ui/WMYDateRange";
import React, { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { endOfMonth, startOfMonth } from "date-fns";
import DisplayCard from "@/components/ui/display-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Plus, Trash, Upload } from "lucide-react";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CashUpTable, columns } from "./columns";
import { makeData } from "./makeData";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import FullDataTable from "@/components/FullDataTable";
import { useFullDataTable } from "@/hooks/use-full-data-table";
import StandardTable from "@/components/StandardTable";
import { useStandardTable } from "@/hooks/use-standard-table";
import { pendindDepositsColumns } from "./pendingDepositsColumns";
import { bankedColumns } from "./bankedColumns";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { BackButton } from "./view/BackButton";

const cardsData = [
	{
		title: "ALL CASHUP",
		body: "£ 200,156.58",
		count: 964,
		columns: columns,
	},
	{
		title: "DRAFTS",
		body: "£ 0",
		count: 8,
		columns: columns,
	},
	{
		title: "PENDING DEPOSITS",
		body: "£ 1453.98",
		count: 4,
		columns: pendindDepositsColumns,
	},
	{
		title: "BANKED",
		body: "£ 0",
		count: 0,
		columns: bankedColumns,
	},
];
const CashUp = () => {
	const [date, setDate] = useState<DateRange | undefined>({
		from: startOfMonth(new Date()),
		to: endOfMonth(new Date()),
	});
	// const fullDataTableProps = useFullDataTable<CashUpTable>(
	// 	makeData(100),
	// 	columns as ColumnDef<CashUpTable>[]
	// );
	// const [tableData, setTableData] = useState(makeData(100));
	// const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const [cards, setCards] = useState(cardsData);
	const [activeCard, setActiveCard] = useState(0);
	const initData = useMemo(() => makeData(100), []);
	const initData1 = useMemo(() => makeData(100), []);
	const props = useStandardTable<any>({
		initialData: initData,
		columns: cardsData[activeCard].columns as any,
	});
	const fullTableProps = useFullDataTable<any>(
		initData1,
		cardsData[activeCard].columns as any,
		{ openSheet: () => setOpen(true) }
	);
	const [open, setOpen] = useState(false);
	return (
		<div className="w-full p-4">
			<div className="w-full flex items-center justify-between mb-4">
				<h1>Cash Up Sheets</h1>
				<WMYDateRange date={date} setDate={setDate} />
			</div>
			<div className="flex flex-wrap gap-4 items-center mb-4">
				{cards.map((card, idx) => (
					<DisplayCard
						key={idx}
						{...card}
						isActive={activeCard === cards.indexOf(card)}
						onClick={() => setActiveCard(cards.indexOf(card))}
					/>
				))}
			</div>
			<div className="w-full flex flex-wrap gap-2 items-center justify-end my-2">
				<Button
					disabled={Object.keys(props.rowSelection).length === 0}
					variant={"outline"}
					onClick={() => props.setData(makeData(100))}
				>
					Generate Journals
				</Button>
				<Button
					disabled={Object.keys(props.rowSelection).length === 0}
					variant={"outline"}
				>
					<Trash className="w-4 h-4 mr-2" />
					Delete
				</Button>
				<Link href={"/accounting/cashup/new"}>
					<Button variant={"outline"}>
						<Plus className="w-4 h-4 mr-2" />
						Add New
					</Button>
				</Link>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={"outline"} size={"icon"}>
							<Download className="w-4 h-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent side="bottom">
						<DropdownMenuItem>CSV</DropdownMenuItem>
						<DropdownMenuItem>Excel</DropdownMenuItem>
						<DropdownMenuItem>Download Template</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={"outline"} size={"icon"}>
							<Upload className="w-4 h-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent side="bottom">
						<DropdownMenuItem>Import File</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			{/* <FullDataTable<CashUpTable> {...fullDataTableProps} /> */}
			{activeCard <= 1 ? (
				<StandardTable<any> {...props} />
			) : (
				<FullDataTable<any> {...fullTableProps} />
			)}
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent hideclose>
					<SheetHeader className="w-full flex justify-between">
						<div className="w-full flex items-center justify-between">
							<div className="flex items-center gap-1">
								<Button
									variant={"ghost"}
									size={"icon"}
									asChild
									onClick={() => setOpen(false)}
								>
									<ArrowLeft />
								</Button>
								View Banking
							</div>
							<Button>
								<Download />
								Download
							</Button>
						</div>
					</SheetHeader>
					<div className="w-full p-4 grid grid-cols-2 gap-x-4 text-lg">
						<p>
							<span className="font-semibold">
								Selected Deposit Date:{" "}
							</span>
						</p>
						<p>Jan 26, 2025, PM</p>
						<p>
							<span className="font-semibold">
								Banking Sheet Date:{" "}
							</span>
						</p>
						<p>Jan 26, 2025, PM</p>
						<p>
							<span className="font-semibold">
								Giro Slip Number:{" "}
							</span>
						</p>
						<p>501681</p>
						<p>
							<span className="font-semibold">
								Banking Total:{" "}
							</span>
						</p>
						<p>£ 65</p>
						<p>
							<span className="font-semibold">
								Banked Total:{" "}
							</span>
						</p>
						<p>£ 65</p>
						<p>
							<span className="font-semibold">Sealed By: </span>
						</p>
						<p>Honara Silva</p>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default CashUp;
