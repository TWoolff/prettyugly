'use client'
import Hero from './components/hero/hero'
import Products from './components/products/products'

export type ProductType = {
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

const Home: React.FC = () => {
    return (
        <section>
            <h1>Front Page</h1>
            <Hero />
            <Products />
        </section>
    )
}

export default Home
