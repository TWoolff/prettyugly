'use client'
import { useEffect, useState } from 'react'
import { useAppContext } from '@/app/context'
import { calculateTotalQuantity } from '@/app/utils/getQuantity'
import { TransitionLink } from '@/app/utils/transitionLinks'
import Button from '../formelements/button'
import Cart from '../cart/cart'
import Toggle from '../formelements/toggle'
import css from './header.module.css'

const Header: React.FC = () => {
  const { state, dispatch } = useAppContext()
  const { cart } = state
  const language = state.language
  const [hasMounted, setHasMounted] = useState(false)

  const handleToggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const handleLogout = () => {
    dispatch({ type: 'SET_CUSTOMER', payload: null })
  }

  const handleLangChange = (checked: boolean) => {
    dispatch({ type: 'SET_LANGUAGE', payload: checked ? 'en-US' : 'da-DK' });
  }

  const totalQuantity = calculateTotalQuantity(cart)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <>
      <header className={css.header}>
        <nav>
          <Button onClick={handleToggleCart} title={language === 'da-DK' ? `Kurv [ ${hasMounted ? totalQuantity : 0} ]` : `Cart [ ${hasMounted ? totalQuantity : 0} ]`} className={css.headBtn} />
          <ul>
            <li><TransitionLink href='/'>{language === 'da-DK' ? 'Forside' : 'Home'}</TransitionLink></li>
            <li><TransitionLink href='/products'>{language === 'da-DK' ? 'Produkter' : 'Products'}</TransitionLink></li>
            <li><TransitionLink href='/about'>{language === 'da-DK' ? 'Om os' : 'About'}</TransitionLink></li>
            {state.customer ? (<Button onClick={handleLogout} title={language === 'da-DK' ? 'Log ud' : 'Sign out'} className={css.headBtn} />) : (
              <TransitionLink href='/profile'>{language === 'da-DK' ? 'Log ind' : 'Sign in'}</TransitionLink>
            )}
            <Toggle onChange={handleLangChange} labelLeft='da' labelRight='en' className={css.headerToggle} initialChecked={language === 'en-US'} />
          </ul>
        </nav>
      </header>
      <Cart />
    </>
  )
}

export default Header
