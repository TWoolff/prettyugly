'use client'
import { useEffect } from 'react'
import { useAppContext } from '@/app/context'
import { Product } from '@/app/types'
import ProductCard from '../products/product'
import css from './featured.module.css'

interface FeaturedProps {
  data: {
    products: Array<{
      fields: {
        productId: string
      }
    }>
  }
}

const Featured: React.FC<FeaturedProps> = ({ data }) => {
  const { state } = useAppContext()
  const { data: products } = state

  const featuredProducts = products?.filter((product: Product) => {
    return data.products.some(featuredProduct => 
      featuredProduct.fields.productId === product.id
    )
  })

  if (!featuredProducts?.length) return null

  return (
    <section className={css.featured}>
      <div className={css.products}>
        {featuredProducts.map((product: Product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </section>
  )
}

export default Featured 