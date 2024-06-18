'use client'
import { createContext, useContext, ReactNode, useReducer, Dispatch } from 'react'

type DataState = {
    
} | null

type CartItem = {
    id: string;
    name: string;
    unit_amount: number;
    quantity: number;
}

type ErrorState = string | null

type State = {
    loadingState: string | null
    error: ErrorState | null
    data: DataState | null
    cart: CartItem[]
    isCartVisible: boolean;
}

type Action = {
    type: 'SET_STATE' | 'RESET_STATE' | 'ADD_TO_CART' | 'REMOVE_FROM_CART' | 'TOGGLE_CART'
    payload?: Partial<State> | CartItem
}

const initialState: State = {
    loadingState: null,
    error: null,
    data: null,
    cart: [],
    isCartVisible: false
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
        case 'ADD_TO_CART':
            const newItem = action.payload as CartItem;
            return { ...state, cart: [...state.cart, newItem] }
        case 'REMOVE_FROM_CART':
            const { id } = action.payload as { id: string };
            return { ...state, cart: state.cart.filter(item => item.id !== id) }
        case 'TOGGLE_CART':
            return { ...state, isCartVisible: !state.isCartVisible }
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

export function useAppContext() {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider')
    }
    return context
}
