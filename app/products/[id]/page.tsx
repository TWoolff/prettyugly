import { use } from 'react'
import { getProductById } from '@/app/utils/getProducts'

const ProductDetail = ({ params }: { params: { id: string } }) => {
    const product = use(getProductById(params.id))

    if (!product) {
        return <p>Loading...</p>
    }

    return (
        <section>
            <h1>{product.product.name}</h1>
            <img src={product.product.images[0]} alt={product.product.name} />
            <p>{product.product.description}</p>
            <p>{product.unit_amount / 100},00 kr.</p>
            {/* Display other product details here */}
        </section>
    )
}

export default ProductDetail
