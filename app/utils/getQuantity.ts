export const calculateTotalQuantity = (cart: any[]) => {
    return cart.reduce((total: any, item: { quantity: number }) => total + item.quantity, 0)
}