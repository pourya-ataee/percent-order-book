import { Link } from "react-router-dom";
import Logo from "../../assets/svg/Logo";

function Footer() {
	return (
		<section className="px-16 max-md:px-4">
			<div className="flex flex-col gap-11 w-full max-w-[1920px] mx-auto">
				<Link to={"/"}>
					<Logo className={"h-11 w-44 *:transition dark:[&_#logo-svg-text]:fill-[#d8d8d8] [&_#logo-svg-text]:fill-[#333]"} />
				</Link>
				<div className="flex justify-between items-center p-4 rounded-lg bg-[var(--bp-bg-gray-faded)]">
					<div className="flex items-center gap-6">
						<img src="/images/svg/logoIcon.svg" alt="bitpin-logo" />
						<span className="font-bold text-xl">اپلیکیش بیت‌پین</span>
					</div>
					<div className="flex items-center gap-4">
						<a
							target="_blank"
							href="https://bitpin.ir/app-download/"
							className="py-2 px-3 border border-[var(--bp-bp-border-gray-highlighted)] rounded-lg hover:border-primary transition flex items-center justify-center hover:text-primary"
						>
							مشاهده همه
						</a>
					</div>
				</div>
				<div className="py-4 border-t border-[var(--bp-sf-border-gray-muted)]">
					<div className="flex gap-2 items-center text-sm justify-center">
						<p>کلیه حقوق این سایت متعلق به بیت‌پین است</p>
						<span>v1.0.0</span>
						<span>|</span>
						<span>
							Made with ❤️ by <span className="font-semibold">Pourya Ataee</span>
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Footer;
