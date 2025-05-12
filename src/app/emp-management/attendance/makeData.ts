import { faker } from "@faker-js/faker"
import { AttendanceTable } from "./attendance-columns"

export const generateData = (): AttendanceTable[] => {
    return Array.from({length: 10}, (_,idx) => ({
        employeeName: faker.person.fullName(),
        employeeId: faker.string.numeric(6),
        department: "BOH",
        status: "Off Duty"
    }))
}