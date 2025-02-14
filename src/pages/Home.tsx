import { useCallback, useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import { Market, MarketResult } from "../models/Market";
import MarketList from "../components/pages/home/MarketList";
import SwipeableTabs from "../components/common/SwipeableTabs";
import { bitpinEndpoints } from "../services/api/BitpinEndpoints";

function Home() {
	const [data, setData] = useState<Market | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchData = async () => {
		try {
			setLoading(true);
			const res = await bitpinEndpoints.fetchMarkets();
			setData(res);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const filterMarketData = useCallback<(currency2: "IRT" | "USDT") => MarketResult[]>(
		(currency2) => {
			return data?.results.filter((e) => e.currency2.code === currency2) || [];
		},
		[data],
	);

	return loading ? (
		<Loading />
	) : (
		<div className="flex flex-col gap-11 w-full">
			<h2 className="text-2xl font-medium">لیست بازارها</h2>
			<SwipeableTabs
				tabs={[
					{ label: "پایه تومان", content: <MarketList data={filterMarketData("IRT")} /> },
					{ label: "پایه تتر", content: <MarketList data={filterMarketData("USDT")} /> },
				]}
			/>
		</div>
	);
}

export default Home;
