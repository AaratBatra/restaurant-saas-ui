import { faker } from "@faker-js/faker";
import { addHours } from "date-fns";
import { DayEvent } from "./page";

export const generateVacations= (): DayEvent[]  => {
    return Array.from({ length: 10 }, (_, index) => {
        const start = addHours(faker.date.recent({ days: 7}), faker.number.int({ min: 0, max: 5}));
        return {
        id: faker.string.nanoid(8),
        start: start,
        end: addHours(start, faker.number.int({ min: 1, max: 3 })),
        title: faker.lorem.sentence({ min: 2, max: 3 }),
    }});
}