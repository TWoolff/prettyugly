import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAppContext } from "@/app/context";
import css from "./club.module.css";
import { TransitionLink } from "@/app/utils/transitionLinks";

const Club = () => {
	const { state } = useAppContext();
	const { language } = state;
	const { ref, inView } = useInView({
		threshold: 0.2,
		triggerOnce: false,
	});

	useEffect(() => {
		const homeElement = document.querySelector(".home") as HTMLElement;
		if (homeElement) {
			homeElement.style.backgroundColor = inView
				? "var(--color-lightgreen)"
				: "var(--color-background)";
		}
	}, [inView]);

	return (
		<section ref={ref} className={`${css.club} grid`}>
			<h2>
				{language === "en-US"
					? "Join the PrettyUgly Friends group"
					: "Bliv medlem af PrettyUgly Friends gruppen"}
			</h2>
			<div>
				<ul>
					{language === "en-US" ? (
						<>
							<li>get earlybird special offers</li>
							<li>a birthday gift</li>
							<li>new products sneakpeak</li>
							<li>newsletter offers</li>
							<li>loyalty points and much more...</li>
						</>
					) : (
						<>
							<li>få &quot;earlybird&quot; tilbud</li>
							<li>få en fødselsdagsgave</li>
							<li>sneakpeak af nye produkter</li>
							<li>få nyheder og tilbud</li>
							<li>få loyaltets point og meget mere...</li>
						</>
					)}
				</ul>
				<TransitionLink href="/profile" className={css.btn}>
					{language === "en-US" ? "Click here" : "Klik her"}
				</TransitionLink>
				<p>
					{language === "en-US"
						? "to set up your free account"
						: "for at oprette din gratis konto"}
				</p>
			</div>{" "}
		</section>
	);
};

export default Club;
