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

const ReconciliationThirdParty = () => {
	const [date, setDate] = React.useState<Date>(new Date());
	return (
		<div className="w-full p-4">
			<div className="w-full flex items-center justify-between">
				<div className="flex items-center gap-2">
					<BackButton />
					<h1>Third Pary Reconciliation</h1>
				</div>
				<MonthSwitcher date={date} setDate={setDate} />
			</div>
			<div className="w-full flex border">
				<div className="w-[300px] grid grid-cols-2 items-center justify-center text-center h-fit mt-6">
					<h3>CASHUP DATE</h3>
					<h3>TOTAL</h3>
					<p>07 Feb 2025</p>
					<p>£ 195.00</p>
				</div>
				<div className="p-6 w-[900px]">
					<div className="border w-full flex items-center justify-between shadow-lg rounded-md bg-white p-2">
						<div className="p-3 px-5 shadow-md hover:shadow-lg active:shadow-lg">
							UBER <br />
							<span className="font-bold">£ 581.43</span>
						</div>
						<div className="p-3 px-5 shadow-md hover:shadow-lg active:shadow-lg">
							SUPPER <br />
							<span className="font-bold">£ 581.43</span>
						</div>
						<div className="p-3 px-5 shadow-md hover:shadow-lg active:shadow-lg">
							DELIVEROO <br />
							<span className="font-bold">£ 0.00</span>
						</div>
						<div className="p-3 px-5 shadow-md hover:shadow-lg active:shadow-lg">
							YUMS PROGRAM <br />
							<span className="font-bold">£ 581.43</span>
						</div>
					</div>
					<div className="bg-white w-full border shadow-lg rounded-md p-2">
						<div>
							PERIOD COVERED <br />
							<span className="font-bold">£ 581.43</span>
						</div>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>CARD TYPE</TableHead>
									<TableHead>POS AMOUNT</TableHead>
									<TableHead>STATEMENT AMOUNT</TableHead>
									<TableHead>DIFFERENCE</TableHead>
									<TableHead>MATCH</TableHead>
									<TableHead>PARTIAL MATCH</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>AMEX</TableCell>
									<TableCell>£ 180.00</TableCell>
									<TableCell>£ 0.00</TableCell>
									<TableCell>£ 0.00</TableCell>
									<TableCell>
										<Switch defaultChecked />
									</TableCell>
									<TableCell>
										<Switch />
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>VISA</TableCell>
									<TableCell>£ 100.00</TableCell>
									<TableCell>£ 0.00</TableCell>
									<TableCell>£ 0.00</TableCell>
									<TableCell>
										<Switch defaultChecked />
									</TableCell>
									<TableCell>
										<Switch />
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>MASTERCARD</TableCell>
									<TableCell>£ 294.00</TableCell>
									<TableCell>£ 0.00</TableCell>
									<TableCell>£ 0.00</TableCell>
									<TableCell>
										<Switch defaultChecked />
									</TableCell>
									<TableCell>
										<Switch />
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Amount</TableCell>
									<TableCell>£ 0.00</TableCell>
									<TableCell>£ 0.00</TableCell>
									<TableCell>£ 0.00</TableCell>
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
		</div>
	);
};

export default ReconciliationThirdParty;
