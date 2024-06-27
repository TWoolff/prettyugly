'use client'
import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useAppContext } from '@/app/context'
import css from './featured.module.css'

type Product = {
    id: string
    product: {
        id: string
        name: string
        description: string
        images: string[]
    }
    unit_amount: number
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
                        <Link href={`/products/${product.product.id}`} key={product.product.id}>
                            <div className={css.productCard}>
                                <h3>{product.product.name}</h3>
                                <Image src={product.product.images[0]} alt={product.product.name} width={200} height={200} quality={90} />
                                <p>{product.product.description}</p>
                                <p>{product.unit_amount / 100},00 kr.</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No featured products available.</p>
                )}
            </div>
        </section>
    )
}

export default Featured
