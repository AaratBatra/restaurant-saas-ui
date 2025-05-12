import {faker} from "@faker-js/faker";
import type { ShiftCalendarTable } from "./shiftCalendarColumns";
import { DateRange } from "react-day-picker";
import { isSameMonth, isSameWeek } from "date-fns";

export const generateShiftCalendarData = (date: {from: Date, to: Date}): ShiftCalendarTable[] => {
    const arr: ShiftCalendarTable[] = [];
    let len = 0;
    if (isSameWeek(date.to, date.from)) {
        len = 10
    } else if (isSameMonth(date.to, date.from)) {
        len = 20
    } else {
        len = 30
    }
    
    for (let i=0; i<len; i++) {
        arr.push({
            id: faker.string.uuid(),
            periodStart: faker.date.between({ from: date?.from, to: date?.to }),
            periodEnd: faker.date.between({ from: date?.from, to: date?.to }),
            totalShift: faker.helpers.arrayElement([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
            totalLeaves: faker.helpers.arrayElement([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
            status: "DRAFT"
        })
    }
    return arr;
}