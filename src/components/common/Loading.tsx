import Lottie from "react-lottie-player";
import loadingAnimation from "../../assets/lottie/Loading.json";

function Loading() {
	return (
		<div className="w-full flex flex-grow justify-center items-center">
			<Lottie loop play animationData={loadingAnimation} style={{ width: 96, height: 96 }} />
		</div>
	);
}

export default Loading;
