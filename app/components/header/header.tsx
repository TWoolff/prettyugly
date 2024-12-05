'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/app/context'
import { calculateTotalQuantity } from '@/app/utils/getQuantity'
import { TransitionLink } from '@/app/utils/transitionLinks'
import Button from '../formelements/button'
import Cart from '../cart/cart'
import Toggle from '../formelements/toggle'
import Filter from '../filter/filter'
import { CartIcon, ProfileIcon, SearchIcon } from '../icons/icons'
import css from './header.module.css'
import Search from '../search/search'

const Header: React.FC = () => {
	const { state, dispatch } = useAppContext()
	const { cart } = state
	const language = state.language
	const [hasMounted, setHasMounted] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [showSearch, setShowSearch] = useState(false)
	const router = useRouter()

	const handleToggleCart = () => {
		dispatch({ type: 'TOGGLE_CART' })
	}

	const handleLogout = () => {
		dispatch({ type: 'SET_CUSTOMER', payload: null })
	}

	const handleLangChange = (checked: boolean) => {
		dispatch({ type: 'SET_LANGUAGE', payload: checked ? 'en-US' : 'da-DK' })
	}

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const totalQuantity = calculateTotalQuantity(cart)

	useEffect(() => {
		setHasMounted(true)
	}, [])

	const handleFilterButtonClick = () => {
		setIsMenuOpen(false)
		router.push('/products')
	}

	return (
		<>
			<header className={css.header}>
				<h1>
					<TransitionLink href='/'>PRETTYUGLY</TransitionLink>
				</h1>

				<div className={css.headerBtns}>
					<button className={isMenuOpen ? `${css.active} ${css.burgerMenu}` : css.burgerMenu} onClick={toggleMenu}>
						<span>
							<span className={css.burgerMenuLine}>Menu</span>
						</span>
					</button>
					
					{state.customer ? (
						<Button
							onClick={() => {
								handleLogout()
								setIsMenuOpen(false)
							}}
							title=''
							icon={<ProfileIcon />}
							className={`${css.headBtn} ${css.logOutBtn}`}
						/>
					) : (
						<TransitionLink href='/profile' onClick={() => setIsMenuOpen(false)} className={css.headBtn}>
							<ProfileIcon />
						</TransitionLink>
					)}
					<div className={css.searchContainer}>
						<Button onClick={() => setShowSearch(!showSearch)} title='' icon={<SearchIcon />} className={css.headBtn}/>
						{showSearch && <Search />}
					</div>
					<Button onClick={handleToggleCart} title={hasMounted ? totalQuantity : 0} icon={<CartIcon />} className={css.headBtn} />
				</div>

				<nav className={`${css.nav} ${isMenuOpen ? css.open : ''}`}>
					<ul>
						<li>
							<TransitionLink href='/' onClick={() => setIsMenuOpen(false)}>
								{language === 'da-DK' ? 'Forside' : 'Home'}
							</TransitionLink>
						</li>
						<li>
							<TransitionLink href='/products' onClick={() => setIsMenuOpen(false)}>
								{language === 'da-DK' ? 'Produkter' : 'Products'}
							</TransitionLink>
						</li>
						<li>
							<TransitionLink href='/about' onClick={() => setIsMenuOpen(false)}>
								{language === 'da-DK' ? 'Om os' : 'About'}
							</TransitionLink>
						</li>
						<li>
							<Toggle onChange={handleLangChange} labelLeft='da' labelRight='en' className={css.headerToggle} initialChecked={language === 'en-US'} />
						</li>
					</ul>
					<Filter onButtonClick={handleFilterButtonClick} />
				</nav>
			</header>
			<Cart />
		</>
	)
}

export default Header
