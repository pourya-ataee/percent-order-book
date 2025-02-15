import Decimal from "decimal.js";

export function formatNumberWithCommas(number: string) {
	const decimalNumber = new Decimal(number);
	const [integerPart, decimalPart] = decimalNumber.toFixed().split(".");
	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return decimalPart && decimalPart !== "0" ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

export function formatPriceChange(change?: number | null): string {
	if (change == null) return "-";
	return change > 0 ? `+${change}%` : `${change}%`;
}

export function convertTimeFormat(time: number) {
	const timestamp = time * 1000;
	const date = new Date(timestamp);

	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");

	const timeString = `${hours}:${minutes}`;
	return timeString;
}
