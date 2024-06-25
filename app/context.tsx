'use client'
import { createContext, useContext, ReactNode, useReducer, Dispatch } from 'react'

export type ProductType = {
    data: {
        id: string
        unit_amount: number
        product: {
            active: boolean
            created: number
            default_price: string
            images: string[]
            marketing_features: string[]
            metadata: {
                [key: string]: string
            }
            id: string
            name: string
            description: string
            productInfo: string
        }
    }
}

export type DataState = {
    data?: ProductType[]
} | null | undefined | any

export type CartItem = {
    id: string;
    name: string
    unit_amount: number
    quantity: number
    metadata: { [key: string]: string }
    images: string[]
}

type ErrorState = string | null

type State = {
    loadingState: string | null
    error: ErrorState | null
    data: DataState | null
    cart: CartItem[]
    saved: CartItem[]
    isCartVisible: boolean
    isSearchVisible: boolean
    filters: { [key: string]: string }
}

type Action = {
    type: 'SET_STATE' | 'RESET_STATE' | 'ADD_TO_CART' | 'INCREMENT_QUANTITY' | 'DECREMENT_QUANTITY' | 'TOGGLE_CART' | 'TOGGLE_SEARCH' | 'SET_FILTER' | 'SAVE_PRODUCT'
    payload?: Partial<State> | CartItem | { id: string } | { key: string, value: string }
}

const initialState: State = {
    loadingState: null,
    error: null,
    data: null,
    cart: [],
    saved: [],
    isCartVisible: false,
    isSearchVisible: false,
    filters: {}
}

interface AppContextType {
    state: State
    dispatch: Dispatch<Action>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_STATE':
            return { ...state, ...action.payload }
        case 'RESET_STATE':
            return initialState
        case 'ADD_TO_CART': {
            const newItem = action.payload as CartItem
            const existingItemIndex = state.cart.findIndex(item => item.id === newItem.id)
            if (existingItemIndex >= 0) {
                const updatedCart = state.cart.map((item, index) =>
                    index === existingItemIndex ? { ...item, quantity: item.quantity + newItem.quantity } : item
                )
                return { ...state, cart: updatedCart, isCartVisible: true }
            } else {
                return { ...state, cart: [...state.cart, newItem], isCartVisible: true }
            }
        }
        case 'SAVE_PRODUCT': {
            const newItem = action.payload as CartItem
            const existingItemIndex = state.saved.findIndex(item => item.id === newItem.id)
            let updatedSaved;
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
            const updatedCart = state.cart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
            return { ...state, cart: updatedCart }
        }
        case 'DECREMENT_QUANTITY': {
            const { id } = action.payload as { id: string };
            const updatedCart = state.cart.flatMap(item =>
                item.id === id ? item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : [] : item
            )
            return { ...state, cart: updatedCart }
        }
        case 'TOGGLE_CART':
            return { ...state, isCartVisible: !state.isCartVisible }
        case 'TOGGLE_SEARCH':
            return { ...state, isSearchVisible: !state.isSearchVisible }
        case 'SET_FILTER':
            const { key, value } = action.payload as { key: string; value: string }
            return { ...state, filters: { ...state.filters, [key]: value } }
        default:
            return state
    }
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider')
    }
    return context
}
