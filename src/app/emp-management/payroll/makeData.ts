import { faker } from "@faker-js/faker"

export const generateData = () => {
    return Array.from({length: 10}, (_) => ({
        reportName: faker.lorem.sentence({ min: 2, max: 3 }),
        startDate: faker.date.recent({ days: 7 }),
        endDate: faker.date.recent({ days: 7 }),
    }))
}