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

export const getCustomer = async (email: string, password: string ) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string ?? '', {apiVersion: '2024-04-10'})
    const customers = await stripe.customers.list({});
    const customer = customers.data = customers.data.filter((customer: any) => (customer as any).email === email);
    const customerPassword = customer[0].metadata.password;
    if (customerPassword === password) {
        return customer;
    } else {
        return null;
    }
}
