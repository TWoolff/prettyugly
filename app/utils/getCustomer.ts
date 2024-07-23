'use server'
import { Stripe } from 'stripe';

export type Customer = {
    id: string
    email: string
    name: string | null
    phone: string | null
    address: string | null
} | null

export const getCustomer = async (email: string, password: string): Promise<Customer> => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string ?? '', {apiVersion: '2024-04-10'})
    const customers = await stripe.customers.list({});
    const customer = customers.data.find((customer) => customer.email === email);

    console.log('customer', customer);

    if (customer && customer.metadata.password === password) {
        return {
            id: customer.id,
            email: customer.email || '',
            name: customer.name || '',
            phone: customer.phone || '',
            address: customer.address ? `${customer.address.line1}, ${customer.address.postal_code} ${customer.address.city}, ${customer.address.country}` : '',
        };
    } else {
        return null;
    }
}
