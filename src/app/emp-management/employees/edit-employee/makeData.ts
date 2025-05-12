import { faker } from "@faker-js/faker";
import { ShiftTable } from "./shiftColumns";
import { addHours, format } from "date-fns";

export const generateData = (): ShiftTable[] => {
	return Array.from({ length: 10 }, (_, idx) => {
		const d = faker.date.recent({ days: 7 });
		const startTime = format(d, "HH:mm");
		const endTime = format(
			addHours(d, faker.number.int({ min: 1, max: 4 })),
			"HH:mm"
		);
		return {
			date: d,
			location: "Red Farm Covent Garden",
			startTime: startTime,
			endTime: endTime,
			break: faker.helpers.arrayElement(["0", "1"]),
			approved: "pending",
		};
	});
};
