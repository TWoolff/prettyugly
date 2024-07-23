'use client'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { TransitionLink } from '@/app/utils/transitionLinks'
import css from './featured.module.css'


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
    const { title, paragraph, image, products } = data
    const { file } = image.fields
    const productIds = products.map(product => product.fields.productId)

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