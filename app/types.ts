import { Dispatch } from 'react'

export type AppContextType = {
	state: State
	dispatch: Dispatch<Action>
}

export type Action = {
	type:
		| 'SET_STATE'
		| 'RESET_STATE'
		| 'SET_CUSTOMER'
		| 'ADD_TO_CART'
		| 'CLEAR_CART'
		| 'INCREMENT_QUANTITY'
		| 'DECREMENT_QUANTITY'
		| 'TOGGLE_CART'
		| 'TOGGLE_SEARCH'
		| 'SET_FILTER'
		| 'SAVE_PRODUCT'
		| 'SET_CURRENCY'
		| 'UPDATE_PRODUCTS'
		| 'SET_LANGUAGE'
		| 'RESET_FILTERS'
	payload?: Partial<State> | CartItem | { id: string } | { key: string; value: string } | string | Customer | null
}

export type ProductType = {
	data: {
		id: string
		slug?: string
		unit_amount: number
		currency: string
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

export type DataState =
	| {
			data?: ProductType[]
    }
	| null
	| undefined
	| any

export type CartItem = {
	id: string
	name: string
	unit_amount: number
	quantity: number
	metadata: { [key: string]: string }
	images: string[]
}

export type ErrorState = string | null

export type State = {
	error: ErrorState | null
	data: DataState | null
	hasLoaded: boolean
	cart: CartItem[]
	saved: CartItem[]
	isCartVisible: boolean
	isSearchVisible: boolean
	customer: Customer | null
	filters: { [key: string]: string }
	currency: string
	exchangeRate: { EUR: string; SEK: string } | null
	language: string
}

export type Customer = {
	id: string
	address: {
		city: string
		country: string
		line1: string
		line2: string | null
		postal_code: string
	} | null
	email: string
	name: string
	phone: string | null
}

export type Product = {
	id: string
	object: any
	active: boolean
	attributes: string[]
	created: number
	default_price: string
	description: string | null
	images: string[]
	livemode: boolean
	marketing_features: string[]
	metadata: { [key: string]: string }
	name: string
	package_dimensions: string | null
	shippable: boolean | null
	statement_descriptor: string | null
	tax_code: string | null
	type: string
	unit_label: string | null
	updated: number
	url: string | null
	slug: string
	currency: string
}

export type Price = {
	id: string
	object: any
	active: boolean
	billing_scheme: string
	created: number
	currency: string
	custom_unit_amount: string | null
	livemode: boolean
	lookup_key: string | null
	metadata: { [key: string]: string }
	nickname: string | null
	product: Product
	recurring: string | null
	tax_behavior: string
	tiers_mode: string | null
	transform_quantity: string | null
	type: string
	unit_amount: number
	unit_amount_decimal: string
	slug: string
}
