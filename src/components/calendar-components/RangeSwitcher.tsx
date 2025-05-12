import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
	subMonths,
	format,
	addMonths,
	subDays,
	subWeeks,
	addDays,
	addWeeks,
} from "date-fns";
import { DateRange } from "react-day-picker";

const RangeSwitcher = ({
	date,
	setDate,
	mode,
}: {
	date: DateRange | undefined;
	setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
	mode: string;
}) => {
	function handlePrevious() {
		if (!date || !date.from) return null;
		if (mode === "daily") {
			setDate({
				...date,
				from: subDays(date.from, 1),
			});
		} else if (mode === "weekly") {
			if (!date.to) {
				setDate({
					from: subWeeks(date.from, 1),
					to: date.from,
				});
			} else {
				setDate({
					from: subWeeks(date.from, 1),
					to: subWeeks(date.to, 1),
				});
			}
		} else {
			if (!date.to) {
				setDate({
					from: subWeeks(date.from, 2),
					to: date.from,
				});
			} else {
				setDate({
					from: subWeeks(date.from, 2),
					to: subWeeks(date.to, 2),
				});
			}
		}
	}
	function handleNext() {
		if (!date || !date.from) return null;
		if (mode === "daily") {
			setDate({
				...date,
				from: addDays(date.from, 1),
			});
		} else if (mode === "weekly") {
			if (!date.to) {
				setDate({
					from: addWeeks(date.from, 1),
					to: date.from,
				});
			} else {
				setDate({
					from: addWeeks(date.from, 1),
					to: addWeeks(date.to, 1),
				});
			}
		} else {
			if (!date.to) {
				setDate({
					from: addWeeks(date.from, 2),
					to: date.from,
				});
			} else {
				setDate({
					from: addWeeks(date.from, 2),
					to: addWeeks(date.to, 2),
				});
			}
		}
	}

	function render() {
		if (!date || !date.from || !date.to) return null;
		if (mode === "daily") {
			return format(date.from, "dd LLLL");
		} else {
			return `${format(date.from, "LLL dd")} - ${format(
				date.to,
				"LLL dd"
			)}`;
		}
	}

	return (
		<div className="h-9 min-w-max w-max flex items-center gap-2 border shadow-sm py-1 px-2 rounded-sm">
			<Button variant={"ghost"} size={"icon"} onClick={handlePrevious}>
				<ArrowLeft className="w-4 h-4" />
			</Button>
			<p className="text-sm">{render()}</p>
			<Button variant={"ghost"} size={"icon"} onClick={handleNext}>
				<ArrowRight className="w-4 h-4" />
			</Button>
		</div>
	);
};

export default RangeSwitcher;
