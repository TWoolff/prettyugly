'use client'
import { useEffect, useState } from 'react'
import { getPage } from './utils/contentful'
import { getProducts } from './utils/getProducts'
import { useAppContext } from './context'
import { TransitionLink } from './utils/transitionLinks'
import Featured from './components/featured/featured'
import Ticker from './components/ticker/ticker'
import CookieConsent from './components/cookieconsent/cookieconsent'
import Carousel from './components/carousel/carousel'
import { serializeData } from './utils/serializeData'
import ImageText from './components/imagetext/imagetext'
import Club from './components/club/club'
import { HeartIcon } from './components/icons/icons'
import Tights from './components/imagetext/tights'


const Home: React.FC = () => {
	const { state, dispatch } = useAppContext()
	const [homeData, setHomeData] = useState<any>(null)

	useEffect(() => {
		if (homeData) return
		const fetchData = async () => {
			try {
				const data = await getPage('/')
				if (data.items?.[0].fields) {
					setHomeData(serializeData(data.items[0].fields))
				}
			} catch (error) {
				console.error('Error fetching home data:', error)
			}
		}
		fetchData()
	}, [])

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const products = await getProducts()
				if (products && products.length > 0) {
					const sanitizedProducts = products.map((item: { description: any }) => ({
						...item,
						description: item.description || '',
					}))
					dispatch({
						type: 'SET_STATE',
						payload: {
							data: sanitizedProducts,
							allProducts: sanitizedProducts,
						},
					})
				}
			} catch (error) {
				console.error('Error fetching products:', error)
			}
		}
		fetchProducts()
	}, [])

	useEffect(() => {
		if (homeData && state.data) {
			dispatch({ type: 'SET_STATE', payload: { hasLoaded: true } })
		}
	}, [homeData, state.data])

	const puloves = {
		titleEnglish: 'PRETTYUGLYLOVES',
		titleDanish: 'PRETTYUGLYLOVES',
		textEnglish: 'Even though, in all humility, we do design and make the most awesome products ourselves, we sometimes also fall in love with other great brands.  Therefore we will bring these brands to you, to love and have as well.',
		textDanish: 'Selvom vi, i al ydmyghed, selv designer og skaber de mest fantastiske produkter, forelsker vi os nogle gange også i andre gode mærker. Derfor vil vi bringe disse mærker til dig, så du også kan elske og eje dem.',
		img: '/images/blue_backpack.png',
		icon: <HeartIcon />,
		placement: 'side',
		className: 'puloves',
	}

	return (
		<section className="home">
			{homeData?.features[0]?.fields && <Featured data={serializeData(homeData.features[0].fields)} />}
			{homeData?.carousel && <Carousel data={serializeData(homeData.carousel)} />}
			<div className='mobileOnly'>
				<h2>{state.language === 'en-US' ? 'Introduction to PrettyUgly' : 'Introduktion til PrettyUgly'}</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lectus augue, accumsan non vestibulum sed, varius ut velit. Suspendisse potenti. Quisque fringilla ornare est, et elementum
					justo venenatis eget. Sed mi risus, varius sit amet pharetra nec, consectetur at justo. Proin scelerisque lacus id fringilla gravida. Orci varius natoque penatibus et magnis dis parturient
					montes, nascetur ridiculus mus. Donec tempus malesuada nunc vitae imperdiet. Quisque sodales turpis vitae feugiat blandit.
				</p>
				<p>
					Praesent semper ipsum turpis, vel tincidunt velit tristique sit amet. Proin laoreet, nibh sit amet aliquet sodales, odio lacus egestas quam, et condimentum turpis arcu eu dolor. Cras
					malesuada ipsum nisl, vitae eleifend mi mollis id. Nam blandit id dolor hendrerit vehicula. Sed metus eros, hendrerit eget placerat nec, malesuada id diam. Cras non lorem condimentum,
					convallis mi eu, consequat orci. Integer lectus neque, tristique non arcu nec, dignissim suscipit velit. Sed mi est, blandit sit amet tellus id, consequat pretium.
				</p>
				<TransitionLink href='products/'>{state.language === 'en-US' ? 'Click here to see our full catalogue' : 'Klik her for at se vores fulde katalog'}</TransitionLink>
			</div>
			<Club />
			{homeData?.newsTicker && <Ticker data={homeData.newsTicker} />}
			<ImageText data={puloves} />
			<Tights />
			<CookieConsent />
		</section>
	)
}

export default Home
