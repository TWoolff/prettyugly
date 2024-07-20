'use client'
import { useEffect, useState } from 'react'
import { useAppContext } from '@/app/context'
import { calculateTotalQuantity } from '@/app/utils/getQuantity'
import Button from '../formelements/button'
import Cart from '../cart/cart'
import css from './header.module.css'
import { TransitionLink } from '@/app/utils/transitionLinks'

const Header: React.FC = () => {
    const { state, dispatch } = useAppContext()
    const { cart } = state
    const [hasMounted, setHasMounted] = useState(false)

    const handleToggleCart = () => { 
        dispatch({ type: 'TOGGLE_CART' })
    }

    const handleToggleSearch = () => {
        dispatch({ type: 'TOGGLE_SEARCH' })
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
                        <li><TransitionLink href='/profile'>Profile</TransitionLink></li>
                        {/* <li><Button onClick={handleToggleSearch} title='Search' className={css.btn} /></li> */}
                    </ul>
                </nav>
            </header>
            <Cart />
        </>
    )
}

export default Header
