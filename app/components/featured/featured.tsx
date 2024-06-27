'use client'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useAppContext } from '@/app/context'
import css from './featured.module.css'
import Link from 'next/link'

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

const Featured: React.FC<FeaturedProps> = ({data}) => {
    const { state } = useAppContext()
    const { title, paragraph, image, products  } = data
    const { description, file } = image.fields
    const productsIds = products.map(product => product.fields.productId)
    const featuredProducts = state.data?.filter((product: { product: { id: string } }) => productsIds.includes(product.product.id))

    return ( 
        <section className={css.featured}>
            <img src={file.url} alt={description} className={css.featuredImg} />
            <div className={css.content}>
                <h2>{title}</h2>
                {documentToReactComponents(paragraph)}
            </div>
            <div className={css.featuredProducts}>
                    {featuredProducts && featuredProducts.length > 0 ? (
                        // @ts-ignore
                        featuredProducts.map((product) => (
                            <Link href={`/products/${product.id}`} key={product.id}>
                                <h3>{product.product.name}</h3>
                                <Image src={product.product.images[0]} alt={product.product.name} width={200} height={200} quality={90} />
                                <p>{product.product.description}</p>
                                <p>{product.unit_amount / 100},00 kr.</p>
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