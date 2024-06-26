'use client'
import { useEffect, useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'

type CheckoutProps = {
    amount: number
}

const Checkout: React.FC<CheckoutProps> = ({amount}) => {
    const stripe = useStripe()
    const elements = useElements()
    const [clientSecret, setClientSecret] = useState('')
    const [error, setError] = useState<string | null | undefined>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
    }, [amount])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)

        if (!stripe || !elements) {
            return
        }

        const {error: submitError} = await elements.submit()

        if (submitError) {
            setError(submitError.message)
            setLoading(false)
            return
        }

        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://www.localhost:3000/success?amount=${amount}`,
            },
        })

        if (error) {
            setError(error.message)
        }
        setLoading(false)
    }

    if (!clientSecret || !stripe || !elements) {
        return <p>Loading...</p>
    }

    return ( 
        <form onSubmit={handleSubmit}>
            {clientSecret && <PaymentElement />}
            {error && <p>{error}</p>}
            <button disabled={loading}>{loading ? 'Processing...' : `Pay ${amount/100} kr.`}</button>
        </form>
    )
}

export default Checkout