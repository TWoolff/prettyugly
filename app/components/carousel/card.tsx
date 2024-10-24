import { TransitionLink } from '@/app/utils/transitionLinks'
import css from './carousel.module.css'

export type CardProps = {
	slug?: string
	unit_amount?: number
	currency?: string
	product?: {
		id?: string | number
		name?: string
		images?: string[]
		description?: string
	}
}

const Card: React.FC<CardProps> = ({ slug, unit_amount, product, currency }) => {
	if (!product) {
		return null
	}

	const imageUrl = product.images && product.images.length > 0 ? product.images[0] : ''
	const price = unit_amount ? `${(unit_amount / 100).toFixed(2)} ${currency?.toUpperCase() || ''}` : 'Price not available'

	return (
		<TransitionLink href={`products/${slug ?? ''}`} className={css.card}>
			<div className={css.cardBackground} style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }} />
			<div className={css.cardContent}>
				<h2>{product.name || 'Unnamed Product'}</h2>
				<p>{price}</p>
			</div>
		</TransitionLink>
	)
}

export default Card
