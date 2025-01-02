'use client'
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

const FeaturedPage: React.FC<FeaturedProps> = ({ data }) => {
  const { state } = useAppContext()
  const { data: products } = state

  const featuredProducts = products?.filter((product: Product) => {
    return data.products.some(featuredProduct => 
      featuredProduct.fields.productId === product.id
    )
  })

  console.log(featuredProducts)
  if (!featuredProducts?.length) return null

  return (
    <section className={css.featured}>
      <div className={css.products}>
        hello
        {featuredProducts.map((product: Product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedPage 