import { faker } from "@faker-js/faker";
import { addDays, addHours, isAfter, isBefore, startOfWeek } from "date-fns";


export function generateDepartments(view: string, currentDate: Date) { // view: "daily" | "weekly" | "biweekly"
	const s = view !== "daily" ? startOfWeek(currentDate, { weekStartsOn: 1 }) : currentDate;
	const e = view === "daily" ? s : view === "weekly" ? addDays(s, 6) : addDays(s, 13);
	
	return Array.from({ length: 5 }, (_, index) => {
		return {
			id: faker.string.nanoid(6),
			name: faker.commerce.department(),
			employees: Array.from({ length: 5 }, (_, employeeIndex) => {
				const name = faker.person.fullName();
				const avatar = faker.image.avatar();
				const noOfShifts = faker.number.int({ min: 0, max: view === "daily" ? 2 : view === "weekly" ? 6 : 12 });
				const shifts: {
					id: string;
					title: string;
					start: Date,
					end: Date
				}[] = [];
				Array.from({length: noOfShifts}, (_, idx) => {
					let start = faker.date.between({ from: s, to: e });
					let end = addHours(start, faker.number.int({ min: 1, max: 4 }));
					if (idx > 0) {
						if (isBefore(start, shifts[idx - 1].end)) {
							start = addHours(shifts[idx - 1].end, 1);
							end = addHours(start, faker.number.int({ min: 1, max: 3 }));
						}
					}
					shifts.push({
						id: faker.string.nanoid(10),
						title: faker.lorem.sentence({min: 2, max: 4}),
						start: start,
						end: end
					})
				})
				return { employeeId: faker.string.nanoid(8), employeeName: name, avatar: avatar, shifts: shifts}
			}),
			
		}
	});
}
export type DeptData = ReturnType<typeof generateDepartments>;
export const departments = [
	{
		id: 1,
		name: "BOH",
		employees: ["Reena", "Salena", "Mike", "James", "Justin"],
	},
	{
		id: 2,
		name: "FOH",
		employees: ["Emma", "Liam", "Olivia", "Noah", "Ava"],
	},
	{
		id: 3,
		name: "Housekeeping",
		employees: ["Sophia", "Jackson", "Isabella", "Aiden", "Mia"],
	},
	{
		id: 4,
		name: "Maintenance",
		employees: ["Charlotte", "Lucas", "Amelia", "Mason", "Harper"],
	},
];

export const initialShifts = [
	{
		id: 1,
		employee: "Reena",
		department: "BOH",
		start: new Date(2023, 5, 1, 9, 0),
		end: new Date(2023, 5, 1, 17, 0),
		title: "Morning Shift",
	},
	{
		id: 2,
		employee: "Emma",
		department: "FOH",
		start: new Date(2023, 5, 2, 10, 0),
		end: new Date(2023, 5, 2, 18, 0),
		title: "Afternoon Shift",
	},
	// Add more initial shifts as needed
];
