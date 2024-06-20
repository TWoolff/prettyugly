import Link from 'next/link'

const CancelPage: React.FC = () => {
  return ( 
    <section>
      <h1>Canceled</h1>
      <Link href={'/'}>Back home</Link>
    </section>
  )
}

export default CancelPage