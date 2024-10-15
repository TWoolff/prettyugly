import { CartItem } from "../types"

export const calculateTotalQuantity = (cart: CartItem[]) => {
  return cart.reduce((total: any, item: { quantity: number }) => total + item.quantity, 0)
}