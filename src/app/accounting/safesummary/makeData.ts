import { faker } from "@faker-js/faker"
import { SafeSummaryTable } from "./safe-summary-columns"

export const generateData = (): SafeSummaryTable[] => {
    return Array.from({length: 10}, (_, index) => ({
        date: faker.date.recent({ days: 7 }),
        witness: faker.person.fullName(),
        safeFloat: faker.number.int({ min: 0, max: 1000 }),
        tillFloat: faker.number.int({ min: 0, max: 1000 }),
        salesCash: faker.number.int({ min: 0, max: 1000 }),
    }))
}