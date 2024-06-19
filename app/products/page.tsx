'use client'
import Products from '../components/products/products'
import { useAppContext } from '../context'

const ProductsPage = () => {
    const { state, dispatch } = useAppContext()
    console.log(state)
    return ( 
        <section>
            <h1>Products</h1>
            <Products />
        </section>
    )
}

export default ProductsPage