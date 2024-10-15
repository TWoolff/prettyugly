import Button from '../formelements/button'
import css from './hero.module.css'

const Hero: React.FC = () => {
  return (
    <section className={`${css.hero} grid`}>
      <div className={css.content}>
        <h1>Featured</h1>
        <h2>Kamma Earrings</h2>
        <Button onClick={function (): void {
          throw new Error('Function not implemented.')
        }} title={'Shop Now'} className={css.btn} />
      </div>
    </section>
  )
}

export default Hero