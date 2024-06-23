'use client'
import Link from 'next/link'
import { useAppContext } from '../../context'
import { ProductType } from '../../page'
import Button from '../formelements/button'
import css from './product.module.css'

const Product: React.FC<ProductType> = (data) => {
    const { dispatch } = useAppContext()
    const { unit_amount, id } = data.data
    const { name, description, metadata, images } = data.data.product

    const handleAddToCart = () => { 
        const newItem = {
            quantity: 1,
            id,
            name,
            unit_amount,
            metadata
        }
        dispatch({ type: 'ADD_TO_CART', payload: newItem })
    }

    return ( 
        <div className={css.product}>
            <Link key={id} href={`/products/${id}`}>
                <img src={images[0]} alt={name} className={css.mainImg} />
            </Link>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{unit_amount/100},00 kr.</p>
            <Button onClick={handleAddToCart} title='Add to Cart' className={css.btn}/>
        </div>
    )
}

export default Product