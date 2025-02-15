import { useEffect, useMemo, useRef, useState } from "react";
import { Match } from "../models/Match";
import { Order } from "../models/Activity";
import { useParams } from "react-router-dom";
import Tabs from "../components/common/Tabs";
import { TActivity } from "../types/TActivity";
import { activityTabs } from "../constants/tabs";
import { useMarketStore } from "../stores/market";
import Loading from "../components/common/Loading";
import { bitpinEndpoints } from "../services/api/BitpinEndpoints";
import ActivityList from "../components/pages/market/ActivityList";
import { formatNumberWithCommas, formatPriceChange } from "../utils";

function Market() {
	const { marketId } = useParams();

	const mount = useRef<boolean>(false);
	const { market, updateMarket } = useMarketStore((state) => state);

	const [loading, setLoading] = useState<boolean>(true);
	const [activeTab, setActiveTab] = useState<TActivity>("buy");
	const [data, setData] = useState<{ buy: Order[]; sell: Order[]; matches: Match[] } | null>(null);

	const fetchActivities = async () => {
		if (marketId) {
			try {
				if (!mount.current) setLoading(true);

				const [buyRes, sellRes, matchesRes] = await Promise.all([
					bitpinEndpoints.fetchMarketActivitiesByType(marketId, "buy"),
					bitpinEndpoints.fetchMarketActivitiesByType(marketId, "sell"),
					bitpinEndpoints.fetchMarketMatches(marketId),
				]);
				setData({ buy: buyRes.orders.slice(0, 10), sell: sellRes.orders.slice(0, 10), matches: matchesRes.slice(0, 10) });
			} finally {
				if (!mount.current) setLoading(false);
				mount.current = true;
			}
		}
	};

	useEffect(() => {
		fetchActivities();
		const interval = setInterval(fetchActivities, 3000);
		return () => clearInterval(interval);
	}, [marketId]);

	useEffect(() => {
		if (!market) {
			const storageMarket = sessionStorage.getItem("market");
			if (storageMarket) {
				updateMarket(JSON.parse(storageMarket));
			}
		}
	}, [market]);

	const currentData = useMemo<Order[] | Match[]>(() => {
		switch (activeTab) {
			case "buy":
				return data?.buy || [];
			case "sell":
				return data?.sell || [];
			case "match":
				return data?.matches || [];
			default:
				return data?.buy || [];
		}
	}, [activeTab, data, marketId]);

	return loading ? (
		<Loading />
	) : (
		!!data && (
			<div className="flex flex-col gap-11 w-full">
				{!!market && (
					<div className="rounded-lg flex px-4 py-3 items-center justify-between max-md:flex-col max-md:items-start gap-8 max-md:gap-4 bg-[#f2f2f2] dark:bg-[#222222]">
						<div className="flex items-center gap-2">
							<img src={market.currency1.image} alt={market.currency1.title} className="md:w-16 md:h-16 w-8 h-8" />
							<div className="flex flex-col gap-4">
								<h2 className="text-[var(--bp-font-default)] text-xl font-bold flex gap-1 items-center max-md:text-base">
									{market.currency1.title_fa}
									<span className="text-[var(--bp-font-gray-default)] text-lg font-normal max-md:text-xs">({market.currency1.code})</span>
								</h2>
								<div className="text-[var(--bp-font-gray-default)] text-xl font-normal max-md:hidden">{market.currency1.title}</div>
							</div>
						</div>
						<div className="flex flex-col gap-4 max-md:w-full">
							<div className="flex items-center gap-4 text-[var(--bp-font-default)] text-lg max-md:flex-row-reverse max-md:justify-between max-md:w-full">
								<span
									className={`[direction:ltr] font-medium text-xs text-center ${market.price_info.change ? (market.price_info.change >= 0 ? "text-[var(--bp-font-pos-default)]" : "text-[var(--bp-font-neg-default)]") : ""}`}
								>
									{formatPriceChange(market.price_info.change)}
								</span>
								<div className="flex items-center gap-4 max-md:gap-2">
									<span className="max-md:text-sm">{formatNumberWithCommas(market.price_info.price)}</span>
									<span className="max-md:text-[10px]">{market.currency2.title_fa}</span>
								</div>
							</div>
						</div>
					</div>
				)}
				<div className="flex items-end justify-between border-b border-b-[#666] max-md:overflow-x-auto [&::-webkit-scrollbar]:h-[1px]">
					<Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={activityTabs} />
				</div>
				<ActivityList data={currentData} activeTab={activeTab} setActiveTab={setActiveTab} />
			</div>
		)
	);
}

export default Market;
