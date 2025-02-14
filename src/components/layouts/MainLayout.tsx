import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
	return (
		<main className="min-h-[100dvh] text-[var(--bp-font-primary)] bg-[var(--bp-bg-base-intense)]">
			<Header />
			<section className="relative flex min-h-[calc(100dvh-329px)] pt-16 pb-20 px-16 w-full max-w-[1920px] mx-auto">
				<Outlet />
			</section>
			<Footer />
		</main>
	);
}

export default MainLayout;
