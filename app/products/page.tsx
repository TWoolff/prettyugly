'use client'
import { useEffect } from 'react'
import Products from '../components/products/products'
import { useAppContext } from '../context'

const ProductsPage: React.FC = () => {
    const { state, dispatch } = useAppContext()

    useEffect(() => {
        dispatch({ type: 'SET_FILTER', payload: { key: 'featured', value: '' } })
    }, [])

    console.log(state)

    return ( 
        <section>
            <Products />
        </section>
    )
}

export default ProductsPage