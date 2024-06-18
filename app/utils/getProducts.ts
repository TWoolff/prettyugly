'use server'
import Stripe from 'stripe'

export async function getProducts() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string ?? '', {apiVersion: '2024-04-10'})
    const res = await stripe.prices.list({
        expand: ['data.product']
    })
    const prices = res.data
    return prices
}