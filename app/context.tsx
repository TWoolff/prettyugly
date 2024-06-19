'use client'
import { createContext, useContext, ReactNode, useReducer, Dispatch } from 'react'

type Product = {
    id: string;
    name: string;
    description: string;
    metadata: {
      [key: string]: string;
    };
    // other product fields
  };
  
  type DataState = {
    products: Product[]; 
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
    isCartVisible: boolean
    filters: { [key: string]: string }
}

type Action = {
    type: 'SET_STATE' | 'RESET_STATE' | 'ADD_TO_CART' | 'REMOVE_FROM_CART' | 'TOGGLE_CART' | 'SET_FILTER'
    payload?: Partial<State> | CartItem | { id: string } | { key: string, value: string }
}

const initialState: State = {
    loadingState: null,
    error: null,
    data: null,
    cart: [],
    isCartVisible: false,
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
        case 'ADD_TO_CART':
            const newItem = action.payload as CartItem;
            return { ...state, cart: [...state.cart, newItem] }
        case 'REMOVE_FROM_CART':
            const { id } = action.payload as { id: string };
            return { ...state, cart: state.cart.filter(item => item.id !== id) }
        case 'TOGGLE_CART':
            return { ...state, isCartVisible: !state.isCartVisible }
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

export function useAppContext() {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider')
    }
    return context
}
