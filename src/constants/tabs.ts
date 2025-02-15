import { TActivity } from "../types/TActivity";
import { TCurrency } from "../types/TCurrency";

export const marketTabs: {
	label: string;
	value: TCurrency;
}[] = [
	{ label: "پایه تومان", value: "IRT" },
	{ label: "پایه تتر", value: "USDT" },
];

export const activityTabs: {
	label: string;
	value: TActivity;
}[] = [
	{ label: "لیست سفارشات خرید", value: "buy" },
	{ label: "لیست سفارشات فروش", value: "sell" },
	{ label: "معاملات اخیر", value: "match" },
];
