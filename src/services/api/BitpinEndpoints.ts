import { Market } from "../../models/Market";
import { httpClient } from "../HttpClient";

export const bitpinEndpoints = {
	fetchMarkets: async () => {
		return httpClient.get<Market>({
			url: `v1/mkt/markets/`,
		});
	},
};
