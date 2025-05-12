import { faker } from "@faker-js/faker";


const cashEvents = () => {
    const cashEvents = [];
    for (let i=0; i<10; i++) {
        const startDate = faker.date.recent({ days: 20});
        cashEvents.push(
            {
                id: faker.string.uuid(),
                start: startDate,
                end: startDate,
                data: `Banking: ${faker.finance.amount({ min: 0, max: 10000, dec: 2, symbol: "£" })}`,
                isReconciled: faker.datatype.boolean(),
                allDay: true
            }
        )
    }
    return cashEvents;
}

const cardsEvents = () => {
    const cardEvents = [];
    for (let i=0; i<10; i++) {
        const startDate = faker.date.recent({ days: 20});
        cardEvents.push(
            {
                id: faker.string.uuid(),
                start: startDate,
                end: startDate,
                data: `AMEX, VISA, more`,
                isReconciled: faker.datatype.boolean(),
                allDay: true
            }
        )
    }
    return cardEvents;
}

const thirdPartyEvents = () => {
    const arr = [];
    for (let i=0; i<10; i++) {
        const startDate = faker.date.recent({ days: 20});
        arr.push({
            id: faker.string.uuid(),
            start: startDate,
            end: startDate,
            data: faker.helpers.arrayElement(["Deliveroo", "Yums Program", "Supper", "Uber"]),
            isReconciled: faker.datatype.boolean(),
            allDay: true
        })
    }
    return arr;
}

export { cashEvents, cardsEvents, thirdPartyEvents };