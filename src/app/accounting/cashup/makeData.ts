import { faker } from "@faker-js/faker";
// Assuming you have a types file where CashUpTable is defined

// Function to generate a single row of data
function generateRow(): any {
	return {
		date: faker.date.past({ years: 2 }).toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		}), // Example: "04 Dec 2024"
		time: faker.helpers.arrayElement(["AM", "PM"]), // Randomly selects AM or PM
		epos: faker.finance.amount({ min: 0, max: 1000, dec: 2, symbol: "£" }), // Random amount
		cash: faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }), // Random amount
		eposCash: faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }), // Random amount
		pdq: faker.finance.amount({ min: 0, max: 1000, dec: 2 }), // Random amount
		deliver: faker.finance.amount({
			min: 0,
			max: 1000,
			dec: 2,
			symbol: "£",
		}), // Random amount in £
		difference: faker.helpers.arrayElement([
			`+ £ ${faker.finance.amount({ min: 0, max: 1000, dec: 2 })}`,
			`- £ ${faker.finance.amount({ min: 0, max: 1000, dec: 2 })}`,
		]), // Random positive or negative difference
		kpi: faker.finance.amount({ min: 0, max: 1000, dec: 2, symbol: "£" }), // Random amount in £
		total: faker.finance.amount({
			min: 0,
			max: 10000,
			dec: 2,
			symbol: "£",
		}), // Random total amount in £
		status: faker.helpers.arrayElement(["DRAFT", "PUBLISHED", "BANKED"]), // Random status	
		bankedDate: faker.date.past({ years: 2 }).toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		}),
		cashUpSheets: 1,
		giroNumber: faker.number.int({min: 501000, max: 501999}),
		bankingTotal: faker.finance.amount({
			min: 0,
			max: 1000,
			symbol: "£",
		}),
		bankedTotal: faker.finance.amount({
			min: 0,
			max: 1000,
			symbol: "£",
		}),
		variance: "£ 0",
		sealedBy: "Honara Silva"
	};
}

// Function to generate an array of rows
export const makeData = (numRows: number = 10) => {
	return Array.from({ length: numRows }, () => generateRow());
};
