import Image from 'next/image'
import { useAppContext } from '@/app/context'
import { TransitionLink } from '@/app/utils/transitionLinks'
import css from './imagetext.module.css'

const data = {
  titleEnglish: 'PUT A PIN IN IT...',
  titleDanish: 'PUT A PIN IN IT...',
  textEnglish: 'You can say so much with just a little pin. Showcase a statement, your support, your pronoun, your affiliation, your sense of humor or just something pretty or ugly... we have the pin for it!',
  textDanish: 'Du kan sige så meget med bare en lille pin. Vis et statement, din støtte, dit pronomen, din tilknytning, din humoristiske sans eller bare noget smukt eller grimt... vi har en pin til det!',
  img: '/images/pins.png',
}

const Pins = () => {
  const { state } = useAppContext()
	const { language } = state
  return (
    <section className={css.pins}>
      <Image src={data.img} alt={data.titleEnglish} width={827} height={972} />
      <div className={css.text}>
        <h2>{language === 'da-DK' ? data.titleDanish : data.titleEnglish}</h2>
        <p>{language === 'da-DK' ? data.textDanish : data.textEnglish}</p>
        <TransitionLink href={`/products?category=${language === 'da-DK' ? 'pins' : 'pins'}`} className={css.btn}>{language === 'da-DK' ? 'se dem alle' : 'see all'}</TransitionLink>
      </div>
    </section>
  )
}

export default Pins