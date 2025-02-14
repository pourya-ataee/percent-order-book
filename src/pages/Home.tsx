import { useEffect, useState } from "react";
import { Market } from "../models/Market";
import Loading from "../components/common/Loading";
import { bitpinEndpoints } from "../services/api/BitpinEndpoints";

function Home() {
	// const [tab, setTab] = useState<"IRT" | "USDT">("IRT");
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

	console.log(data);

	useEffect(() => {
		fetchData();
	}, []);

	return loading ? <Loading /> : <div>خانه</div>;
}

export default Home;
