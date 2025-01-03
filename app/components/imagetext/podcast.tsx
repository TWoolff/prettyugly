import Image from 'next/image'
import { useAppContext } from '@/app/context'
import { TransitionLink } from '@/app/utils/transitionLinks'
import css from './imagetext.module.css'

const data = {
  titleEnglish: 'JUST ASK PODCAST',
  titleDanish: 'JUST ASK PODCAST',
  textEnglish: 'At PRETTYUGLY we celebrate the uniqueness that is you. But with that said, we don’t know how it feels to walk in your shoes or live in your skin. Therefore we would like to just ask.  In a series of podcasts, we invite the ordinary, the unordinary, the pretty and the ugly, all types of people, into our studio to a talk about life.',
  textDanish: 'Hos PRETTYUGLY fejrer vi det unikke, der er dig. Men med det sagt, ved vi ikke, hvordan det føles at gå i dine sko eller leve i din hud. Derfor vil vi gerne bare spørge. I en række podcasts inviterer vi de almindelige, de ualmindelige, de smukke og de grimme - alle slags mennesker - ind i vores studie til en samtale om livet.',
  img: '/images/podcast.png',
}

const Podcast = () => {
  const { state } = useAppContext()
	const { language } = state

  return (
    <section className={css.podcast}>
      <div className={css.text}>
        <h2>{language === 'da-DK' ? data.titleDanish : data.titleEnglish}</h2>
        <p>{language === 'da-DK' ? data.textDanish : data.textEnglish}</p>
        <TransitionLink href='/podcast' className={css.btn}>{language === 'da-DK' ? 'se mere...' : 'see more...'}</TransitionLink>
      </div>
      <Image src={data.img} alt={data.titleEnglish} width={1920} height={1146} />
    </section>
  )
}

export default Podcast