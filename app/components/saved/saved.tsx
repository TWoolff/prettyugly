"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/app/context";
import Button from "@/app/components/formelements/button";
import type { Product } from "@/app/types";
import css from "./savedProducts.module.css";

const SavedProducts: React.FC = () => {
	const [savedProductIds, setSavedProductIds] = useState<string[]>([]);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [savedProducts, setSavedProducts] = useState<any[]>([]);
	const { state } = useAppContext();

	const handleRemove = (id: string) => {
		const savedProductsFromStorage = localStorage.getItem("savedProducts");
		if (savedProductsFromStorage) {
			const savedProducts = JSON.parse(savedProductsFromStorage);
			const updatedProducts = savedProducts.filter(
				(product: { id: string }) => product.id !== id,
			);
			localStorage.setItem("savedProducts", JSON.stringify(updatedProducts));
			setSavedProductIds(
				updatedProducts.map((item: { id: string }) => item.id),
			);
			setSavedProducts((prevProducts) =>
				prevProducts.filter((product) => product.id !== id),
			);
		}
	};

	useEffect(() => {
		const savedProductsFromStorage = localStorage.getItem("savedProducts");
		if (savedProductsFromStorage) {
			const parsedSavedProducts = JSON.parse(savedProductsFromStorage);
			setSavedProductIds(
				parsedSavedProducts.map((item: { id: string }) => item.id),
			);
		}
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (state.data && savedProductIds.length > 0) {
			const filteredProducts = state.data.filter((product: Product) =>
				savedProductIds.includes(product.id),
			);
			setSavedProducts(filteredProducts);
		} else if (savedProductIds.length === 0) {
			setSavedProducts([]);
		}
	}, []);

	if (savedProducts.length === 0) {
		return <p>No saved products</p>;
	}

	return (
		<section className={css.savedProducts}>
			<h1>Saved Products</h1>
			<ul>
				{savedProducts.map((product) => (
					<li key={product.id} className={css.product}>
						<h2>{product.product.name}</h2>
						<Image
							src={product.product.images[0]}
							alt={product.product.name}
							width={500}
							height={500}
							quality={90}
						/>
						<p>Price: {product.unit_amount / 100},00 kr.</p>
						<p>Description: {product.product.description}</p>
						<Button
							title="Remove"
							onClick={() => handleRemove(product.id)}
							className={css.btn}
						/>
					</li>
				))}
			</ul>
		</section>
	);
};

export default SavedProducts;
