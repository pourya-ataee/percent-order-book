import { Link } from "react-router-dom";
import Logo from "../../assets/svg/Logo";

function Header() {
	return (
		<header className="w-full px-6 flex items-center justify-between gap-4">
			<div className="flex items-center gap-6">
				<Link to={"/"}>
					<Logo className={"h-16 w-32"} />
				</Link>
			</div>
		</header>
	);
}

export default Header;
