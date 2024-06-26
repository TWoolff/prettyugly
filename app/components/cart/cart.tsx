'use client'
import { useEffect, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateTotalQuantity } from '@/app/utils/getQuantity'
import { calculateTotalPrice } from '@/app/utils/getTotal'
import { useAppContext } from '@/app/context'
import Button from '../formelements/button'
import Checkout from '../checkout/checkout'
import css from './cart.module.css'

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined')
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const Cart: React.FC = () => {
    const { state, dispatch } = useAppContext()
    const { cart, isCartVisible } = state
    const cartRef = useRef<HTMLDivElement>(null)

    const handleIncrementQuantity = useCallback((id: string) => {
        dispatch({ type: 'INCREMENT_QUANTITY', payload: { id } })
    }, [dispatch])

    const handleDecrementQuantity = useCallback((id: string) => {
        dispatch({ type: 'DECREMENT_QUANTITY', payload: { id } })
    }, [dispatch])

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
                            </>
                        ) : (
                            <p>Your cart is empty</p>
                        )}
                        {totalQuantity > 0 &&
                            <Elements stripe={stripePromise} options={{mode: 'payment', amount: totalPrice, currency: 'dkk'}}>
                                <Checkout amount={totalPrice} />
                            </Elements>
                        }
                    </motion.section>
                </div>
            )}
        </AnimatePresence>
    )
}

export default Cart
