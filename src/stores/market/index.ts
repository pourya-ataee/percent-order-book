import { create } from "zustand";
import { MarketResult } from "../../models/Market";

export const useMarketStore = create<{ market: null | MarketResult; updateMarket: (market: MarketResult) => void }>((set) => ({
	market: null,
	updateMarket: (market: MarketResult) => set({ market }),
}));
