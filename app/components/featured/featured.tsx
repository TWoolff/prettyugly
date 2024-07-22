'use client'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useAppContext } from '@/app/context'
import Product from '../products/product'
import Button from '../formelements/button'
import css from './featured.module.css'
import { TransitionLink } from '@/app/utils/transitionLinks'

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
    const router = useRouter()
    const { state, dispatch } = useAppContext()
    const { title, paragraph, image, products } = data
    const { file } = image.fields
    const productIds = products.map(product => product.fields.productId)

    const featuredProducts = useMemo(() => {
        return state.data?.filter((product: Product) => productIds.includes(product.product.id)) || []
    }, [state.data, productIds])

    console.log('featuredProducts:', featuredProducts)

    const handleClick = () => {
        dispatch({ type: 'SET_FILTER', payload: { key: 'featured', value: productIds.join(',') } })
        router.push('/products')
    }

    return (
        <section className={`${css.featured} grid`} style={{backgroundImage: `url(${file.url})`}}>
            <div className={css.content}>
                <h1>{title}</h1>
                {documentToReactComponents(paragraph)}
                <TransitionLink href={'/products'} filter={productIds} className={css.btn}>Shop Now</TransitionLink>
            </div>
        </section>
    )
}

export default Featured;