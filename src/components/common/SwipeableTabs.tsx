import React, { useState, useRef, ReactNode } from "react";

interface Tab {
	label: string;
	content: ReactNode;
}

interface IProps {
	tabs: Tab[];
}

const SwipeableTabs: React.FC<IProps> = ({ tabs }) => {
	const [activeTab, setActiveTab] = useState<number>(0);
	const [dragging, setDragging] = useState<boolean>(false);
	const [direction, setDirection] = useState<"horizontal" | "vertical" | null>(null);
	const touchStartX = useRef<number>(0);
	const touchStartY = useRef<number>(0);
	const deltaX = useRef<number>(0);
	const deltaY = useRef<number>(0);
	const contentRef = useRef<HTMLDivElement | null>(null);

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		touchStartX.current = e.touches[0].clientX;
		touchStartY.current = e.touches[0].clientY;
		setDragging(true);
	};

	const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		const touchMoveX = e.touches[0].clientX;
		const touchMoveY = e.touches[0].clientY;

		if (dragging) {
			if (direction !== "vertical") {
				deltaX.current = touchMoveX - touchStartX.current;
				deltaY.current = touchMoveY - touchStartY.current;

				if (Math.abs(deltaY.current) > 5) {
					// direction !== "horizontal" && setDirection("vertical");
				} else if (Math.abs(deltaX.current) > 5) {
					// direction !== "horizontal" && setDirection("horizontal");
					if (contentRef.current) {
						contentRef.current.style.transform = `translateX(${deltaX.current}px)`;
					}
				}
			} else {
				e.preventDefault();
			}
		}
	};

	const handleTouchEnd = () => {
		setDragging(false);
		const swipeDistance = deltaX.current;

		if (swipeDistance > 50 && activeTab < tabs.length - 1) {
			setActiveTab(activeTab + 1);
		} else if (swipeDistance < -50 && activeTab > 0) {
			setActiveTab(activeTab - 1);
		}
		setDirection(null);
		if (contentRef.current) {
			contentRef.current.style.transform = `translateX(0)`;
		}
	};

	const handleTabClick = (index: number) => {
		setActiveTab(index);
	};

	console.log(direction);

	return (
		<div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className="w-full touch-none">
			<div className="border-b border-b-[#666] w-full">
				<div className="flex gap-1 items-center">
					{tabs.map((tab, index) => (
						<button
							key={index}
							onClick={() => handleTabClick(index)}
							className={`pb-3 outline-none px-4 cursor-pointer relative after:h-0.5 after:w-8 after:content-[''] after:absolute after:bottom-0 after:right-1/2 after:translate-x-1/2 font-bold text-sm ${activeTab === index ? "text-[var(--bp-font-default)] after:bg-primary" : "text-[var(--bp-font-gray-faded)]"}`}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>
			<div className="p-4 transition-transform duration-300 ease-in-out">
				<div ref={contentRef}>{tabs[activeTab] && <div>{tabs[activeTab].content}</div>}</div>
			</div>
		</div>
	);
};

export default SwipeableTabs;
