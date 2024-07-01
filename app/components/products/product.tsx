'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ProductType } from '@/app/context'
import css from './product.module.css'

const Product: React.FC<ProductType> = ({ data }) => {
    const { id, slug } = data
    const { name, description, images } = data.product

    return ( 
        <div className={css.product}>
            <Link key={id} href={`/products/${slug}`}>
                <Image 
                    src={images[0]} 
                    alt={name} 
                    className={css.mainImg}
                    width={500} 
                    height={500} 
                    quality={90} 
                />
            </Link>
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    )
}

export default Product