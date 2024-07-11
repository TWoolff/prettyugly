'use client'
import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'

type CheckoutProps = {
    amount: number,
    cartItems: any[]
}

const Checkout: React.FC<CheckoutProps> = ({ amount, cartItems }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState<string | null | undefined>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)

        if (!stripe || !elements) {
            setLoading(false)
            return
        }

        const { error: submitError } = await elements.submit()

        if (submitError) {
            setError(submitError.message)
            setLoading(false)
            return
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success`,
            },
        })

        if (error) {
            setError(error.message)
        }
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            {error && <p>{error}</p>}
            <button disabled={loading} type="submit">
                {loading ? 'Processing...' : `Pay ${amount / 100} kr.`}
            </button>
        </form>
    )
}

export default Checkout
