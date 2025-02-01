import type { CartItem } from "../types";

export const calculateTotalQuantity = (cart: CartItem[]) => {
	return cart.reduce(
		(total: number, item: { quantity: number }) => total + item.quantity,
		0,
	);
};
