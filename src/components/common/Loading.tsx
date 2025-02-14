import Lottie from "react-lottie";
import loadingAnimation from "../../assets/lottie/Loading.json";

function Loading() {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: loadingAnimation,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};
	return (
		<div className="w-full flex flex-grow justify-center items-center">
			<Lottie options={defaultOptions} height={96} width={96} />
		</div>
	);
}

export default Loading;
