import { faker } from "@faker-js/faker"

export const generateData = () => {
    return Array.from({length: 10}, (_, index) => ({
        reportName: faker.lorem.sentence({ min: 2, max: 3 }),
        date: faker.date.recent({ days: 7 }),
        username: faker.person.fullName()
    }))
}