import { useAppContext } from '@/app/context'
import css from './imagetext.module.css'

const data = {
  titleEnglish: 'ALL LEGS DESERVE PRETTY TIGHTS',
  titleDanish: 'ALL LEGS DESERVE PRETTY TIGHTS',
  textEnglish: 'see all here',
  textDanish: 'se alle her',
  img: '/images/legs_in_air_expand.png',
  placement: 'stacked',
  className: 'tights',
}

const Tights = () => {
	const { state } = useAppContext()
	const { language } = state

	return (
		<section className={`${css.container} ${data.className} ${css.tights} grid`} style={{ backgroundImage: `url(${data.img})` }}>
      <h2>{language === 'en-US' ? data.titleEnglish : data.titleDanish}</h2>
			<p>{language === 'en-US' ? data.textEnglish : data.textDanish}</p>
		</section>
	)
}

export default Tights
