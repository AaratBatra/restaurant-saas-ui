"use client";
import React from "react";
import MonthSwitcher from "@/components/calendar-components/MonthSwitcher";
import { BackButton } from "@/components/ui/back-button";
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

const ReconciliationCash = () => {
	const [date, setDate] = React.useState<Date>(new Date());
	return (
		<div className="w-full p-4">
			<div className="w-full flex items-center justify-between">
				<div className="flex items-center gap-2">
					<BackButton />
					<h1>Cash Reconciliation</h1>
				</div>
				<MonthSwitcher date={date} setDate={setDate} />
			</div>
			<div className="w-full flex border">
				<div className="w-[300px] grid grid-cols-2 items-center justify-center text-center h-fit mt-6">
					<h3>BANKING DATE</h3>
					<h3>TOTAL</h3>
					<p>07 Feb 2025</p>
					<p>£ 195.00</p>
				</div>
				<div className="p-6 border-l border-l-gray-300">
					<div className="mb-6 border-b border-b-gray-300">
						<h2 className="text-sm font-medium text-gray-600">
							BANKING DATE
						</h2>
						<p className="text-lg font-medium">07 Feb 2025</p>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>DEPOSIT DATE</TableHead>
								<TableHead>GIRO NUMBER</TableHead>
								<TableHead>POS TOTAL</TableHead>
								<TableHead>BANKED TOTAL</TableHead>
								<TableHead>DIFFERENCE</TableHead>
								<TableHead>POS AMOUNT</TableHead>
								<TableHead>STATEMENT AMOUNT</TableHead>
								<TableHead>MATCH</TableHead>
								<TableHead>PARTIAL MATCH</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>26 Jan 2025</TableCell>
								<TableCell>501681</TableCell>
								<TableCell>£ 65.00</TableCell>
								<TableCell>£ 65.00</TableCell>
								<TableCell>£ 0.00</TableCell>
								<TableCell>£ 65.00</TableCell>
								<TableCell>£ 65.00</TableCell>
								<TableCell>
									<Switch defaultChecked />
								</TableCell>
								<TableCell>
									<Switch />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>01 Feb 2025</TableCell>
								<TableCell>501682</TableCell>
								<TableCell>£ 40.00</TableCell>
								<TableCell>£ 40.00</TableCell>
								<TableCell>£ 0.00</TableCell>
								<TableCell>£ 40.00</TableCell>
								<TableCell>£ 40.00</TableCell>
								<TableCell>
									<Switch defaultChecked />
								</TableCell>
								<TableCell>
									<Switch />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>03 Feb 2025</TableCell>
								<TableCell>501683</TableCell>
								<TableCell>£ 60.00</TableCell>
								<TableCell>£ 60.00</TableCell>
								<TableCell>£ 0.00</TableCell>
								<TableCell>£ 60.00</TableCell>
								<TableCell>£ 60.00</TableCell>
								<TableCell>
									<Switch defaultChecked />
								</TableCell>
								<TableCell>
									<Switch />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>07 Feb 2025</TableCell>
								<TableCell>501684</TableCell>
								<TableCell>£ 30.00</TableCell>
								<TableCell>£ 30.00</TableCell>
								<TableCell>£ 0.00</TableCell>
								<TableCell>£ 30.00</TableCell>
								<TableCell>£ 30.00</TableCell>
								<TableCell>
									<Switch defaultChecked />
								</TableCell>
								<TableCell>
									<Switch />
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default ReconciliationCash;