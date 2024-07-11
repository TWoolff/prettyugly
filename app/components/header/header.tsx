'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAppContext } from '@/app/context'
import { calculateTotalQuantity } from '@/app/utils/getQuantity'
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
                        <li><Link href='/products'>Products</Link></li>
                        <li><Link href='/about'>About</Link></li>
                        <li><Link href='/'>Profile</Link></li>
                        {/* <li><Button onClick={handleToggleSearch} title='Search' className={css.btn} /></li> */}
                        {/* <li><Link href='/products/saved'>Saved</Link></li> */}
                    </ul>
                </nav>
            </header>
            <Cart />
        </>
    )
}

export default Header
