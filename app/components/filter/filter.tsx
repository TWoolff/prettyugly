"use client";
import { useEffect, useMemo, Fragment } from "react";
import { useAppContext } from "@/app/context";
import { useChangeCurrency } from "@/app/utils/useChangeCurrency";
import { getProducts } from "@/app/utils/getProducts";
import { TransitionLink } from "@/app/utils/transitionLinks";
import Button from "../formelements/button";
import Toggle from "../formelements/toggle";
import type { Product } from "@/app/types";
import css from "./filter.module.css";
interface FilterProps {
	onButtonClick: () => void;
	setIsMenuOpen: (value: boolean) => void;
}

const Filter: React.FC<FilterProps> = ({ onButtonClick, setIsMenuOpen }) => {
	const { state, dispatch } = useAppContext();
	const { language, allProducts } = state;
	const { changeCurrency } = useChangeCurrency();
	const languageSuffix = language === "da-DK" ? "_da" : "_en";

	const uniqueCategories = useMemo(() => {
		if (!allProducts) return [];
		const categories = allProducts
			.map((item: Product) => item.metadata[`category${languageSuffix}`])
			.filter(
				(category): category is string =>
					category !== undefined && category !== null,
			);
		return Array.from(new Set(categories));
	}, [allProducts, languageSuffix]);

	const uniqueColors = useMemo(() => {
		if (!allProducts) return [];
		const allColors = allProducts.flatMap((item: any) => {
			const color = item.metadata[`color${languageSuffix}`];
			return color
				? color.split(",").map((c: string) => c.trim().toLowerCase())
				: [];
		});
		return Array.from(new Set(allColors)).filter(Boolean);
	}, [allProducts, languageSuffix]);

	const handleFilterChange = async (name: string, value: string) => {
		dispatch({ type: "SET_FILTER", payload: { key: name, value } });

		if (name === "category") {
			const products = await getProducts(value || undefined, language);
			const sanitizedProducts = products.map(
				(product: { description: string }) => ({
					...product,
					description: product.description || "",
				}),
			);
			dispatch({
				type: "SET_STATE",
				payload: {
					data: sanitizedProducts,
					allProducts: state.allProducts || sanitizedProducts,
					filters: state.filters,
					language: state.language,
					currency: state.currency,
				},
			});
		}

		onButtonClick();
	};
	const handleLangChange = (checked: boolean) => {
		dispatch({ type: "SET_LANGUAGE", payload: checked ? "en-US" : "da-DK" });
	};

	useEffect(() => {
		const currentCategory = state.filters.category;
		const currentColor = state.filters.color;
		dispatch({ type: "RESET_FILTERS" });
		if (currentCategory) {
			dispatch({
				type: "SET_FILTER",
				payload: { key: "category", value: currentCategory },
			});
		}
		if (currentColor) {
			dispatch({
				type: "SET_FILTER",
				payload: { key: "color", value: currentColor },
			});
		}
	}, [language, dispatch]);

	useEffect(() => {
		const initializeProducts = async () => {
			if (!state.allProducts) {
				const products = await getProducts();
				if (products) {
					const sanitizedProducts = products.map(
						(product: { description: any }) => ({
							...product,
							description: product.description || "",
						}),
					);
					dispatch({
						type: "SET_STATE",
						payload: {
							data: sanitizedProducts,
							allProducts: sanitizedProducts,
						},
					});
				}
			}
		};
		initializeProducts();
	}, []);

	return (
		<section className={`${css.filter} grid`}>
			<div className={css.categoryContainer}>
				<Button
					onClick={() => handleFilterChange("category", "")}
					title={language === "da-DK" ? "Alle" : "All"}
					className={css.categoryButton}
				/>{" "}
				/{" "}
				{uniqueCategories.map((category, i) => (
					<Fragment key={i}>
						{i > 0 && " / "}
						<Button
							key={i}
							onClick={() => handleFilterChange("category", category as string)}
							title={category as string}
							className={css.categoryButton}
						/>
					</Fragment>
				))}
			</div>
			<div className={css.navContainer}>
				<TransitionLink href="/" onClick={() => setIsMenuOpen(false)}>
					{language === "da-DK" ? "Forside" : "Home"}
				</TransitionLink>
				<TransitionLink href="/about" onClick={() => setIsMenuOpen(false)}>
					{language === "da-DK" ? "Om os" : "About"}
				</TransitionLink>
				<div className={css.currencyContainer}>
					{language === "da-DK" ? "VALUTA" : "CURRENCY"}:
					<Button
						onClick={() => changeCurrency("DKK")}
						title="DKK"
						className={`${css.currencyButton} ${state.currency === "DKK" ? css.active : ""}`}
					/>{" "}
					/
					<Button
						onClick={() => changeCurrency("EUR")}
						title="EUR"
						className={`${css.currencyButton} ${state.currency === "EUR" ? css.active : ""}`}
					/>{" "}
					/
					<Button
						onClick={() => changeCurrency("SEK")}
						title="SEK"
						className={`${css.currencyButton} ${state.currency === "SEK" ? css.active : ""}`}
					/>
				</div>
				<div className={css.languageContainer}>
					{language === "da-DK" ? "SPROG" : "LANGUAGE"}:
					<Toggle
						onChange={handleLangChange}
						labelLeft="da"
						labelRight="en"
						className={css.headerToggle}
						initialChecked={language === "en-US"}
					/>
				</div>
			</div>

			{/* <div>
				<h2>{language === 'da-DK' ? 'Farver' : 'Colors'}</h2>
				<Button onClick={() => handleFilterChange('color', '')} title={language === 'da-DK' ? 'Alle' : 'All'} />
				{uniqueColors.map((color, i) => (
					<Button key={i} onClick={() => handleFilterChange('color', color as string)} title={color as string} />
				))}
			</div> */}
		</section>
	);
};

export default Filter;
