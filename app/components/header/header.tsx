'use client'
import { useEffect, useState } from 'react'
import { useAppContext } from '@/app/context'
import { calculateTotalQuantity } from '@/app/utils/getQuantity'
import { TransitionLink } from '@/app/utils/transitionLinks'
import Button from '../formelements/button'
import Cart from '../cart/cart'
import css from './header.module.css'

const Header: React.FC = () => {
    const { state, dispatch } = useAppContext()
    const { cart } = state
    const [hasMounted, setHasMounted] = useState(false)

    const handleToggleCart = () => { 
        dispatch({ type: 'TOGGLE_CART' })
    }

    const handleLogout = () => {
        dispatch({ type: 'SET_CUSTOMER', payload: null })
    }

    const totalQuantity = calculateTotalQuantity(cart)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    return (
        <>
            <header className={css.header}>
                <nav>
                    <Button onClick={handleToggleCart} title={`Cart [ ${hasMounted ? totalQuantity : 0} ]`} className={css.headBtn} />
                    <ul>
                        <li><TransitionLink href='/products'>Products</TransitionLink></li>
                        <li><TransitionLink href='/about'>About</TransitionLink></li>
                        {state.customer ? ( <Button onClick={handleLogout} title='Sign out' className={css.headBtn} />) : (
                            <TransitionLink href='/profile'>Sign in</TransitionLink>
                        )}
                    </ul>
                </nav>
            </header>
            <Cart />
        </>
    )
}

export default Header
