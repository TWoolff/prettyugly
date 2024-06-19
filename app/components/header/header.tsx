'use client'
import Link from 'next/link'
import { useAppContext } from '../../context'
import Button from '../button/button'
import css from './header.module.css'
import Cart from '../cart/cart'
import { calculateTotalQuantity } from '@/app/utils/getQuantity'

const Header: React.FC = () => {
    const { state, dispatch } = useAppContext()

    const handleToggleCart = () => { 
        dispatch({ type: 'TOGGLE_CART' })
    }

    const totalQuantity = calculateTotalQuantity(state.cart)


    return (
        <>
            <header className={css.header}>
                <nav>
                    <h1><Link href='/'>PrettyUgly</Link></h1>
                    <ul>
                        <li><Link href='/products'>Products</Link></li>
                        <li><Link href='/about'>About</Link></li>
                        <li><Button onClick={handleToggleCart} title={`Cart (${totalQuantity})`} className={css.btn}/></li>
                    </ul>
                </nav>
            </header>
            <Cart />
        </>

    )
}

export default Header