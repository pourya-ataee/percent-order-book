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
