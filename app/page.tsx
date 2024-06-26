'use client'
import Hero from './components/hero/hero'
import Featured from './components/featured/featured'
import Products from './components/products/products'

const Home: React.FC = () => {
    return (
        <section>
            <Hero />
            <Featured />
            <Products />
        </section>
    )
}

export default Home
