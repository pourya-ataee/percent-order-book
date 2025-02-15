import { Match } from "../../../models/Match";
import { Order } from "../../../models/Activity";
import { TActivity } from "../../../types/TActivity";
import { convertTimeFormat, formatNumberWithCommas } from "../../../utils";

interface IProps {
	type: TActivity;
	data: Order | Match;
}

function ActivityCard({ data, type }: IProps) {
	return (
		<li className="px-3 py-2 flex gap-3 items-center justify-between border-b border-[var(--bp-sf-border-gray-faded)]">
			<div className="flex items-center gap-2 w-[calc(33%-8px)]">
				<span className="text-[var(--bp-font-default)] font-medium max-md:text-xs">
					{formatNumberWithCommas(type === "match" ? (data as Match).match_amount : (data as Order).price)}
				</span>
			</div>
			<div className="flex items-center gap-2 w-[calc(33%-8px)]">
				<span className="text-[var(--bp-font-default)] font-medium max-md:text-xs">
					{formatNumberWithCommas(type === "match" ? (data as Match).price : (data as Order).remain)}
				</span>
			</div>
			<div className="flex items-center gap-2 w-[calc(33%-8px)]">
				<span className="text-[var(--bp-font-default)] font-medium max-md:text-xs">
					{type === "match" ? convertTimeFormat((data as Match).time) : formatNumberWithCommas((data as Order).value)}
				</span>
			</div>
		</li>
	);
}

export default ActivityCard;
