'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getProductBySlug as fetchProductBySlug } from '@/app/utils/getProducts'
import { useAppContext } from '@/app/context'
import { Price } from '@/app/types'
import Button from '@/app/components/formelements/button'
import Loader from '@/app/components/loader/loader'
import css from './productdetail.module.css'

const ProductDetail: React.FC<{ params: { slug: string } }> = ({ params }) => {
    const { state, dispatch } = useAppContext();
    const [product, setProduct] = useState<Price | null>(null);
    const [similarProducts, setSimilarProducts] = useState<Price[]>([]);

    useEffect(() => {
        const fetchProduct = async () => {
            let localProduct = state.data.find((p: Price) => p.slug === params.slug);

            if (!localProduct) {
                localProduct = await fetchProductBySlug(params.slug) as Price;
            }

            setProduct(localProduct);

            // Handle similar products logic if localProduct is available
            if (localProduct) {
                const resultProduct = localProduct.product;
                if (resultProduct.metadata.similar) {
                    const similarTags = resultProduct.metadata.similar.split(',').map((tag: string) => tag.trim().toLowerCase());
                    const similarProducts = state.data?.filter((p: Price) => {
                        const productTags = p.product.metadata.similar?.split(',').map(tag => tag.trim().toLowerCase()) || [];
                        return similarTags.some((tag: string) => productTags.includes(tag)) && p.product.id !== resultProduct.id;
                    });
                    setSimilarProducts(similarProducts);
                }
            }
        };

        fetchProduct();
    }, [params.slug, state.data]);

    if (!product) {
        return <Loader />;
    }

    const { unit_amount, currency, product: { id, slug, name, images, description, metadata } } = product; 
    const handleAddToCart = () => {
        const newItem = {
            quantity: 1,
            id,
            slug,
            name,
            unit_amount,
            metadata,
            images
        }
        dispatch({ type: 'ADD_TO_CART', payload: newItem })
    }

    const saveProduct = () => {
        dispatch({ type: 'SAVE_PRODUCT', payload: { id } })
    }
    return (
        <section className={css.productDetail}>
            <h1>{name}</h1>
            <Image 
                src={images[0]} 
                alt={name}
                width={700} 
                height={700} 
                quality={90} 
                className={css.mainImg}
            />
            <p>{description}</p>
            <p>{unit_amount / 100} {currency.toUpperCase()}</p>
            <Button onClick={saveProduct} title='Save Product' className={css.btn} />
            <Button onClick={handleAddToCart} title='Add to Cart' className={css.btn} />

            {similarProducts.length > 0 && (
                <>
                    <h2>Similar Products</h2>
                    <div className={css.similarProducts}>
                        {similarProducts.map(similarProduct => (
                            <div key={similarProduct.id} className={css.similarProduct}>
                                <Link href={`/products/${similarProduct.slug}`}>
                                    <Image 
                                        src={similarProduct.product.images[0]} 
                                        alt={similarProduct.product.name}
                                        width={300} 
                                        height={300} 
                                        quality={90} 
                                    />
                                    <p>{similarProduct.product.name}</p>
                                    <p>{similarProduct.unit_amount / 100} {currency.toUpperCase()}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default ProductDetail;
