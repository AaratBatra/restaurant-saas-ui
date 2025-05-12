"use client";
import MonthCalendar from "@/components/BigCalendar";
import React, { act, useMemo, useState } from "react";
import { parse, format, formatDate, subMonths, getDay } from "date-fns";
import MonthSwitcher from "@/components/calendar-components/MonthSwitcher";
import DisplayCard from "@/components/ui/display-card";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	Components,
	DateCellWrapperProps,
	Event,
	EventProps,
} from "react-big-calendar";
import { useRouter } from "next/navigation";
import {
	cardsEvents,
	cashEvents,
	thirdPartyEvents,
} from "./reconciliationData";
import { cn } from "@/lib/utils";

export type MyEvent = {
	id: string;
	start: Date;
	end: Date;
	data: string;
	isReconciled: boolean;
	allDay?: boolean;
};

const cardsData = [
	{
		title: "CASH",
		body: "£ 200",
		count: 10,
	},
	{
		title: "CARD",
		body: "£ 3000",
		count: 10,
	},
	{
		title: "THIRD PARTY",
		body: "£ 500",
		count: 10,
	},
];
const Reconciliation = () => {
	const [cards, setCards] = useState(cardsData);
	const [activeCard, setActiveCard] = useState(0);
	const [date, setDate] = useState<Date>(new Date());
	const router = useRouter();

	const components: Components<MyEvent, object> = {
		event: (props: EventProps<MyEvent>) => {
			return (
				<div
					className={"w-full !h-[70px] flex items-center justify-center cursor-pointer text-wrap text-sm max-md:text-xs text-black"}
					onClick={() =>
						router.push(
							`/accounting/reconciliation/${activeCard == 0 ? "cash" : activeCard == 1 ? "card" : "third-party"}/?id=${props.event.id}`
						)
					}
				>
					{props.event.data}
				</div>
			);
		},
	};
	const events = useMemo(() => {
		if (activeCard === 0) return cashEvents();
		if (activeCard === 1) return cardsEvents();
		else return thirdPartyEvents();
	}, [activeCard]);
	return (
		<div className="w-full flex flex-col gap-2 p-4 max-md:p-0">
			<div className="w-full flex items-center justify-between">
				<h1>Reconciliation</h1>
				<MonthSwitcher date={date} setDate={setDate} />
			</div>
			<ScrollArea className="w-fill-available max-md:w-screen h-32">
				<div className="flex w-full items-center justify-between">
					<div className="flex items-center gap-2">
						{cards.map((card, idx) => (
							<DisplayCard
								key={idx}
								{...card}
								isActive={activeCard === idx}
								onClick={() => setActiveCard(idx)}
							/>
						))}
					</div>
					<Card className="w-1/3 min-w-[300px] max-h-full h-32">
						<CardHeader className="px-4 pt-1 pb-4">
							<CardTitle className="font-medium text-lg">
								TOTAL AMOUNT RECONCILED
							</CardTitle>
						</CardHeader>
						<CardContent className="p-4 pt-0">
							<div className="w-full flex items-center justify-start">
								<div className="flex flex-col items-start border-r pr-4 gap-2 min-w-[100px] w-max">
									<p className="text-lg font-bold">£ 3000</p>
									<p className="text-sm text-gray-500">Total amount</p>
								</div>
								<div className="flex items-center justify-evenly w-fill-available">
								<div className="flex flex-col items-start gap-2">
									<p className="text-lg font-bold">£ 200</p>
									<p className="text-sm text-gray-500">Cash</p>
								</div>
								<div className="flex flex-col items-start gap-2">
									<p className="text-lg font-bold">£ 3000</p>
									<p className="text-sm text-gray-500">Card</p>
								</div>
								<div className="flex flex-col items-start gap-2">
									<p className="text-lg font-bold">£ 500</p>
									<p className="text-sm text-gray-500">Third party</p>
								</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
			<MonthCalendar<MyEvent>
				events={events as MyEvent[]}
				date={date}
				onNavigate={setDate}
				components={components}
			/>
		</div>
	);
};

export default Reconciliation;
