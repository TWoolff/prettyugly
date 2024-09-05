'use client'
import { useEffect, useState } from 'react'
import { getPage } from './utils/contentful'
import { getProducts } from './utils/getProducts'
import { useAppContext } from './context'
import Featured from './components/featured/featured'
import Ticker from './components/ticker/ticker'
import Loader from './components/loader/loader'
import CookieConsent from './components/cookieconsent/cookieconsent'
import Carousel from './components/carousel/carousel'
import BigText from './components/bigtext/bigtext'
import css from './Home.module.css'

const Home: React.FC =  () => {
    const { state, dispatch } = useAppContext()
    const [homeData, setHomeData] = useState<any>(null)
    const [bigTextInView, setBigTextInView] = useState(false);

    useEffect(() => {
        if (homeData) return
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
        if (state.data) return
        const fetchData = async () => {
            const data = await getProducts()
            if (data) {
                dispatch({ type: 'SET_STATE', payload: { data } })
            }
        }
        fetchData()
    }, [])

    if (!homeData) return <Loader />

    const bigTextClassName = bigTextInView ? 'bigTextInView' : '';

    return (
        <section className={`home ${bigTextClassName}`}>
            {homeData?.features[0].fields && <Featured data={homeData.features[0].fields} />}
            {homeData?.carousel && <Carousel data={homeData.carousel} />}
            {homeData?.bigText && <BigText text={homeData.bigText} onInViewChange={setBigTextInView} className={bigTextClassName} />}
            {homeData?.newsTicker && <Ticker data={homeData.newsTicker} />}
            <CookieConsent />
        </section>
    )
}

export default Home
