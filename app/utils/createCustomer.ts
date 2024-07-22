'use server'
import { Stripe } from 'stripe';

export type Customer = {
    id: string
    email: string
    name: string
    phone: string
    address: string
    metadata: {
        [key: string]: string
    }
}[] | null

export const createCustomer = async (email: string, password: string ) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string ?? '', {apiVersion: '2024-04-10'})
    
    const customer = await stripe.customers.create({
        email: email,
        metadata: {password: password}
    });

    return customer;
}
