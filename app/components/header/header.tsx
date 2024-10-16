'use client'
import { useEffect, useState } from 'react'
import { useAppContext } from '@/app/context'
import { calculateTotalQuantity } from '@/app/utils/getQuantity'
import { TransitionLink } from '@/app/utils/transitionLinks'
import Button from '../formelements/button'
import Cart from '../cart/cart'
import Toggle from '../formelements/toggle'
import css from './header.module.css'
import Filter from '../filter/filter'

const Header: React.FC = () => {
  const { state, dispatch } = useAppContext()
  const { cart } = state
  const language = state.language
  const [hasMounted, setHasMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleCart = () => { 
    dispatch({ type: 'TOGGLE_CART' })
  }

  const handleLogout = () => {
    dispatch({ type: 'SET_CUSTOMER', payload: null })
  }

  const handleLangChange = (checked: boolean) => {
    dispatch({ type: 'SET_LANGUAGE', payload: checked ? 'en-US' : 'da-DK' });
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const totalQuantity = calculateTotalQuantity(cart)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <>
      <header className={css.header}>
        <h1><TransitionLink href='/'>PRETTYUGLY</TransitionLink></h1>
        <div className={css.burgerMenu} onClick={toggleMenu}>
          <div className={`${css.burgerBar} ${isMenuOpen ? css.open : ''}`}></div>
          <div className={`${css.burgerBar} ${isMenuOpen ? css.open : ''}`}></div>
          <div className={`${css.burgerBar} ${isMenuOpen ? css.open : ''}`}></div>
        </div>
        <nav className={`${css.nav} ${isMenuOpen ? css.open : ''}`}>
          <Button onClick={handleToggleCart} title={language === 'da-DK' ? `Kurv [ ${hasMounted ? totalQuantity : 0} ]` : `Cart [ ${hasMounted ? totalQuantity : 0} ]`} className={css.headBtn} />
          <ul>
            <li><TransitionLink href='/' onClick={() => setIsMenuOpen(false)}>{language === 'da-DK' ? 'Forside' : 'Home'}</TransitionLink></li>
            <li><TransitionLink href='/products' onClick={() => setIsMenuOpen(false)}>{language === 'da-DK' ? 'Produkter' : 'Products'}</TransitionLink></li>
            <li><TransitionLink href='/about' onClick={() => setIsMenuOpen(false)}>{language === 'da-DK' ? 'Om os' : 'About'}</TransitionLink></li>
            {state.customer ? (
              <li><Button onClick={() => { handleLogout(); setIsMenuOpen(false); }} title={language === 'da-DK' ? 'Log ud' : 'Sign out'} className={css.headBtn} /></li>
            ) : (
              <li><TransitionLink href='/profile' onClick={() => setIsMenuOpen(false)}>{language === 'da-DK' ? 'Log ind' : 'Sign in'}</TransitionLink></li>
            )}
            <li>
              <Toggle onChange={handleLangChange} labelLeft='da' labelRight='en' className={css.headerToggle} initialChecked={language === 'en-US'} />
            </li>
          </ul>
          <Filter />
        </nav>
      </header>
      <Cart />
    </>
  )
}

export default Header
