'use client'

import { useAppContext } from "@/app/context"

type ProductType = {
    data: {
        id: string
        unit_amount: number
        product: {
            active: boolean
            created: number
            default_price: string
            images: string[]
            marketing_features: string[]
            metadata: {
                [key: string]: string
            }
            id: string
            name: string
            description: string
            productInfo: string
        }
    }
}


const Product = (data: ProductType) => {
    const { dispatch } = useAppContext();
    const { unit_amount} = data.data
    const { name, description, productInfo, id } = data.data.product

    const handleAddToCart = () => { 
        const newItem = {
            quantity: 1,
            id,
            name,
            unit_amount
        }
        
        dispatch({ type: "ADD_TO_CART", payload: newItem });
    }

    return ( 
        <div>
            <h2>{name}</h2>
            <p>{description} </p>
            <p>{unit_amount/100},00 kr.</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    )
}

export default Product