import Home from "./pages/Home";
import MainLayout from "./components/layouts/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Market from "./pages/Market";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="/markets/:marketId" element={<Market />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
