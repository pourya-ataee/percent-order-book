import { useCallback, useEffect, useState } from "react";
import { marketTabs } from "../constants/tabs";
import Tabs from "../components/common/Tabs";
import { TCurrency } from "../types/TCurrency";
import Loading from "../components/common/Loading";
import MarketList from "../components/pages/home/MarketList";
import { bitpinEndpoints } from "../services/api/BitpinEndpoints";
import { Market, MarketResult } from "../models/Market";

function Home() {
	const [page, setPage] = useState<number>(1);
	const [term, setTerm] = useState<string>("");
	const [data, setData] = useState<Market | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [activeTab, setActiveTab] = useState<TCurrency>("IRT");

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

	const filterMarketData = useCallback<(currency: TCurrency) => MarketResult[]>(
		(currency) => {
			if (!data?.results) return [];

			const lowerTerm = term.toLowerCase();

			return data.results
				.filter((e) => e.currency2.code === currency)
				.filter((e) => {
					const { currency1 } = e;
					return currency1.code.toLowerCase().includes(lowerTerm) || currency1.title.toLowerCase().includes(lowerTerm) || currency1.title_fa.includes(term);
				});
		},
		[data, term],
	);

	useEffect(() => {
		if (page !== 1) {
			setPage(1);
		}
	}, [term]);

	return loading ? (
		<Loading />
	) : (
		<div className="flex flex-col gap-11 w-full">
			<h2 className="text-2xl font-medium text-[var(--bp-font-default)]">لیست بازارها</h2>
			<div className="flex items-end justify-between border-b border-b-[#666] gap-2">
				<Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={marketTabs} />
				<div className="relative mb-2 max-w-[300px] flex-grow">
					<input
						value={term}
						onChange={(e) => setTerm(e.currentTarget.value)}
						type="text"
						placeholder="نام ارزدیجیتال را جستجو کنید"
						className="rounded-lg h-12 flex items-center text-xs leading-[18px] pe-3.5 ps-[52px] border border-[var(--bp-font-gray-faded)] outline-none md:w-[300px] w-full"
					/>
					<img src="/images/svg/search.svg" alt="search" className="absolute top-1/2 right-3.5 -translate-y-1/2" />
				</div>
			</div>
			<MarketList data={filterMarketData(activeTab)} page={page} setPage={setPage} activeTab={activeTab} setActiveTab={setActiveTab} />
		</div>
	);
}

export default Home;
