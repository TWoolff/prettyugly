'use client'
import { useEffect, useState } from 'react'
import { getPage } from './utils/contentful'
import Hero from './components/hero/hero'
import Featured from './components/featured/featured'
import Ticker from './components/ticker/ticker'
import { getProducts } from './utils/getProducts'
import { useAppContext } from './context'
import Loader from './components/loader/loader'
import CookieConsent from './components/cookieconsent/cookieconsent'
import Carousel from './components/carousel/carousel'

const Home: React.FC =  () => {
    const { dispatch } = useAppContext()
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

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts()
            if (data) {
                dispatch({ type: 'SET_STATE', payload: { data } })
            }
        }
        fetchData()
    }, [])

    if (!homeData) {
        return <Loader />
    }

    return (
        <section>
            {homeData?.newsTicker && <Ticker data={homeData.newsTicker} />}
            <Hero />
            <Carousel />
            {homeData?.features[0].fields && <Featured data={homeData.features[0].fields} />}
            <CookieConsent />
        </section>
    )
}

export default Home
