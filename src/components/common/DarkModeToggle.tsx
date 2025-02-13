import { useEffect, useState } from "react";
import Sun from "../../assets/svg/Sun";
import Moon from "../../assets/svg/Moon";

const DarkModeToggle = () => {
	const [theme, setTheme] = useState(localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	return (
		<button className="hover:[&_path]:stroke-primary cursor-pointer outline-none" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
			{theme === "dark" ? <Moon className="*:transition" /> : <Sun className="*:transition" />}
		</button>
	);
};

export default DarkModeToggle;
