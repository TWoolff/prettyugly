import { useAppContext } from '@/app/context'
import { TransitionLink } from '@/app/utils/transitionLinks'
import css from './imagetext.module.css'

const data = {
  titleEnglish: 'ALL LEGS DESERVE PRETTY TIGHTS',
  titleDanish: 'ALL LEGS DESERVE PRETTY TIGHTS',
  textEnglish: 'see all here',
  textDanish: 'se alle her',
  img: '/images/legs_in_air_expand.png',
}

const Tights = () => {
	const { state } = useAppContext()
	const { language } = state

	return (
		<section className={`${css.container} ${css.tights} grid`} style={{ backgroundImage: `url(${data.img})` }}>
      <h2>{language === 'en-US' ? data.titleEnglish : data.titleDanish}</h2>
			<TransitionLink href={`/products?category=${language === 'da-DK' ? 'strømper' : 'tights'}`} className={css.link}>{language === 'en-US' ? data.textEnglish : data.textDanish}</TransitionLink>
		</section>
	)
}

export default Tights
