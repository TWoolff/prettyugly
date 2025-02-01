"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import type {
	State,
	Action,
	CartItem,
	AppContextType,
	Customer,
	DataState,
} from "./types";
import { getExchangeRate } from "./utils/getExchangeRate";

const loadInitialState = (): State => {
	const savedCart =
		typeof window !== "undefined" ? localStorage.getItem("cart") : null;
	const savedProducts =
		typeof window !== "undefined"
			? localStorage.getItem("savedProducts")
			: null;

	return {
		error: null,
		data: null,
		allProducts: [],
		hasLoaded: false,
		cart: savedCart ? JSON.parse(savedCart) : [],
		saved: savedProducts ? JSON.parse(savedProducts) : [],
		isCartVisible: false,
		isSearchVisible: false,
		customer: null,
		filters: {},
		currency: "DKK",
		exchangeRate: null,
		language: "da-DK",
	};
};

const initialState: State = loadInitialState();

const AppContext = createContext<AppContextType | undefined>(undefined);

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_STATE":
			return { ...state, ...(action.payload as Partial<State>) };
		case "RESET_STATE":
			return initialState;
		case "SET_CUSTOMER":
			return { ...state, customer: action.payload as Customer | null };
		case "ADD_TO_CART": {
			const item = action.payload as CartItem;
			const cartItem = {
				...item,
				unit_amount: item.price || 0,
				quantity: 1,
			};
			return {
				...state,
				cart: [...state.cart, cartItem],
			};
		}
		case "CLEAR_CART":
			localStorage.removeItem("cart");
			return { ...state, cart: [] };
		case "SAVE_PRODUCT": {
			const newItem = action.payload as CartItem;
			const existingItemIndex = state.saved.findIndex(
				(item) => item.id === newItem.id,
			);
			// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
			let updatedSaved;
			if (existingItemIndex >= 0) {
				updatedSaved = state.saved.filter((item) => item.id !== newItem.id);
			} else {
				updatedSaved = [...state.saved, newItem];
			}
			localStorage.setItem("savedProducts", JSON.stringify(updatedSaved));
			return { ...state, saved: updatedSaved };
		}
		case "INCREMENT_QUANTITY": {
			const { id } = action.payload as { id: string };
			const updatedCart = state.cart.map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
			);
			return { ...state, cart: updatedCart };
		}
		case "DECREMENT_QUANTITY": {
			const { id } = action.payload as { id: string };
			const updatedCart = state.cart.flatMap((item) =>
				item.id === id
					? item.quantity > 1
						? { ...item, quantity: item.quantity - 1 }
						: []
					: item,
			);
			return { ...state, cart: updatedCart };
		}
		case "TOGGLE_CART":
			return { ...state, isCartVisible: !state.isCartVisible };
		case "TOGGLE_SEARCH":
			return { ...state, isSearchVisible: !state.isSearchVisible };
		case "SET_FILTER": {
			const { key, value } = action.payload as { key: string; value: string };
			return { ...state, filters: { ...state.filters, [key]: value } };
		}
		case "SET_CURRENCY":
			return { ...state, currency: action.payload as string };
		case "UPDATE_PRODUCTS":
			return {
				...state,
				data: action.payload as DataState,
				allProducts: (action.payload as DataState) ?? [],
			};
		case "SET_LANGUAGE":
			return { ...state, language: action.payload as string };
		case "RESET_FILTERS":
			return {
				...state,
				filters: {
					category: state.filters.category || "",
					color: state.filters.color || "",
					featured: "",
				},
			};
		case "UPDATE_CART":
			return { ...state, cart: action.payload as CartItem[] };
		default:
			return state;
	}
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const savedCart = localStorage.getItem("cart");
		if (savedCart) {
			dispatch({ type: "SET_STATE", payload: { cart: JSON.parse(savedCart) } });
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(state.cart));
	}, [state.cart]);

	useEffect(() => {
		const fetchExchangeRates = async () => {
			try {
				const rates = await getExchangeRate("DKK");
				dispatch({
					type: "SET_STATE",
					payload: {
						exchangeRate: {
							EUR: rates.EUR,
							SEK: rates.SEK,
						},
					},
				});
			} catch (error) {
				console.error("Error fetching exchange rates:", error);
			}
		};

		fetchExchangeRates();
	}, []);

	console.log(state);

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useAppContext must be used within a AppProvider");
	}
	return context;
};
