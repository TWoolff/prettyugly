'use client'
import { createContext, useContext, ReactNode, useReducer, useEffect } from 'react'
import { State, Action, CartItem, AppContextType, Customer } from './types'

const loadInitialState = (): State => {
	const savedCart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null
	const savedProducts = typeof window !== 'undefined' ? localStorage.getItem('savedProducts') : null

	return {
		error: null,
		data: null,
		hasLoaded: false,
		cart: savedCart ? JSON.parse(savedCart) : [],
		saved: savedProducts ? JSON.parse(savedProducts) : [],
		isCartVisible: false,
		isSearchVisible: false,
		customer: null,
		filters: {},
		currency: 'DKK',
		exchangeRate: null,
		language: 'da-DK',
	}
}

const initialState: State = loadInitialState()

const AppContext = createContext<AppContextType | undefined>(undefined)

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_STATE':
			return { ...state, ...(action.payload as Partial<State>) }
		case 'RESET_STATE':
			return initialState
		case 'SET_CUSTOMER':
			return { ...state, customer: action.payload as Customer | null }
		case 'ADD_TO_CART': {
			const newItem = action.payload as CartItem
			const existingItemIndex = state.cart.findIndex(item => item.id === newItem.id)
			if (existingItemIndex >= 0) {
				const updatedCart = state.cart.map((item, index) => (index === existingItemIndex ? { ...item, quantity: item.quantity + newItem.quantity } : item))
				return { ...state, cart: updatedCart, isCartVisible: true }
			} else {
				return { ...state, cart: [...state.cart, newItem], isCartVisible: true }
			}
		}
		case 'CLEAR_CART':
			localStorage.removeItem('cart')
			return { ...state, cart: [] }
		case 'SAVE_PRODUCT': {
			const newItem = action.payload as CartItem
			const existingItemIndex = state.saved.findIndex(item => item.id === newItem.id)
			let updatedSaved
			if (existingItemIndex >= 0) {
				updatedSaved = state.saved.filter(item => item.id !== newItem.id)
			} else {
				updatedSaved = [...state.saved, newItem]
			}
			localStorage.setItem('savedProducts', JSON.stringify(updatedSaved))
			return { ...state, saved: updatedSaved }
		}
		case 'INCREMENT_QUANTITY': {
			const { id } = action.payload as { id: string }
			const updatedCart = state.cart.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
			return { ...state, cart: updatedCart }
		}
		case 'DECREMENT_QUANTITY': {
			const { id } = action.payload as { id: string }
			const updatedCart = state.cart.flatMap(item => (item.id === id ? (item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : []) : item))
			return { ...state, cart: updatedCart }
		}
		case 'TOGGLE_CART':
			return { ...state, isCartVisible: !state.isCartVisible }
		case 'TOGGLE_SEARCH':
			return { ...state, isSearchVisible: !state.isSearchVisible }
		case 'SET_FILTER':
			const { key, value } = action.payload as { key: string; value: string }
			return { ...state, filters: { ...state.filters, [key]: value } }
		case 'SET_CURRENCY':
			return { ...state, currency: action.payload as string }
		case 'UPDATE_PRODUCTS':
			return { ...state, data: action.payload }
		case 'SET_LANGUAGE':
			return { ...state, language: action.payload as string }
		case 'RESET_FILTERS':
			return { ...state, filters: {} }
		default:
			return state
	}
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		const savedCart = localStorage.getItem('cart')
		if (savedCart) {
			dispatch({ type: 'SET_STATE', payload: { cart: JSON.parse(savedCart) } })
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(state.cart))
	}, [state.cart])

	return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
	const context = useContext(AppContext)
	if (context === undefined) {
		throw new Error('useAppContext must be used within a AppProvider')
	}
	return context
}
