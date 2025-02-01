"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/app/context";
import { getProductBySlug as fetchProductBySlug } from "@/app/utils/getProducts";
import { getProductImages } from "@/app/utils/getProductImages";
import type { Product } from "@/app/types";
import Button from "@/app/components/formelements/button";
import Loader from "@/app/components/loader/loader";
import css from "./productdetail.module.css";

const ProductDetail: React.FC<{ params: { slug: string } }> = ({ params }) => {
	const { state, dispatch } = useAppContext();
	const [product, setProduct] = useState<Product | null>(null);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [productImages, setProductImages] = useState<any>(null);
	const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
	const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
	const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
	const flexRef = useRef<HTMLDivElement>(null);
	const infoContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchProduct = async () => {
			let localProduct = state?.data?.find((p) => p.slug === params.slug);

			if (!localProduct) {
				localProduct = (await fetchProductBySlug(params.slug)) as Product;
			}

			setProduct(localProduct);

			if (localProduct) {
				if (localProduct.metadata.similar) {
					const similarTags = localProduct.metadata.similar
						.split(",")
						.map((tag: string) => tag.trim().toLowerCase());
					const similarProducts =
						(state?.data?.filter((p) => {
							const productTags =
								p.metadata?.similar
									?.split(",")
									.map((tag: string) => tag.trim().toLowerCase()) || [];
							const isTagSimilar = similarTags.some((tag: string) =>
								productTags.includes(tag),
							);
							const isIdSimilar = similarTags.includes(p.id.toLowerCase());
							return (isTagSimilar || isIdSimilar) && p.id !== localProduct.id;
						}) as Product[]) || [];
					setSimilarProducts(similarProducts);
				}
			}
		};

		fetchProduct();
	}, [params.slug, state.data]);

	useEffect(() => {
		const fetchData = async () => {
			if (!product?.id) return;

			try {
				const data = await getProductImages(product.id);
				setProductImages(JSON.parse(JSON.stringify(data)));
			} catch (error) {
				console.error("Error fetching product images:", error);
			}
		};

		fetchData();
	}, [product?.id]);

	useEffect(() => {
		const updateInfoContainerHeight = () => {
			if (flexRef.current && infoContainerRef.current) {
				const flexHeight = flexRef.current.offsetHeight;
				infoContainerRef.current.style.height = `${flexHeight}px`;
			}
		};

		updateInfoContainerHeight();
		window.addEventListener("resize", updateInfoContainerHeight);

		return () => {
			window.removeEventListener("resize", updateInfoContainerHeight);
		};
	}, []);

	const handleMouseMove = (
		e: React.MouseEvent<HTMLDivElement>,
		index: number,
	) => {
		if (zoomedIndex !== index) return;
		const { left, top, width, height } =
			e.currentTarget.getBoundingClientRect();
		const x = ((e.clientX - left) / width) * 100;
		const y = ((e.clientY - top) / height) * 100;
		setZoomPosition({ x, y });
	};

	const handleMouseEnter = (index: number) => setZoomedIndex(index);
	const handleMouseLeave = () => setZoomedIndex(null);

	const getConvertedPrice = (amount: number) => {
		if (state.currency === "DKK") return amount;
		const rate =
			Number(state.exchangeRate?.[state.currency as "EUR" | "SEK"]) || 1;
		return Number(((amount / 100) * rate).toFixed(2));
	};

	if (!product) {
		return <Loader />;
	}

	const { id, name, images, metadata, price, currency } = product;

	const displayTitle =
		state.language === "da-DK" ? metadata.title_da : metadata.title_en;
	const displayDescription =
		state.language === "da-DK"
			? metadata.description_da
			: metadata.description_en;
	const displaySize =
		state.language === "da-DK"
			? `Størrelse: ${metadata.size_da}`
			: `Size: ${metadata.size_en}`;
	const displayMaterial =
		state.language === "da-DK"
			? `Materiale: ${metadata.material_da}`
			: `Material: ${metadata.material_en}`;
	const displayFinding =
		state.language === "da-DK"
			? `Komponenter: ${metadata.finding_da}`
			: `Findings: ${metadata.finding_en}`;

	const handleAddToCart = () => {
		const newItem = {
			quantity: 1,
			id,
			slug: params.slug,
			name,
			price,
			metadata,
			images,
		};
		dispatch({ type: "ADD_TO_CART", payload: newItem });
	};

	const saveProduct = () => {
		dispatch({ type: "SAVE_PRODUCT", payload: { id } });
	};

	return (
		<section className={css.productDetail}>
			<div className={css.flex} ref={flexRef}>
				<div className={css.productImages}>
					<div
						className={css.zoomWrapper}
						onMouseMove={(e) => handleMouseMove(e, 0)}
						onMouseEnter={() => handleMouseEnter(0)}
						onMouseLeave={handleMouseLeave}
					>
						<Image
							src={images[0]}
							alt={name}
							width={700}
							height={700}
							quality={90}
							className={zoomedIndex === 0 ? css.zoomedImage : ""}
							style={{
								transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
								transform: zoomedIndex === 0 ? "scale(2)" : "scale(1)",
								transition: "transform 0.2s ease",
							}}
						/>
					</div>

					{productImages && (
						<>
							{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
							{productImages.map((image: any, i: number) => (
								<Image
									src={`https:${image.url}`}
									alt={image.title}
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={i}
									width={700}
									height={700}
									quality={90}
									style={{
										transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
										transform: zoomedIndex === i + 1 ? "scale(2)" : "scale(1)",
										transition: "transform 0.2s ease",
									}}
								/>
							))}
						</>
					)}
				</div>
				<div className={css.infoContainer} ref={infoContainerRef}>
					<div className={css.info}>
						<h1>{displayTitle}</h1>
						<p className={css.description}>{displayDescription}</p>
						<ul className={css.metadata}>
							{metadata?.size_da && <li>{displaySize}</li>}
							{metadata?.material_da && <li>{displayMaterial}</li>}
							{metadata?.finding_da && <li>{displayFinding}</li>}
						</ul>
						<p className={css.price}>
							{state.currency === "DKK"
								? (price / 100).toFixed(2)
								: getConvertedPrice(price ?? 0)}{" "}
							{currency?.toUpperCase()}
						</p>
						<Button
							onClick={saveProduct}
							title={
								state.language === "da-DK" ? "Gem Produkt" : "Save Product"
							}
							className={css.btn}
						/>
						<Button
							onClick={handleAddToCart}
							title={
								state.language === "da-DK" ? "Tilføj til kurv" : "Add to Cart"
							}
							className={css.btn}
						/>
					</div>
				</div>
			</div>
			{similarProducts?.length > 0 && (
				<div className={css.similarProductsContainer}>
					<h2>
						{state.language === "da-DK"
							? "Lignende Produkter"
							: "Similar Products"}
					</h2>
					<div className={css.similarProducts}>
						{similarProducts.map((similarProduct) => (
							<div key={similarProduct.id} className={css.similarProduct}>
								<Link href={`/products/${similarProduct.slug}`}>
									<Image
										src={similarProduct.images[0]}
										alt={similarProduct.name}
										width={300}
										height={300}
										quality={90}
									/>
									<p>{similarProduct.name}</p>
									<p>
										{(similarProduct.price ?? 0) / 100}{" "}
										{similarProduct.currency?.toUpperCase()}
									</p>
								</Link>
							</div>
						))}
					</div>
				</div>
			)}
		</section>
	);
};

export default ProductDetail;
