import Header from "./Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
	return (
		<main className="min-h-[100dvh] text-[var(--bp-font-primary)] bg-[var(--bp-bg-base-intense)]">
			<Header />
			<Outlet />
		</main>
	);
}

export default MainLayout;
