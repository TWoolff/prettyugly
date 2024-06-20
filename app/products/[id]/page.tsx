'use client'
import { useEffect, useState } from 'react'
import { getProductById } from '../../utils/getProducts'
import css from './productdetail.module.css'

const ProductDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            const result = await getProductById(params.id)
            //@ts-ignore
            setProduct(result)
        }
        
        fetchProduct()
    }, [])
    
    if (!product) {
        return <p>Loading...</p>
    }

    const {unit_amount, product: {name, images, description}} = product || {}

    return (
        <section className={css.productDetail}>
            <h1>{name}</h1>
            <img src={images[0]} alt={name} />
            <p>{description}</p>
            <p>{unit_amount / 100},00 kr.</p>
        </section>
    )
}

export default ProductDetail
