import { MarketResult } from "../../../models/Market";

interface IProps {
	data: MarketResult[];
}

function MarketList({ data }: IProps) {
	return data.map((market) => <div key={market.id}>test</div>);
}

export default MarketList;
