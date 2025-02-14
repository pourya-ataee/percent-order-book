import { Link } from "react-router-dom";
import Logo from "../../assets/svg/Logo";
import DarkModeToggle from "../common/DarkModeToggle";

function Header() {
	return (
		<header className="w-full px-6 flex items-center justify-between gap-6 sticky top-0">
			<div className="flex items-center gap-6">
				<Link to={"/"}>
					<Logo className={"h-16 w-32 *:transition dark:[&_#logo-svg-text]:fill-[#d8d8d8] [&_#logo-svg-text]:fill-[#333]"} />
				</Link>
			</div>
			<div className="flex items-center gap-6">
				<DarkModeToggle />
			</div>
		</header>
	);
}

export default Header;
