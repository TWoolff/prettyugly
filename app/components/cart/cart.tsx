'use client'
import { useEffect, useRef, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateTotalQuantity } from '@/app/utils/getQuantity'
import { calculateTotalPrice } from '@/app/utils/getTotal'
import { useAppContext } from '@/app/context'
import Button from '../formelements/button'
import css from './cart.module.css'

const Cart: React.FC = () => {
    const { state, dispatch } = useAppContext()
    const router = useRouter()
    const { cart, isCartVisible } = state
    const cartRef = useRef<HTMLDivElement>(null)

    const handleIncrementQuantity = useCallback((id: string) => {
        dispatch({ type: 'INCREMENT_QUANTITY', payload: { id } })
    }, [dispatch])

    const handleDecrementQuantity = useCallback((id: string) => {
        dispatch({ type: 'DECREMENT_QUANTITY', payload: { id } })
    }, [dispatch])

    const handleCheckout = useCallback(async () => {
        const lineItems = cart.map((e: any) => ({
            price: e.id,
            quantity: e.quantity,
        }))
        const res = await fetch('../api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lineItems }),
        })
        const data = await res.json()
        router.push(data.session.url)
    }, [cart, router])

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
            dispatch({ type: 'TOGGLE_CART' })
        }
    }, [dispatch])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [handleClickOutside])

    const totalPrice = useMemo(() => calculateTotalPrice(cart), [cart])
    const totalQuantity = useMemo(() => calculateTotalQuantity(cart), [cart])

    const variants = {
        hidden: { opacity: 0, x: '100%' },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: '100%' },
    }

    return (
        <AnimatePresence>
            {isCartVisible && (
                <div className={css.cartContainer}>
                    <motion.section
                        ref={cartRef}
                        className={css.cart}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <Button onClick={() => dispatch({ type: 'TOGGLE_CART' })} title='Close' className={css.btnClose} />
                        <h2>Cart</h2>
                        <ul>
                            {cart.map((item) => (
                                <li key={item.id}>
                                    <p>{item.name}</p>
                                    <Image 
                                        src={item.images[0]} 
                                        alt={item.name}
                                        width={160} 
                                        height={160} 
                                        quality={90} 
                                    />
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
                    </motion.section>
                </div>
            )}
        </AnimatePresence>
    )
}

export default Cart
