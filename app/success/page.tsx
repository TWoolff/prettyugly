'use client'
import { useEffect } from "react"
import { useAppContext } from "../context"

type SuccessPageProps = {
  searchParams: {
    amount: string
  }
}

const SuccessPage: React.FC<SuccessPageProps> = ({searchParams: {amount}}) => {
  const { dispatch } = useAppContext()

  useEffect(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  return ( 
    <section>
      <h1>Success</h1>
      <p>Thank you for your purchase of {Number(amount)/100} kr.</p>
    </section>
  )
}

export default SuccessPage