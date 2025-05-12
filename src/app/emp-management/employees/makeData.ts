import { faker } from "@faker-js/faker"

export const generateData = () => {
    return Array.from({length: 100}, (_, index) => ({
        employeeName: {
            avatar: faker.image.avatar(),
            name: faker.person.fullName()
        },
        employeeId: faker.string.numeric(6),
        department: faker.helpers.arrayElement(["BOH", "FOH", "Management"]),
        employeeType: faker.helpers.arrayElement(["Hourly Employee", "Monthly Employee"]),
        reportTo: {
            avatar: faker.image.avatar(),
            name: faker.person.fullName()
        },
        location: "Red Farm Covent Garden"
    }))
}