import Link from 'next/link'

const SuccessPage: React.FC = () => {
  return ( 
    <section>
      <h1>Success</h1>
      <Link href={'/'}>Back home</Link>
    </section>
  )
}

export default SuccessPage