'use client'
import { useMemo } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useAppContext } from '@/app/context'
import Product from '../products/product'
import css from './featured.module.css'

type Product = {
    id: string
    unit_amount: number
    product: {
        active: boolean
        created: number
        default_price: string
        images: string[]
        marketing_features: string[]
        metadata: { [key: string]: string }
        id: string
        name: string
        description: string
        productInfo: string
    }
}

type FeaturedProps = {
    data: {
        title: string
        paragraph: any
        products: {
            fields: {
                productId: string
            }
        }[]
        image: {
            fields: {
                description: string
                file: {
                    url: string
                }
            }
        }
    }
}

const Featured: React.FC<FeaturedProps> = ({ data }) => {
    const { state } = useAppContext()
    const { title, paragraph, image, products } = data
    const { description, file } = image.fields
    const productIds = products.map(product => product.fields.productId)

    const featuredProducts = useMemo(() => {
        return state.data?.filter((product: Product) => productIds.includes(product.product.id)) || []
    }, [state.data, productIds])

    return (
        <section className={css.featured}>
            <img src={file.url} alt={description} className={css.featuredImg} />
            <div className={css.content}>
                <h2>{title}</h2>
                {documentToReactComponents(paragraph)}
            </div>
            <div className={css.featuredProducts}>
                {featuredProducts.length > 0 ? (
                    featuredProducts.map((product: Product) => (
                        <Product key={product.product.id} data={product} />
                    ))
                ) : (
                    <p>No featured products available.</p>
                )}
            </div>
        </section>
    )
}

export default Featured
