import { faker } from "@faker-js/faker";
import { ApprovalTable } from "./approval-columns";
import { addHours, addMinutes, format, subHours } from "date-fns";

export const generateData = (): ApprovalTable[] => {
	return Array.from({ length: 100 }, (_, idx) => {
        const d = faker.date.recent({ days: 20 });
        const startTime = format(d, "HH:mm");
        const endTime = format(addHours(d, 9), "HH:mm");
        const punchIn = format(addMinutes(d, faker.number.int({ min: 0, max: 30 })), "HH:mm");
		return {
			employeeName: faker.person.fullName(),
			employeeId: faker.string.numeric(6),
			requestType: "Punch In/Out",
			department: "BOH",
			shiftDate: d,
			startTime: startTime,
			endTime: endTime,
			punchIn: punchIn,
			punchOut: endTime,
			totalHours: "9 H 15 M",
			status: faker.helpers.arrayElement([
				"APPROVED",
				"REJECTED",
				"PENDING",
			]),
		};
	});
};
