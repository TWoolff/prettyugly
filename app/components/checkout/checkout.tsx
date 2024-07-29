'use client'
import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import Input from '../formelements/input'
import Button from '../formelements/button'
import TextArea from '../formelements/textarea'
import { CartItem } from '@/app/types'

type CheckoutProps = {
    currency: string,
    amount: number,
    cartItems: CartItem[]
}

const Checkout: React.FC<CheckoutProps> = ({ currency, amount, cartItems }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [comment, setComment] = useState('')
    const [error, setError] = useState<string | null | undefined>(null)
    const [loading, setLoading] = useState(false)

    console.log(currency)

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value)
    }

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)

        if (!stripe || !elements) {
            setLoading(false)
            return
        }

        try {
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currency: currency, amount: amount, cartItems: cartItems, comment: comment }),
            })

            const data = await response.json()

            if (!data.clientSecret) {
                throw new Error('Failed to get client secret')
            }

            const { error: submitError } = await elements.submit()

            if (submitError) {
                setError(submitError.message)
                setLoading(false)
                return
            }

            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret: data.clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/success?amount=${amount * 100}`,
                    payment_method_data: {
                        billing_details: {
                            email: email,
                            phone: phone
                        }
                    }
                },
            })

            if (error) {
                setError(error.message)
            }
        } catch (error: any) {
            setError(error.message)
        }

        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input 
                type='email'
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required 
                id='email' 
                name='email'  
                label='Email address'
            />
            <Input 
                type='tel'
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Enter your phone number"
                required 
                id='phone' 
                name='phone'  
                label='Phone number'
            />
            <TextArea 
                value={comment}
                onChange={handleCommentChange}
                placeholder="Enter your comment"
                id='comment'
                label='Comment'
            />
            <PaymentElement />
            {error && <p>{error}</p>}
            {currency === 'ddk' && <Button disabled={loading} type="submit" title={loading ? 'Processing...' : `Pay ${amount} kr`} />}
            {currency === 'eur' && <Button disabled={loading} type="submit" title={loading ? 'Processing...' : `Pay €${amount}`} />}
        </form>
    )
}

export default Checkout
