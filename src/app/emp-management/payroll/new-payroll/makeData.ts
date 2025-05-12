import { faker } from "@faker-js/faker"

export const generateData = () => {
    return Array.from({length: 10}, (_, index) => ({
        employeeName: faker.person.fullName(),
        employeeId: faker.string.numeric(6),
        department: faker.helpers.arrayElement(["BOH", "FOH", "Management"]),
        employeeType: faker.helpers.arrayElement(["HOURLY EMPLOYEE", "MONTHLY EMPLOYEE", "WEEKLY EMPLOYEE"]),
    }))
}