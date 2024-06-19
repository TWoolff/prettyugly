'use client'
import Link from 'next/link'
import { useAppContext } from '../../context'
import Button from '../button/button'
import css from './header.module.css'

const Header: React.FC = () => {
    const { state, dispatch } = useAppContext()

    const handleToggleCart = () => { 
        dispatch({ type: 'TOGGLE_CART' })
    }

    console.log(state)
        
    return (
        <header className={css.header}>
            <nav>
                <h1><Link href='/'>PrettyUgly</Link></h1>
                <ul>
                    <li><Link href='/products'>Products</Link></li>
                    <li><Link href='/about'>About</Link></li>
                    <li><Button onClick={handleToggleCart} title={`Cart (${state.cart.length})`} className={css.btn}/></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header