import Image from 'next/image'
import { useAppContext } from '@/app/context'
import css from './imagetext.module.css'

interface ImageTextProps {
	data: {
		titleEnglish: string
		titleDanish: string
		textEnglish: string
		textDanish: string
		img: string
		icon?: React.ReactNode
		placement: string
		className?: string
	}
}

const ImageText = ({ data }: ImageTextProps) => {
	const { state } = useAppContext()
	const { language } = state

	return (
		<div className={`${css.container} ${data.className} ${data.placement === 'side' ? css.sideBySide : css.stacked} grid`}>
			<div className={css.content}>
				<p>{language === 'en-US' ? data.textEnglish : data.textDanish}</p>
				<h2>{language === 'en-US' ? data.titleEnglish : data.titleDanish}</h2>
				{data.icon}
			</div>
			<Image src={data.img} alt={language === 'en-US' ? data.titleEnglish : data.titleDanish} width={1000} height={1000} />
		</div>
	)
}

export default ImageText
