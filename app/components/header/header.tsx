'use client'
import Link from 'next/link'
import { useAppContext } from '@/app/context'
import Button from '../formelements/button'
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
                    <h1><Link href='/'>
                        <span>P</span>
                        <span>r</span>
                        <span>e</span>
                        <span>t</span>
                        <span>t</span>
                        <span>y</span>
                        <span>u</span>
                        <span>g</span>
                        <span>l</span>
                        <span>y</span>
                    </Link></h1>
                    <ul>
                        <li><Link href='/products'>Products</Link></li>
                        <li><Link href='/about'>About</Link></li>
                        <li><Link href='/products/saved'>Saved</Link></li>
                        <li><Button onClick={handleToggleCart} title={`Cart (${totalQuantity})`} className={css.btn}/></li>
                    </ul>
                </nav>
            </header>
            <Cart />
        </>

    )
}

export default Header