'use client'
import { useEffect, useState } from 'react'
import { getProductById } from '@/app//utils/getProducts'
import { useAppContext } from '@/app/context'
import Button from '@/app/components/formelements/button'
import css from './productdetail.module.css'

const ProductDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
    const [product, setProduct] = useState(null)
    const { dispatch } = useAppContext()

    const saveProduct = () => {
        dispatch({ type: 'SAVE_PRODUCT', payload: { id: params.id } })
    }

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
            <Button onClick={saveProduct} title='Save Product' className={css.btn}/>
        </section>
    )
}

export default ProductDetail
