import { NextRequest, NextResponse } from 'next/server'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(request: NextRequest) {
    try {
        const { amount, cartItems, comment } = await request.json()

        const lineItems = cartItems.map((item: { name: string; quantity: number }) => ({
            name: item.name,
            quantity: item.quantity
        }))

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "dkk",
            automatic_payment_methods: { enabled: true },
            metadata: {
                cartItems: JSON.stringify(lineItems),
				comment: comment
            }
        })

        return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
        console.error("Internal Error:", error)
        return NextResponse.json(
            { error: `Internal Server Error: ${(error as Error).message}` },
            { status: 500 }
        )
    }
}
