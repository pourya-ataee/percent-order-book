import { Dispatch, SetStateAction, useMemo, useState } from "react";
import MarketCard from "./MarketCard";
import Arrow from "../../../assets/svg/Arrow";
import { marketTabs } from "../../../constants/tabs";
import { useSwipeable } from "react-swipeable";
import { TCurrency } from "../../../types/TCurrency";
import { MarketResult } from "../../../models/Market";

interface IProps {
	page: number;
	data: MarketResult[];
	activeTab: TCurrency;
	setPage: Dispatch<SetStateAction<number>>;
	setActiveTab: Dispatch<SetStateAction<TCurrency>>;
}

function MarketList({ data, page, setPage, activeTab, setActiveTab }: IProps) {
	const itemsPerPage = 10;
	const totalPages = Math.ceil(data.length / itemsPerPage);
	const [dragX, setDragX] = useState<number>(0);
	const [sort, setSort] = useState<string>("");
	const [isHorizontalSwipe, setIsHorizontalSwipe] = useState<boolean | null>(null);

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setPage(newPage);
		}
	};

	const renderPaginationButtons = () => {
		const buttons = [];

		const createButton = (pageNumber: number) => (
			<button
				type="button"
				key={pageNumber}
				onClick={() => handlePageChange(pageNumber)}
				className={`rounded-lg w-8 h-8 flex items-center justify-center cursor-pointer outline-none ${page === pageNumber ? "bg-primary text-white" : "hover:bg-[var(--bp-bg-gray-faded)] hover:transition"}`}
			>
				{pageNumber}
			</button>
		);

		buttons.push(createButton(1));

		if (page > 3) {
			buttons.push(
				<span key="dots1" className="px-2">
					...
				</span>,
			);
		}

		const startPage = Math.max(2, page - 2);
		const endPage = Math.min(totalPages - 1, page + 2);

		for (let i = startPage; i <= endPage; i++) {
			buttons.push(createButton(i));
		}

		if (page < totalPages - 2) {
			buttons.push(
				<span key="dots2" className="px-2">
					...
				</span>,
			);
		}

		if (totalPages > 1) buttons.push(createButton(totalPages));

		return buttons;
	};

	const sortedData = useMemo(() => {
		if (!sort) return data;

		const [column, order] = sort.split("_");
		const factor = order === "asc" ? 1 : -1;

		const getValue = (item: MarketResult) => {
			switch (column) {
				case "name":
					return item.currency1.title_fa;
				case "price":
					return +(item.price_info?.price ?? 0);
				case "change":
					return item.price_info?.change ?? 0;
				default:
					return null;
			}
		};

		return [...data].sort((a, b) => {
			const valueA = getValue(a);
			const valueB = getValue(b);

			if (column === "name") {
				return factor * (valueA as string).localeCompare(valueB as string, "fa");
			}

			return factor * ((valueA as number) - (valueB as number));
		});
	}, [data, sort]);

	const currentData = useMemo<typeof data>(() => {
		const start = (page - 1) * 10;
		const end = page * 10;
		return sortedData.slice(start, end);
	}, [page, sortedData]);

	const handleSort = (column: string) => {
		setSort((prevSort) => {
			const [prevColumn, prevOrder] = prevSort?.split("_") ?? [];
			if (prevColumn === column) {
				return prevOrder === "asc" ? `${column}_desc` : "";
			}
			return `${column}_asc`;
		});
	};

	const activeIndex = marketTabs.findIndex((tab) => tab.value === activeTab);
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
				if (e.deltaX > 50 && activeIndex < marketTabs.length - 1) {
					setActiveTab(marketTabs[activeIndex + 1].value);
				} else if (e.deltaX < -50 && activeIndex > 0) {
					setActiveTab(marketTabs[activeIndex - 1].value);
				}
			}
			setIsHorizontalSwipe(null);
		},
		preventScrollOnSwipe: !!isHorizontalSwipe,
		trackTouch: true,
		trackMouse: false,
	});

	return (
		<div className="flex flex-col overflow-hidden">
			{currentData.length ? (
				<>
					<div className="px-3 pb-3 flex items-center gap-2 justify-between border-b border-[var(--bp-sf-border-gray-faded)] text-sm text-[var(--bp-font-gray-default)]">
						<div className="flex-grow max-w-[calc(34%-6px)]">
							<div className="flex items-center gap-2 cursor-pointer w-fit" onClick={() => handleSort("name")}>
								نام رمزارز
								<div className="flex flex-col">
									<Arrow className={`w-4 h-4 rotate-90 ${sort === "name_asc" ? "text-primary" : ""}`} />
									<Arrow className={`w-4 h-4 rotate-270 ${sort === "name_desc" ? "text-primary" : ""}`} />
								</div>
							</div>
						</div>
						<div className="w-[calc(22%-6px)]">
							<div className="flex items-center gap-2 cursor-pointer w-fit" onClick={() => handleSort("price")}>
								قیمت
								<div className="flex flex-col">
									<Arrow className={`w-4 h-4 rotate-90 ${sort === "price_asc" ? "text-primary" : ""}`} />
									<Arrow className={`w-4 h-4 rotate-270 ${sort === "price_desc" ? "text-primary" : ""}`} />
								</div>
							</div>
						</div>
						<div className="w-[calc(22%-6px)] flex justify-center">
							<div className="text-center flex items-center gap-2 cursor-pointer w-fit" onClick={() => handleSort("change")}>
								تغییرات ۲۴ ساعت
								<div className="flex flex-col">
									<Arrow className={`w-4 h-4 rotate-90 ${sort === "change_asc" ? "text-primary" : ""}`} />
									<Arrow className={`w-4 h-4 rotate-270 ${sort === "change_desc" ? "text-primary" : ""}`} />
								</div>
							</div>
						</div>
						<div className="w-[calc(22%-6px)] text-center"></div>
					</div>
					<div
						{...swipeHandlers}
						style={{
							transform: isHorizontalSwipe ? `translateX(${dragX}px)` : "none",
						}}
					>
						{currentData.map((market) => (
							<MarketCard market={market} key={market.id} />
						))}
					</div>
				</>
			) : (
				<div className="flex items-center justify-center">داده‌ای موجود نیست</div>
			)}
			{totalPages > 1 && (
				<div className="flex justify-end items-center gap-2 mt-4">
					<button
						onClick={() => handlePageChange(page - 1)}
						disabled={page === 1}
						className={`rounded-lg w-8 h-8 flex items-center justify-center outline-none ${page === 1 ? "opacity-50" : "cursor-pointer hover:bg-[var(--bp-bg-gray-faded)] hover:transition"}`}
					>
						<img src="/images/svg/left.svg" alt="left" className="rotate-180" />
					</button>

					{renderPaginationButtons()}

					<button
						onClick={() => handlePageChange(page + 1)}
						disabled={page === totalPages}
						className={`rounded-lg w-8 h-8 flex items-center justify-center outline-none ${page === totalPages ? "opacity-50" : "cursor-pointer hover:bg-[var(--bp-bg-gray-faded)] hover:transition"}`}
					>
						<img src="/images/svg/left.svg" alt="left" />
					</button>
				</div>
			)}
		</div>
	);
}

export default MarketList;
