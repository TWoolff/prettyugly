import { TransitionLink } from '@/app/utils/transitionLinks'
import { useAppContext } from '@/app/context'
import css from './footer.module.css'

const Footer: React.FC = () => {
  const { state } = useAppContext()

  return (
    <footer className={`${css.footer} grid`}>
      <div className={css.socials}>
        <h3>{state.language === 'en-US' ? 'Get in touch' : 'Kontakt'}</h3>
        <p><a href="mailto:hello@prettyugly.fashion">hello@prettyugly.fashion</a></p>
        <p>Instagram</p>
        <p>Facebook</p>
      </div>
      <div className={css.info}>
        <h3>General Information</h3>
        <TransitionLink href={'/faqs'} className={css.faq}>FAQ</TransitionLink>
      </div>
      <p className={css.copyright}>© 2024 PrettyUgly</p>
    </footer>
  )
}

export default Footer