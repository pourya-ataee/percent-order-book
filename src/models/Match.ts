import { TActivity } from "../types/TActivity";

export interface Match {
	time: number;
	price: string;
	value: string;
	match_amount: string;
	type: TActivity;
	match_id: string;
}
