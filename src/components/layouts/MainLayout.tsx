import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function MainLayout() {
	return (
		<main className="min-h-[100dvh] text-[var(--bp-font-primary)] bg-[var(--bp-bg-base-intense)]">
			<Header />
			<section className="min-h-[calc(100dvh-329px)] py-16 max-md:pt-8 px-16 max-md:px-6 w-full flex flex-col">
				<div className="flex-grow h-full w-full relative flex max-w-[1920px] mx-auto">
					<Outlet />
				</div>
			</section>
			<Footer />
			<ToastContainer
				rtl
				stacked
				draggable
				closeOnClick
				pauseOnHover
				autoClose={5000}
				newestOnTop={false}
				position="bottom-left"
				hideProgressBar={false}
				pauseOnFocusLoss={false}
			/>
		</main>
	);
}

export default MainLayout;
