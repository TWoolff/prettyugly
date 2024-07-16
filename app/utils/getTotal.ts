import { CartItem } from "../types"

export const calculateTotalPrice = (cart: CartItem[]) => {
    return cart.reduce(
        (total, item) => total + item.unit_amount * item.quantity,
        0
    )
}