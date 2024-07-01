// app/products/[slug]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getProductBySlug } from '@/app/utils/getProducts'
import { useAppContext } from '@/app/context'
import Button from '@/app/components/formelements/button'
import css from './productdetail.module.css'

const ProductDetail: React.FC<{ params: { slug: string } }> = ({ params }) => {
    const [product, setProduct] = useState(null)
    const { dispatch } = useAppContext()

    useEffect(() => {
        const fetchProduct = async () => {
            const result = await getProductBySlug(params.slug)
            // @ts-ignore
            setProduct(result)
        }
        
        fetchProduct()
    }, [params.slug])
    
    if (!product) {
        return <p>Loading...</p>
    }

    const {unit_amount, product: {id, slug, name, images, description, metadata}} = product || {}

    const handleAddToCart = () => { 
        const newItem = {
            quantity: 1,
            id,
            slug,
            name,
            unit_amount,
            metadata,
            images
        }
        dispatch({ type: 'ADD_TO_CART', payload: newItem })
    }

    const saveProduct = () => {
        dispatch({ type: 'SAVE_PRODUCT', payload: { id } })
    }

    return (
        <section className={css.productDetail}>
            <h1>{name}</h1>
            <Image 
                src={images[0]} 
                alt={name}
                width={700} 
                height={700} 
                quality={90} 
                className={css.mainImg}
            />
            <p>{description}</p>
            <p>{unit_amount / 100},00 kr.</p>
            <Button onClick={saveProduct} title='Save Product' className={css.btn}/>
            <Button onClick={handleAddToCart} title='Add to Cart' className={css.btn}/>
        </section>
    )
}

export default ProductDetail
