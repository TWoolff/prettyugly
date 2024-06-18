'use client'

import { useEffect, useState } from 'react'
import Cart from './components/cart/cart'
import Product from './components/product/product'
import { getProducts } from './utils/getProducts'

const Home: React.FC =  () => {
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
      {data.map((product: any) => {
          return (<Product key={product.product.id} data={product} />)
        })
      }
      <Cart />
    </section>
  )
}

export default Home
