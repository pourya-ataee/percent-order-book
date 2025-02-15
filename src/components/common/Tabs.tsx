import { SetStateAction, Dispatch } from "react";

interface Tab<T> {
	label: string;
	value: T;
}

interface IProps<T> {
	tabs: Tab<T>[];
	activeTab: T;
	setActiveTab: Dispatch<SetStateAction<T>>;
}

const Tabs = <T,>({ tabs, activeTab, setActiveTab }: IProps<T>) => {
	const handleTabClick = (value: T) => {
		setActiveTab(value);
	};

	return (
		<div className="flex gap-1 items-center">
			{tabs.map((tab, index) => (
				<button
					key={index}
					onClick={() => handleTabClick(tab.value)}
					className={`pb-3 outline-none px-4 max-md:px-2 cursor-pointer relative after:h-0.5 after:w-8 after:content-[''] after:absolute after:bottom-0 after:right-1/2 after:translate-x-1/2 font-bold text-sm max-md:text-xs whitespace-nowrap ${activeTab === tab.value ? "text-[var(--bp-font-default)] after:bg-primary" : "text-[var(--bp-font-gray-faded)]"}`}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
};

export default Tabs;
