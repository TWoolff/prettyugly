import { TransitionLink } from '@/app/utils/transitionLinks'
import { useAppContext } from '@/app/context'
import css from './club.module.css'

const Club = () => {
	const { state } = useAppContext()
	const { language } = state

	return (
		<section className={`${css.club} grid`}>
			{language === 'en-US' ? <h2>Join our prettyugly free members club</h2> : <h2>Tilmeld dig vores gratis medlems-klub</h2>}
			<div>
				<ul>
					{language === 'en-US' ? (
						<>
							<li>get earlybird special offers</li>
							<li>a birthday gift</li>
							<li>new products sneakpeak</li>
							<li>newsletter offers</li>
							<li>loyalty points and much more...</li>
						</>
					) : (
						<>
							<li>få "earlybird" tilbud</li>
							<li>få en fødselsdagsgave</li>
							<li>"sneakpeak" af nye produkter</li>
							<li>få nyheder og tilbud</li>
							<li>få loyaltets point og meget mere...</li>
						</>
					)}
				</ul>
				<TransitionLink href='/profile' className={css.btn}>
					{language === 'en-US' ? 'Click here' : 'Klik her'}
				</TransitionLink>
				<p>{language === 'en-US' ? 'to set up your free account' : 'for at oprette din gratis konto'}</p>
			</div>
		</section>
	)
}

export default Club
