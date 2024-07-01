// app/utils/getProducts.ts
'use server'
import Stripe from 'stripe'
import { slugify } from './slugify'

export async function getProducts() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string ?? '', {apiVersion: '2024-04-10'})
    const res = await stripe.prices.list({
        expand: ['data.product']
    })
    const prices = res.data.map(price => ({
        ...price,
        //@ts-ignore
        slug: slugify(price.product.name)
    }))
    return prices
}

export const getProductById = async (id: string) => {
    const products = await getProducts()
    return products.find((product: any) => product.id === id) || null
}

export const getProductBySlug = async (slug: string) => {
    const products = await getProducts()
    return products.find((product: any) => product.slug === slug) || null
}
