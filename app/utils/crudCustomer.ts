'use server'
import { Stripe } from 'stripe';

type Customer = {
    id: string
    email: string
    name: string | null
    phone: string | null
    address: {
        city: string
        country: string
        line1: string
        line2: string | null
        postal_code: string
    } | null
} | null

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string ?? '', {apiVersion: '2024-04-10'})

export const getCustomer = async (email: string, password: string): Promise<Customer> => {
    const customers = await stripe.customers.list({});
    const customer = customers.data.find((customer) => customer.email === email);

    if (customer && customer.metadata.password === password) {
        return {
            id: customer.id,
            email: customer.email || '',
            name: customer.name || '',
            phone: customer.phone || '',
            address: {
                city: customer.address?.city ?? '',
                country: customer.address?.country ?? '',
                line1: customer.address?.line1 ?? '',
                line2: customer.address?.line2 ?? null,
                postal_code: customer.address?.postal_code ?? '',
            } || null,
        };
    } else {
        return null;
    }
}

export const createCustomer = async (email: string, password: string ) => {    
    const customer = await stripe.customers.create({
        email: email,
        metadata: {password: password}
    });

    return customer;
}

export const updateCustomer = async (email: string, id: string, name: string, phone: string, address: any) => {
    const customer = await stripe.customers.update(id, {
        email: email,
        name: name,
        phone: phone,
        address: {
            line1: address.line1,
            line2: address.line2,
            postal_code: address.postal_code,
            city: address.city,
            country: address.country,
        }
    });

    return customer;
}

export const deleteCustomer = async (id: string) => {
    try {
        await stripe.customers.del(id);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
