'use client';
import { useEffect, useState } from 'react';
import { getPage } from './utils/contentful';
import { getProducts } from './utils/getProducts';
import { useAppContext } from './context';
import Featured from './components/featured/featured';
import Ticker from './components/ticker/ticker';
import CookieConsent from './components/cookieconsent/cookieconsent';
import Carousel from './components/carousel/carousel';
import BigText from './components/bigtext/bigtext';
import { TransitionLink } from './utils/transitionLinks';

const Home: React.FC = () => {
	const { state, dispatch } = useAppContext();
	const [homeData, setHomeData] = useState<any>(null);
	const [bigTextInView, setBigTextInView] = useState(false);

	useEffect(() => {
		if (homeData) return;
		const fetchData = async () => {
			try {
				const data = await getPage('/');
				setHomeData(JSON.parse(JSON.stringify(data.items[0].fields)));
			} catch (error) {
				console.error('Error fetching home data:', error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (state.data) return;
		const fetchData = async () => {
			const data = await getProducts();
			if (data) {
				// @ts-ignore
				const activeProducts = data.filter((item) => item.active === true && item.product.active === true);
				dispatch({ type: 'SET_STATE', payload: { data: activeProducts } });
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (homeData && state.data) {
			dispatch({ type: 'SET_STATE', payload: { hasLoaded: true } });
		}
	}, [homeData, state.data]);

	const bigTextClassName = bigTextInView ? 'bigTextInView' : '';

	console.log(state.language)

	return (
		<section className={`home ${bigTextClassName}`}>
			{homeData?.features[0].fields && <Featured data={homeData.features[0].fields} />}
			{homeData?.carousel && <Carousel data={homeData.carousel} />}
			<div className='mobileOnly'>
				<h2>{state.language === 'en-US' ? 'Introduction to PrettyUgly' : 'Introduktion til PrettyUgly'}</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lectus augue, accumsan non
					vestibulum sed, varius ut velit. Suspendisse potenti. Quisque fringilla ornare est, et elementum
					justo venenatis eget. Sed mi risus, varius sit amet pharetra nec, consectetur at justo. Proin
					scelerisque lacus id fringilla gravida. Orci varius natoque penatibus et magnis dis parturient
					montes, nascetur ridiculus mus. Donec tempus malesuada nunc vitae imperdiet. Quisque sodales turpis
					vitae feugiat blandit.
				</p>
				<p>
					Praesent semper ipsum turpis, vel tincidunt velit tristique sit amet. Proin laoreet, nibh sit amet
					aliquet sodales, odio lacus egestas quam, et condimentum turpis arcu eu dolor. Cras malesuada ipsum
					nisl, vitae eleifend mi mollis id. Nam blandit id dolor hendrerit vehicula. Sed metus eros,
					hendrerit eget placerat nec, malesuada id diam. Cras non lorem condimentum, convallis mi eu,
					consequat orci. Integer lectus neque, tristique non arcu nec, dignissim suscipit velit. Sed mi est,
					blandit sit amet tellus id, consequat pretium.
				</p>
				<TransitionLink href='products/'>{state.language === 'en-US' ? 'Click here to see our full catalogue' : 'Klik her for at se vores fulde katalog'}</TransitionLink>
			</div>
			{homeData?.bigText && (
				<BigText text={homeData.bigText} onInViewChange={setBigTextInView} className={bigTextClassName} />
			)}
			{homeData?.newsTicker && <Ticker data={homeData.newsTicker} />}
			<CookieConsent />
		</section>
	);
};

export default Home;
