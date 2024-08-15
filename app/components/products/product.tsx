'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ProductType } from '@/app/types'
import css from './product.module.css'

const Product: React.FC<ProductType> = ({ data }) => {
    const { id, slug, unit_amount } = data
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
            <div>
                <h2>{name}</h2>
                <p>{unit_amount / 100} kr.</p>
            </div>
        </div>
    )
}

export default Product