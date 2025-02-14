import React, { SetStateAction, Dispatch } from "react";
import { TCurrency } from "../../models/Market";

interface Tab {
	label: string;
	value: TCurrency;
}

interface IProps {
	tabs: Tab[];
	activeTab: TCurrency;
	setActiveTab: Dispatch<SetStateAction<TCurrency>>;
}

const Tabs: React.FC<IProps> = ({ tabs, activeTab, setActiveTab }) => {
	const handleTabClick = (value: TCurrency) => {
		setActiveTab(value);
	};

	return (
		<div className="flex gap-1 items-center">
			{tabs.map((tab, index) => (
				<button
					key={index}
					onClick={() => handleTabClick(tab.value)}
					className={`pb-3 outline-none px-4 cursor-pointer relative after:h-0.5 after:w-8 after:content-[''] after:absolute after:bottom-0 after:right-1/2 after:translate-x-1/2 font-bold text-sm ${activeTab === tab.value ? "text-[var(--bp-font-default)] after:bg-primary" : "text-[var(--bp-font-gray-faded)]"}`}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
};

export default Tabs;
