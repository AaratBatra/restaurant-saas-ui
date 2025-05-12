import { parse, setHours, setMinutes, setSeconds } from "date-fns";

export const updateTime = (date: Date, timeString: string) => {
	// Parse time string (e.g., "4:30 PM") into a date object
	const parsedTime = parse(timeString, "HH:mm", new Date());

	// Extract hours and minutes
	const hours = parsedTime.getHours();
	const minutes = parsedTime.getMinutes();

	// Update the original date with the new time
	const updatedDate = setSeconds(
		setMinutes(setHours(date, hours), minutes),
		0
	);

	return updatedDate;
};