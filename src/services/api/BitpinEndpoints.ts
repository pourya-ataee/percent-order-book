import { httpClient } from "../HttpClient";
import { Match } from "../../models/Match";
import { Market } from "../../models/Market";
import { Activity } from "../../models/Activity";
import { TActivity } from "../../types/TActivity";

export const bitpinEndpoints = {
	fetchMarkets: async () => {
		return httpClient.get<Market>({
			url: `v1/mkt/markets/`,
		});
	},
	fetchMarketActivitiesByType: async (market_id: string, type: TActivity) => {
		return httpClient.get<Activity>({
			url: `v2/mth/actives/${market_id}/`,
			params: { type },
		});
	},
	fetchMarketMatches: async (market_id: string) => {
		return httpClient.get<Match[]>({
			url: `v1/mth/matches/${market_id}/`,
		});
	},
};
