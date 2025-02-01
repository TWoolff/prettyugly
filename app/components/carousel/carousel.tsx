"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useTransform, useScroll } from "framer-motion";
import { useAppContext } from "@/app/context";
import { TransitionLink } from "@/app/utils/transitionLinks";
import Logo from "../logo/logo";
import css from "./carousel.module.css";

interface ProductCategory {
	id: string;
	name_en: string;
	name_da: string;
	image: string;
}

interface CarouselData {
	fields: {
		products: Array<{
			fields: {
				productId: string;
			};
		}>;
	};
}

type CarouselProps = {
	data: CarouselData;
};

const Carousel: React.FC<CarouselProps> = ({ data }) => {
	const { state, dispatch } = useAppContext();
	const targetRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
	});

	const productCategories = [
		{
			id: "tights",
			name_en: "Tights",
			name_da: "Strømper",
			image:
				"/images/slim-female-legs-purple-tights-raised-up-bright-yellow-background-234349138.png",
		},
		{
			id: "rings",
			name_en: "Rings",
			name_da: "Ringe",
			image: "/images/Bjork_gold_blue_ring_green_1.png",
		},
		{
			id: "earrings",
			name_en: "Earrings",
			name_da: "Øreringe",
			image: "/images/Asher_Gold_orange.png",
		},
		{
			id: "necklaces",
			name_en: "Necklaces",
			name_da: "Halskæder",
			image: "/images/necklace.webp",
		},
		{
			id: "bags",
			name_en: "Bags",
			name_da: "Tasker",
			image: "/images/blue_backpack.png",
		},
		{
			id: "pins",
			name_en: "Pins",
			name_da: "Pins",
			image:
				"/images/slim-female-legs-purple-tights-raised-up-bright-yellow-background-234349138.png",
		},
	];

	const x = useTransform(scrollYProgress, [0, 1], ["0%", "-95%"]);

	return (
		<section ref={targetRef} className={css.carouselContainer}>
			<div className={css.stickyContainer}>
				<motion.div style={{ x }} className={css.motionContainer}>
					{productCategories.map((product: ProductCategory) => {
						const categoryName =
							state.language === "en-US" ? product.name_en : product.name_da;
						return (
							<TransitionLink
								href={`/products?category=${encodeURIComponent(categoryName.toLowerCase())}`}
								key={product.id}
								className={css.card}
							>
								<Image
									src={product.image}
									alt={product.name_en}
									width={425}
									height={600}
								/>
							</TransitionLink>
						);
					})}
				</motion.div>
				<article className={css.scrollText}>
					<Logo />
					<div className={css.desktopOnly}>
						<h2>
							{state.language === "en-US"
								? "Introduction to PrettyUgly"
								: "Introduktion til PrettyUgly"}
						</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
							lectus augue, accumsan non vestibulum sed, varius ut velit.
							Suspendisse potenti. Quisque fringilla ornare est, et elementum
							justo venenatis eget. Sed mi risus, varius sit amet pharetra nec,
							consectetur at justo. Proin scelerisque lacus id fringilla
							gravida. Orci varius natoque penatibus et magnis dis parturient
							montes, nascetur ridiculus mus. Donec tempus malesuada nunc vitae
							imperdiet. Quisque sodales turpis vitae feugiat blandit.
						</p>
						<p>
							Praesent semper ipsum turpis, vel tincidunt velit tristique sit
							amet. Proin laoreet, nibh sit amet aliquet sodales, odio lacus
							egestas quam, et condimentum turpis arcu eu dolor. Cras malesuada
							ipsum nisl, vitae eleifend mi mollis id. Nam blandit id dolor
							hendrerit vehicula. Sed metus eros, hendrerit eget placerat nec,
							malesuada id diam. Cras non lorem condimentum, convallis mi eu,
							consequat orci. Integer lectus neque, tristique non arcu nec,
							dignissim suscipit velit. Sed mi est, blandit sit amet tellus id,
							consequat pretium.
						</p>
						<TransitionLink href="products/">
							{state.language === "en-US"
								? "Click here to see our full catalogue"
								: "Klik her for at se vores fulde katalog"}
						</TransitionLink>
					</div>
				</article>
			</div>
		</section>
	);
};

export default Carousel;
