import { MarketResult } from "../../../models/Market";
import { formatNumberWithCommas, formatPriceChange } from "../../../utils";

function MarketCard({ market }: { market: MarketResult }) {
	return (
		<div className="px-3 py-2 flex items-center gap-2 justify-between border-b border-[var(--bp-sf-border-gray-faded)]">
			<div className="flex items-center gap-2 flex-grow max-w-[calc(34%-6px)]">
				<img src={`${market.currency1.image}`} alt={market.currency1.title} width={32} height={32} />
				<div className="flex flex-col gap-1 w-[calc(100%-40px)]">
					<span className="font-bold text-base leading-6 text-[var(--bp-font-default)] whitespace-nowrap truncate" title={market.currency1.title_fa}>
						{market.currency1.title_fa}
					</span>
					<span className="text-sm text-[var(--bp-font-gray-faded)] whitespace-nowrap truncate">
						{market.currency1.code}/{market.currency2.code}
					</span>
				</div>
			</div>
			<div className="flex flex-col gap-2 w-[calc(22%-6px)]">
				<span className="text-base text-[var(--bp-font-default)]">{market.price_info?.price ? formatNumberWithCommas(market.price_info.price) : "-"}</span>
				<span className="text-sm text-[var(--bp-font-gray-faded)] whitespace-nowrap truncate">{market.currency2.title_fa}</span>
			</div>
			<div
				className={`[direction:ltr] font-medium text-xs w-[calc(22%-6px)] text-center flex items-center justify-center ${market.price_info.change ? (market.price_info.change >= 0 ? "text-[var(--bp-font-pos-default)]" : "text-[var(--bp-font-neg-default)]") : ""}`}
			>
				{formatPriceChange(market.price_info.change)}
			</div>
			<div className="w-[calc(22%-6px)] justify-end flex">
				<div className="flex items-center gap-1 cursor-pointer w-fit text-[var(--bp-font-default)]">
					اطلاعات بیشتر <img src="/images/svg/left.svg" alt="left" />
				</div>
			</div>
		</div>
	);
}

export default MarketCard;
