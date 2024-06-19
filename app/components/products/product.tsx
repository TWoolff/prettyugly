'use client'
import { useAppContext } from '../../context'
import { ProductType } from '../../page'
import Button from '../button/button'
import css from './product.module.css'

const Product: React.FC<ProductType> = (data) => {
    const { dispatch } = useAppContext()
    const { unit_amount} = data.data
    const { name, description, id, metadata, images } = data.data.product

    console.log(data)

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
            <img src={images[0]} alt={name} className={css.mainImg} />
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{unit_amount/100},00 kr.</p>
            <Button onClick={handleAddToCart} title='Add to Cart' className={css.btn}/>
        </div>
    )
}

export default Product