export const calculateTotalPrice = (cart: any[]) => {
    return cart.reduce(
        (total, item) => total + item.unit_amount * item.quantity,
        0
    )
}