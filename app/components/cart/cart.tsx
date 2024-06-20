'use client'
import { useRouter } from 'next/navigation'
import { calculateTotalQuantity } from '../../utils/getQuantity'
import { useAppContext } from '../../context'
import Button from '../button/button'
import css from './cart.module.css'

const Cart: React.FC = () => {
    const { state, dispatch } = useAppContext()
    const router = useRouter()
    const { cart, isCartVisible } = state

    const calculateTotalPrice = () => {
        return cart.reduce(
            (total, item) => total + item.unit_amount * item.quantity,
            0
        )
    }

    const handleIncrementQuantity = (id: string) => {
        dispatch({ type: 'INCREMENT_QUANTITY', payload: { id } })
    }

    const handleDecrementQuantity = (id: string) => {
        dispatch({ type: 'DECREMENT_QUANTITY', payload: { id } })
    }

    const handleCheckout = async() => {
        const lineItems = cart.map((e: any) => {
            return {
                price: e.id,
                quantity: e.quantity,
            }
        })
        const res = await fetch('../api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lineItems }),
        })
        const data = await res.json()
        router.push(data.session.url)
    }

    if (!isCartVisible) {
        return null
    }

    const totalPrice = calculateTotalPrice()
    const totalQuantity = calculateTotalQuantity(cart)

    return (
        <section className={css.cart}>
            <h2>Cart</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.unit_amount / 100},00 kr.</p>
                        <p>{item.quantity}</p>
                        <Button onClick={() => handleDecrementQuantity(item.id)} title='-' className={css.btnSmall} />
                        <Button onClick={() => handleIncrementQuantity(item.id)} title='+' className={css.btnSmall} />
                    </li>
                ))}
            </ul>
            {totalQuantity > 0 ? (
                <>
                    <h3>Total: {totalPrice / 100},00 kr.</h3>
                    <Button onClick={handleCheckout} title='Checkout' className={css.btn} />
                </>
            ) : (
                <p>Your cart is empty</p>
            )}
            
        </section>
    )
}

export default Cart