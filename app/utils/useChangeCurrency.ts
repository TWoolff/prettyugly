import { useAppContext } from "../context";
import type { Product } from "../types";

export const useChangeCurrency = () => {
	const { state, dispatch } = useAppContext();
	const { exchangeRate } = state;

	const getExchangeRate = (currency: "DKK" | "EUR" | "SEK"): number => {
		switch (currency) {
			case "EUR":
				return Number(exchangeRate?.EUR) || 1;
			case "SEK":
				return Number(exchangeRate?.SEK) || 1;
			default:
				return 1;
		}
	};

	const changeCurrency = (currency: "DKK" | "EUR" | "SEK") => {
		if (!state.data) return;

		const updatedProducts = state.data.map((product: Product) => {
			const baseAmount = product.price ?? 0;
			const updatedUnitAmount = Math.round(
				(baseAmount / 100) * getExchangeRate(currency) * 100,
			);

			return {
				...product,
				unit_amount: updatedUnitAmount,
				currency,
			};
		});

		const updatedCart = state.cart.map((item) => ({
			...item,
			unit_amount: Math.round(
				(item.price ?? 0 / 100) * getExchangeRate(currency) * 100,
			),
			currency,
		}));

		dispatch({ type: "SET_CURRENCY", payload: currency });
		dispatch({ type: "UPDATE_PRODUCTS", payload: updatedProducts });
		dispatch({ type: "UPDATE_CART", payload: updatedCart });
	};

	return { changeCurrency, getExchangeRate };
};
