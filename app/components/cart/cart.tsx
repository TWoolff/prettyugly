"use client";
import { useEffect, useRef, useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { Elements, AddressElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import { useChangeCurrency } from "@/app/utils/useChangeCurrency";
import { calculateTotalQuantity } from "@/app/utils/getQuantity";
import { useAppContext } from "@/app/context";
import type { CartItem } from "@/app/types";
import Button from "../formelements/button";
import Checkout from "../checkout/checkout";
import css from "./cart.module.css";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
	throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Cart: React.FC = () => {
	const { state, dispatch } = useAppContext();
	const { cart, isCartVisible } = state;
	const cartRef = useRef<HTMLDivElement>(null);
	const [promoCode, setPromoCode] = useState<string>("");
	const [promoDiscountPercentage, setPromoDiscountPercentage] =
		useState<number>(0);
	const [error, setError] = useState<string | null>(null);
	const { getExchangeRate } = useChangeCurrency();

	const handleIncrementQuantity = useCallback(
		(id: string) => {
			dispatch({ type: "INCREMENT_QUANTITY", payload: { id } });
		},
		[dispatch],
	);

	const handleDecrementQuantity = useCallback(
		(id: string) => {
			dispatch({ type: "DECREMENT_QUANTITY", payload: { id } });
		},
		[dispatch],
	);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
				dispatch({ type: "TOGGLE_CART" });
			}
		},
		[dispatch],
	);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleClickOutside]);

	const shippingCost = 0;

	const getConvertedPrice = (amount: number) => {
		const rate = getExchangeRate(state.currency as "DKK" | "EUR" | "SEK");
		return Math.round(amount * rate);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const totalPrice = useMemo(() => {
		return cart.reduce((total, item) => {
			const itemPrice = item.price || item.unit_amount;
			return total + getConvertedPrice(itemPrice) * item.quantity;
		}, 0);
	}, [cart, state.currency]);
	const totalQuantity = useMemo(() => calculateTotalQuantity(cart), [cart]);

	// Apply the promo discount as a percentage
	const discountedPrice = totalPrice * (1 - promoDiscountPercentage / 100);
	const totalPriceWithShipping = Math.round(discountedPrice + shippingCost);

	const handleApplyPromoCode = async () => {
		setError(null);
		try {
			const response = await fetch("/api/apply-promo-code", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ promoCode }),
			});

			const data = await response.json();

			if (response.status === 404) {
				setError("Promo code does not exist");
			} else if (data.valid) {
				setPromoDiscountPercentage(data.discountAmount); // Set the percentage discount (e.g., 20 for 20%)
				setError("");
			} else {
				setError("Invalid promo code");
			}
		} catch (err) {
			setError("Failed to apply promo code");
		}
	};

	const variants = {
		hidden: { opacity: 0, x: "100%" },
		visible: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: "100%" },
	};

	const getItemPrice = (item: CartItem) => {
		const originalPrice = item.price || item.unit_amount;
		return (getConvertedPrice(originalPrice) / 100).toFixed(2);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (cart.length > 0) {
			const updatedCart = cart.map((item) => ({
				...item,
				currency: state.currency,
			}));
			dispatch({ type: "UPDATE_CART", payload: updatedCart });
		}
	}, [state.currency]);

	return (
		<AnimatePresence>
			{isCartVisible && (
				<div className={css.cartContainer}>
					<motion.section
						ref={cartRef}
						className={css.cart}
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={variants}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
					>
						<Button
							onClick={() => dispatch({ type: "TOGGLE_CART" })}
							title="Close"
							className={css.btnClose}
						/>
						<h2>Cart</h2>
						<ul>
							{cart.map((item, i: number) => (
								<li key={item.id}>
									<p>{item.name}</p>
									<Image
										src={item.images[0]}
										alt={item.name}
										width={160}
										height={160}
										quality={90}
									/>
									<p>
										{getItemPrice(item)} {state.currency}
									</p>
									<p>{item.quantity}</p>
									<Button
										onClick={() => handleDecrementQuantity(item.id)}
										title="-"
										className={css.btnSmall}
									/>
									<Button
										onClick={() => handleIncrementQuantity(item.id)}
										title="+"
										className={css.btnSmall}
									/>
								</li>
							))}
						</ul>
						{totalQuantity > 0 ? (
							<>
								<h4>
									Packaging & Shipping: {shippingCost} {state.currency}
								</h4>
								<h3>
									Total: {(totalPriceWithShipping / 100).toFixed(2)}{" "}
									{state.currency}
								</h3>
							</>
						) : (
							<p>Your cart is empty</p>
						)}

						{totalQuantity > 0 && (
							<>
								<div className={css.promoCodeContainer}>
									<input
										type="text"
										value={promoCode}
										onChange={(e) => setPromoCode(e.target.value)}
										placeholder="Enter promo code"
										className={css.promoCodeInput}
									/>
									<Button
										onClick={handleApplyPromoCode}
										title="Apply Promo Code"
									/>
								</div>
								{promoDiscountPercentage > 0 && (
									<p>Discount applied: {promoDiscountPercentage}%</p>
								)}
							</>
						)}

						{totalQuantity > 0 && (
							<Elements
								stripe={stripePromise}
								options={{
									mode: "payment",
									amount: totalPriceWithShipping,
									currency: state.currency?.toLowerCase() || "dkk",
									locale: "en-GB",
								}}
							>
								<AddressElement options={{ mode: "shipping" }} />
								<Checkout
									amount={Number((totalPriceWithShipping / 100).toFixed(2))}
									currency={state.currency?.toLowerCase() || "dkk"}
									cartItems={cart}
								/>
							</Elements>
						)}
						{error && <p className={css.error}>{error}</p>}
					</motion.section>
				</div>
			)}
		</AnimatePresence>
	);
};

export default Cart;
