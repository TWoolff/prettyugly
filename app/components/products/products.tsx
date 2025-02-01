import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAppContext } from "@/app/context";
import { getProducts } from "@/app/utils/getProducts";
import Product from "./product";
import Loader from "../loader/loader";
import css from "./product.module.css";

interface ProductType {
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
	price: number | null;
	unit_amount: number | null;
	currency: string | null;
	slug: string;
}

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

	const renderGrids = () => {
		const gridSize = 6;
		const totalGrids = Math.ceil(filteredProducts?.length ?? 0 / gridSize);
		const grids = [];

		for (let i = 0; i < totalGrids; i++) {
			const startIndex = i * gridSize;
			const gridNumber = (i % 4) + 1;
			const leftProducts = filteredProducts?.slice(startIndex, startIndex + 3);
			const rightProducts = filteredProducts?.slice(
				startIndex + 3,
				startIndex + 6,
			);

			if ((leftProducts?.length ?? 0) > 0 && (rightProducts?.length ?? 0) > 0) {
				grids.push(
					<div key={`grid-${i}`} className={css.gridContainer}>
						{(leftProducts?.length ?? 0) > 0 && (
							<div className={css[`leftGrid0${gridNumber}`]}>
								{leftProducts?.map((product: ProductType) => (
									<motion.div key={product.id} layout className={css.product}>
										<Product key={product.id} data={product} />
									</motion.div>
								))}
							</div>
						)}
						{(rightProducts?.length ?? 0) > 0 && (
							<div className={css[`rightGrid0${gridNumber}`]}>
								{rightProducts?.map((product: ProductType) => (
									<motion.div key={product.id} layout className={css.product}>
										<Product key={product.id} data={product} />
									</motion.div>
								))}
							</div>
						)}
					</div>,
				);
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
						{language === "da-DK" ? "Produkter:" : "Products:"}{" "}
						{filters.category ? (
							<>
								{filters.category} [ {filteredProducts?.length ?? 0} ]
							</>
						) : filters.color ? (
							<>
								{filters.color} [ {filteredProducts?.length ?? 0} ]
							</>
						) : (
							<>All [ {filteredProducts?.length ?? 0} ]</>
						)}
					</h1>
					<div className={css.products}>{renderGrids()}</div>
				</div>
			)}
		</>
	);
};

export default Products;
