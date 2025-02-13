import Header from "./Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
	return (
		<main className="min-h-[100dvh]">
			<Header />
			<Outlet />
		</main>
	);
}

export default MainLayout;
