'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useAppContext } from '@/app/context'
import { useChangeCurrency } from '@/app/utils/useChangeCurrency'
import css from './product.module.css'

interface ProductProps {
	data: {
		id: string
		name: string
		description: string
		images: string[]
		metadata: { [key: string]: string }
		price: number | null
		unit_amount: number | null
		currency: string | null
		slug: string
	}
}

const Product: React.FC<ProductProps> = ({ data }) => {
	const { state } = useAppContext()
	const { language, currency } = state
	const { getExchangeRate } = useChangeCurrency()

	const languageSuffix = language === 'da-DK' ? '_da' : '_en'
	const title = data.metadata[`title${languageSuffix}`] || data.name

	const calculatePrice = () => {
		if (data.unit_amount && currency) {
			const exchangeRate = getExchangeRate(currency as 'DKK' | 'EUR' | 'SEK')
			const rate = typeof exchangeRate === 'number' ? exchangeRate : 1
			return Math.round(data.unit_amount * rate)
		}
		return data.price || data.unit_amount || 0
	}

	const displayPrice = calculatePrice()

	return (
		<div className={css.product}>
			<Link href={`/products/${data.slug}`} key={data.id}>
				{data.images[0] && <Image src={data.images[0]} alt={title} width={500} height={500} quality={90} className={css.mainImg} />}
				<div className={css.text}>
					<h3>{title}</h3>
					{displayPrice && currency && (
						<p>
							{new Intl.NumberFormat(language, {
								style: 'currency',
								currency: currency,
							}).format(displayPrice / 100)}
						</p>
					)}
				</div>
			</Link>
		</div>
	)
}

export default Product
