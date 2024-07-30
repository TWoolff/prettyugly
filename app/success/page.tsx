'use client'
import { useEffect } from "react"
import { useAppContext } from "../context"

const SuccessPage: React.FC = () => {
  const { dispatch } = useAppContext()

  useEffect(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  return ( 
    <section>
      <h1>Success</h1>
      <p>Thank you for your purchase.</p>
    </section>
  )
}

export default SuccessPage