import type { CartItem } from "../types";

export const calculateTotalPrice = (cart: CartItem[]) => {
	return cart.reduce((total, item) => {
		const amount = item.unit_amount || item.price || 0;
		return total + amount * item.quantity;
	}, 0);
};
