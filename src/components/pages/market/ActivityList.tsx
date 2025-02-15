import { Dispatch, SetStateAction, useMemo, useState } from "react";
import ActivityCard from "./ActivityCard";
import { Match } from "../../../models/Match";
import { useSwipeable } from "react-swipeable";
import { Order } from "../../../models/Activity";
import { TActivity } from "../../../types/TActivity";
import { activityTabs } from "../../../constants/tabs";
import { useMarketStore } from "../../../stores/market";
import Decimal from "decimal.js";
import { formatNumberWithCommas } from "../../../utils";

interface IProps {
	data: Order[] | Match[];
	activeTab: TActivity;
	setActiveTab: Dispatch<SetStateAction<TActivity>>;
}

function ActivityList({ data, activeTab, setActiveTab }: IProps) {
	const market = useMarketStore((state) => state.market);

	const [dragX, setDragX] = useState<number>(0);
	const [value, setValue] = useState<string>("");
	const [isHorizontalSwipe, setIsHorizontalSwipe] = useState<boolean | null>(null);
	const activeIndex = activityTabs.findIndex((tab) => tab.value === activeTab);

	const swipeHandlers = useSwipeable({
		onSwiping: (e) => {
			if (isHorizontalSwipe === null) {
				setIsHorizontalSwipe(Math.abs(e.deltaX) > Math.abs(e.deltaY));
			}
			if (isHorizontalSwipe) {
				setDragX(e.deltaX);
			}
		},
		onSwiped: (e) => {
			if (isHorizontalSwipe) {
				setDragX(0);
				if (e.deltaX > 50 && activeIndex < activityTabs.length - 1) {
					setActiveTab(activityTabs[activeIndex + 1].value);
				} else if (e.deltaX < -50 && activeIndex > 0) {
					setActiveTab(activityTabs[activeIndex - 1].value);
				}
			}
			setIsHorizontalSwipe(null);
		},
		preventScrollOnSwipe: !!isHorizontalSwipe,
		trackTouch: true,
		trackMouse: false,
	});

	const totalRemain = useMemo<Decimal>(() => {
		if (activeTab === "match") {
			return new Decimal(0);
		}
		return data.reduce((sum, order) => sum.plus(new Decimal((order as Order).remain)), new Decimal(0));
	}, [data, activeTab]);

	const totalValue = useMemo<Decimal>(() => {
		if (activeTab === "match") {
			return new Decimal(0);
		}
		return data.reduce((sum, order) => sum.plus(new Decimal((order as Order).value)), new Decimal(0));
	}, [data, activeTab]);

	const weightedAveragePrice = useMemo<string>(() => {
		if (activeTab === "match") {
			return "0";
		}
		const totalValue = data.reduce((sum, order) => sum.plus(new Decimal(order.price).times(new Decimal((order as Order).remain))), new Decimal(0));
		return totalRemain.gt(0) ? totalValue.div(totalRemain).toFixed(0) : "0";
	}, [data, activeTab]);

	const result = useMemo<{ remain: Decimal; price: Decimal; avgPrice: Decimal } | null>(() => {
		if (activeTab === "match") {
			return null;
		}
		const percent = new Decimal(+value).div(100);
		const remain = totalRemain.times(percent);
		const price = totalValue.times(percent);
		const avgPrice = new Decimal(weightedAveragePrice).times(percent);

		return { remain, price, avgPrice };
	}, [value, totalRemain, totalValue, weightedAveragePrice, activeTab]);

	return data.length ? (
		<>
			<div className="flex gap-4">
				<div className="flex-grow overflow-hidden">
					<div className="px-3 pb-3 flex items-center gap-3 justify-between border-b border-[var(--bp-sf-border-gray-faded)] text-sm text-[var(--bp-font-gray-default)]">
						<div className="w-[calc(33%-8px)]">
							<div className="flex items-center gap-2 cursor-pointer w-fit">قیمت ({market?.currency2.code})</div>
						</div>
						<div className="w-[calc(33%-8px)]">
							<div className="text-center flex items-center gap-2 cursor-pointer w-fit">مقدار ({market?.currency1.code})</div>
						</div>
						<div className="w-[calc(33%-8px)]">
							<div className="flex items-center gap-2 cursor-pointer w-fit">{activeTab === "match" ? "زمان" : `کل (${market?.currency2.code})`}</div>
						</div>
					</div>
					<ul
						{...swipeHandlers}
						style={{
							transform: isHorizontalSwipe ? `translateX(${dragX}px)` : "none",
						}}
						className="flex flex-col"
					>
						{data.map((e, i) => (
							<ActivityCard data={e} type={activeTab} key={i} />
						))}
					</ul>
				</div>
				{activeTab !== "match" && (
					<div className="flex flex-col relative z-[10] justify-between gap-2 bg-[#f2f2f2] dark:bg-[#222222] p-3 rounded-lg">
						{!!result && (
							<div className="flex flex-col gap-4 p-3 rounded-lg text-[var(--bp-font-default)]">
								<div className="flex flex-col">
									<span className="text-sm text-[var(--bp-font-gray-default)]">مجموع باقی‌مانده ({market?.currency1.code}):</span>
									<span className="text-[var(--bp-font-default)] font-medium block text-center">{formatNumberWithCommas(result.remain.toString())}</span>
								</div>
								<div className="flex flex-col">
									<span className="text-sm text-[var(--bp-font-gray-default)]">مجموع قابل پرداخت ({market?.currency2.code}):</span>
									<span className="text-[var(--bp-font-default)] font-medium block text-center">{formatNumberWithCommas(result.price.toString())}</span>
								</div>
								<div className="flex flex-col">
									<span className="text-sm text-[var(--bp-font-gray-default)]">میانگین قیمت وزنی ({market?.currency2.code}):</span>
									<span className="text-[var(--bp-font-default)] font-medium block text-center">{formatNumberWithCommas(result.avgPrice.toString())}</span>
								</div>
							</div>
						)}
						<div className="relative w-full h-fit">
							<input
								value={value}
								onChange={(e) => {
									const temp = e.currentTarget.value;
									if (+temp >= 0 && +temp <= 100) {
										setValue(temp);
									}
								}}
								type="text"
								placeholder="درصد سفارش"
								className="placeholder:text-right [direction:ltr] rounded-lg h-12 flex items-center text-xs leading-[18px] px-3.5 pr-10 border border-[var(--bp-font-gray-faded)] outline-none w-full"
							/>
							<span className="flex items-center justify-center absolute top-1/2 right-3.5 -translate-y-1/2 w-[12px] mt-[2px]">%</span>
						</div>
					</div>
				)}
			</div>
			{activeTab !== "match" && !!data.length && (
				<div className="flex flex-col gap-4 p-3 bg-[#f2f2f2] dark:bg-[#222222] rounded-lg text-[var(--bp-font-default)]">
					<div className="flex gap-2 items-center">
						<span className="text-sm text-[var(--bp-font-gray-default)]">مجموع باقی‌مانده ({market?.currency1.code}):</span>
						<span className="text-[var(--bp-font-default)] font-medium">{formatNumberWithCommas(totalRemain.toString())}</span>
					</div>
					<div className="flex gap-2 items-center">
						<span className="text-sm text-[var(--bp-font-gray-default)]">مجموع کل ({market?.currency2.code}):</span>
						<span className="text-[var(--bp-font-default)] font-medium">{formatNumberWithCommas(totalValue.toString())}</span>
					</div>
					<div className="flex gap-2 items-center">
						<span className="text-sm text-[var(--bp-font-gray-default)]">میانگین قیمت وزنی ({market?.currency2.code}):</span>
						<span className="text-[var(--bp-font-default)] font-medium">{formatNumberWithCommas(weightedAveragePrice)}</span>
					</div>
				</div>
			)}
		</>
	) : (
		<div className="flex items-center justify-center">داده‌ای موجود نیست</div>
	);
}

export default ActivityList;
