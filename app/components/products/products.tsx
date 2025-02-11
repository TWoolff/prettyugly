import { useEffect } from "react";
import type { JSX } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAppContext } from "@/app/context";
import { getProducts } from "@/app/utils/getProducts";
import Product from "./product";
import Loader from "../loader/loader";
import css from "./product.module.css";

type ProductType = {
	id: string;
	name: string;
	description: string;
	images: string[];
	metadata: {
		[key: string]: string | undefined;
		title_en?: string;
		title_da?: string;
		description_en?: string;
		description_da?: string;
		category_en?: string;
		category_da?: string;
		color_en?: string;
		color_da?: string;
	};
	price: number;
	unit_amount: number | null;
	currency: string | null;
	slug: string;
};

const Products: React.FC = () => {
	const { state, dispatch } = useAppContext();
	const { filters, language } = state;
	const searchParams = useSearchParams();

	useEffect(() => {
		const category = searchParams.get("category");
		const search = searchParams.get("search");

		if (category) {
			dispatch({
				type: "SET_FILTER",
				payload: { key: "category", value: category },
			});
		}

		if (search) {
			dispatch({
				type: "SET_FILTER",
				payload: { key: "search", value: search },
			});
		}
	}, [dispatch, searchParams]);

	useEffect(() => {
		if (state.data) return;
		const fetchData = async () => {
			const data = await getProducts();
			if (data) {
				dispatch({
					type: "SET_STATE",
					payload: {
						data: data.map((item: Partial<ProductType>) => ({
							...item,
							description: item.description || "",
						})),
						hasLoaded: true,
					},
				});
			}
		};
		fetchData();
	}, [dispatch, state.data]);

	useEffect(() => {
		if (state.filters?.search !== undefined && state.data) {
			if (state.filters.search.trim() === "") {
				dispatch({
					type: "SET_STATE",
					payload: { data: state.allProducts },
				});
			} else {
				const filteredProducts = state.data.filter((product) => {
					const title =
						product.metadata[`title${language === "da-DK" ? "_da" : "_en"}`];
					const description =
						product.metadata[
							`description${language === "da-DK" ? "_da" : "_en"}`
						];
					const searchTerm = state.filters.search.toLowerCase();

					return (
						title?.toLowerCase().includes(searchTerm) ||
						false ||
						description?.toLowerCase().includes(searchTerm) ||
						false
					);
				});

				dispatch({
					type: "SET_STATE",
					payload: { data: filteredProducts },
				});
			}
		}
	}, [
		dispatch,
		state.filters?.search,
		state.data,
		language,
		state.allProducts,
	]);

	const filteredProducts = state.data?.filter((product: ProductType) => {
		const languageSuffix = language === "da-DK" ? "_da" : "_en";
		return Object.entries(filters).every(([key, value]) => {
			if (value === "") return true;
			if (key === "color") {
				const colors =
					product.metadata[`color${languageSuffix}`]
						?.split(",")
						.map((c: string) => c.trim().toLowerCase()) || [];
				return colors.includes(value.toLowerCase());
			}
			if (key === "search") {
				const searchWords = value
					.toLowerCase()
					.split(" ")
					.filter((word) => word.length > 0);
				const searchFields = [
					product.metadata[`title${languageSuffix}`],
					product.metadata[`description${languageSuffix}`],
					product.metadata[`category${languageSuffix}`],
					product.metadata[`color${languageSuffix}`],
				];
				return searchWords.every((word) =>
					searchFields.some((field) => field?.toLowerCase().includes(word)),
				);
			}
			if (key === "featured") {
				const featuredIds = value.split(",");
				return featuredIds.includes(product.id);
			}
			if (key === "category") {
				return (
					product.metadata[`category${languageSuffix}`]?.toLowerCase() ===
					value.toLowerCase()
				);
			}
			return true;
		});
	});

	const renderProducts = () => {
		if (!filteredProducts) return null;

		const gridContainers = [
			{ name: "gridFour", slots: 5 },
			{ name: "gridThree", slots: 4 },
			{ name: "gridThree", slots: 6 },
			{ name: "gridThreeB", slots: 4 },
			{ name: "gridFourB", slots: 5 },
			{ name: "gridThree", slots: 3 },
			{ name: "gridFourC", slots: 5 },
			{ name: "gridThree", slots: 5 },
			{ name: "gridThree", slots: 6 },
			{ name: "gridThreeB", slots: 5 },
		];

		const grids: JSX.Element[] = [];
		let currentIndex = 0;

		while (currentIndex < filteredProducts.length) {
			for (
				let containerIndex = 0;
				containerIndex < gridContainers.length;
				containerIndex++
			) {
				const container = gridContainers[containerIndex];
				if (currentIndex + container.slots > filteredProducts.length) break;

				const gridProducts = filteredProducts.slice(
					currentIndex,
					currentIndex + container.slots,
				);

				if (gridProducts.length === container.slots) {
					grids.push(
						<div
							key={`${container.name}-${currentIndex}`}
							className={css[container.name]}
						>
							{gridProducts.map((product) => (
								<motion.div key={product.id} layout className={css.product}>
									<Product data={product} />
								</motion.div>
							))}
							{/* Model div for gridThree except 3rd and 9th containers */}
							{container.name === "gridThree" &&
								containerIndex !== 2 &&
								containerIndex !== 8 && <div className={css.model} />}
							{/* Model div for gridThreeB */}
							{container.name === "gridThreeB" && <div className={css.model} />}
							{/* Video div only for 6th container (index 5) */}
							{container.name === "gridThree" && containerIndex === 5 && (
								<div className={css.video} />
							)}
						</div>,
					);

					currentIndex += container.slots;
				}
			}

			if (currentIndex + gridContainers[0].slots > filteredProducts.length) {
				break;
			}
		}

		return grids;
	};

	return (
		<>
			{!state.data && <Loader />}
			{state.data && (
				<div className={css.productsContainer}>
					<h1>
						{language === "da-DK" ? "Produkter" : "Products"} [
						{filteredProducts?.length ?? 0}]
					</h1>
					<div className={css.products}>{renderProducts()}</div>
				</div>
			)}
		</>
	);
};

export default Products;
