'use client'
import { useEffect, useState } from 'react'
import Cart from './components/cart/cart'
import { getProducts } from './utils/getProducts'
import Products from './components/products/products'

export type ProductType = {
  data: {
      id: string
      unit_amount: number
      product: {
          active: boolean
          created: number
          default_price: string
          images: string[]
          marketing_features: string[]
          metadata: {
              [key: string]: string
          }
          id: string
          name: string
          description: string
          productInfo: string
      }
  }
}

const Home: React.FC = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts()
      if (data) {
        setData(data as any)
      }
    }
    fetchData()
  }, [])

  return (
    <section>
      <h1>Front Page</h1>
      <Products data={data} />
      <Cart />
    </section>
  )
}

export default Home
