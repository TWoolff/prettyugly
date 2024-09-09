import { NextRequest, NextResponse } from 'next/server'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(request: NextRequest) {
    try {
        const { promoCode } = await request.json()
        const promotionCodes = await stripe.promotionCodes.list({
            code: promoCode,
            active: true,
            limit: 1 
        })

        if (promotionCodes.data.length === 0) {
            return NextResponse.json({ valid: false, message: 'Promo code does not exist' }, { status: 404 })
        }

        const coupon = promotionCodes.data[0].coupon
        const discountAmount = coupon.percent_off ? coupon.percent_off : coupon.amount_off

        return NextResponse.json({ valid: true, discountAmount, message: 'Promo code applied successfully' })
    } catch (error) {
        console.error("Error checking promo code:", error)
        return NextResponse.json(
            { error: `Internal Server Error: ${(error as Error).message}` },
            { status: 500 }
        )
    }
}