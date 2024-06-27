'use client'
import { useEffect, useState } from 'react'
import { getPage } from './utils/contentful'
import Hero from './components/hero/hero'
import Featured from './components/featured/featured'
import Products from './components/products/products'


const Home: React.FC =  () => {
    const [homeData, setHomeData] = useState<any>(null)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPage('/')
                setHomeData(JSON.parse(JSON.stringify(data.items[0].fields)))
            } catch (error) {
                console.error('Error fetching home data:', error)
            }
        }
        
        fetchData()
    }, [])

    if (!homeData) {
        return <div>Loading...</div>
    }
    
    const { title } = homeData

    return (
        <section>
            <Hero />
            <Featured data={homeData.features[0].fields} />
            <Products />
        </section>
    )
}

export default Home
