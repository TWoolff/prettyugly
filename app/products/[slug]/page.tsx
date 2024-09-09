'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAppContext } from '@/app/context'
import { getProductBySlug as fetchProductBySlug } from '@/app/utils/getProducts'
import { getProductImages } from '@/app/utils/getProductImages'
import { Price } from '@/app/types'
import Button from '@/app/components/formelements/button'
import Loader from '@/app/components/loader/loader'
import css from './productdetail.module.css'

const ProductDetail: React.FC<{ params: { slug: string } }> = ({ params }) => {
    const { state, dispatch } = useAppContext();
    const [product, setProduct] = useState<Price | null>(null);
    const [productImages, setProductImages] = useState<any>(null);
    const [similarProducts, setSimilarProducts] = useState<Price[]>([]);
    const [zoomedIndex, setZoomedIndex] = useState<number | null>(null); // Track which image is zoomed
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const flexRef = useRef<HTMLDivElement>(null);
    const infoContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            let localProduct = state?.data?.find((p: Price) => p.slug === params.slug);

            if (!localProduct) {
                localProduct = await fetchProductBySlug(params.slug) as Price;
            }

            setProduct(localProduct);

            if (localProduct) {
                const resultProduct = localProduct?.product;
                if (resultProduct.metadata.similar) {
                    const similarTags = resultProduct?.metadata?.similar.split(',').map((tag: string) => tag.trim().toLowerCase());
                    const similarProducts = state?.data?.filter((p: Price) => {
                        const productTags = p.product.metadata.similar?.split(',').map(tag => tag.trim().toLowerCase()) || [];
                        return similarTags?.some((tag: string) => productTags.includes(tag)) && p.product.id !== resultProduct.id;
                    });
                    setSimilarProducts(similarProducts);
                }
            }
        };

        fetchProduct();
    }, [params.slug, state.data]);

    useEffect(() => {
        const fetchData = async () => {
            if (!product?.product.id) return; 
    
            try {
                const data = await getProductImages(product.product.id);
                setProductImages(JSON.parse(JSON.stringify(data)));
            } catch (error) {
                console.error('Error fetching product images:', error);
            }
        };
    
        fetchData();
    }, [product?.product.id]);

    useEffect(() => {
        const updateInfoContainerHeight = () => {
            if (flexRef.current && infoContainerRef.current) {
                const flexHeight = flexRef.current.offsetHeight;
                infoContainerRef.current.style.height = `${flexHeight}px`;
            }
        };

        updateInfoContainerHeight();
        window.addEventListener('resize', updateInfoContainerHeight);

        return () => {
            window.removeEventListener('resize', updateInfoContainerHeight);
        };
    }, [productImages]); 

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        if (zoomedIndex !== index) return; // Only calculate zoom for the active image
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPosition({ x, y });
    };

    const handleMouseEnter = (index: number) => setZoomedIndex(index); // Set the zoomed image by index
    const handleMouseLeave = () => setZoomedIndex(null); // Reset when mouse leaves

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
            <div className={css.flex} ref={flexRef}>
                <div className={css.productImages}>
                    {/* Main product image */}
                    <div
                        className={css.zoomWrapper}
                        onMouseMove={(e) => handleMouseMove(e, 0)} // Pass index 0 for the main image
                        onMouseEnter={() => handleMouseEnter(0)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Image 
                            src={images[0]} 
                            alt={name}
                            width={700} 
                            height={700} 
                            quality={90}
                            className={zoomedIndex === 0 ? css.zoomedImage : ''} 
                            style={{
                                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                transform: zoomedIndex === 0 ? 'scale(2)' : 'scale(1)',
                                transition: 'transform 0.2s ease',
                            }}
                        />
                    </div>
                    
                    {/* Additional product images */}
                    {productImages && (
                        <>
                            {productImages.map((image: any, i: number) => (
                                <div
                                    key={i}
                                    className={css.zoomWrapper}
                                    onMouseMove={(e) => handleMouseMove(e, i + 1)} // Use index based on loop (i + 1 to avoid collision with the main image)
                                    onMouseEnter={() => handleMouseEnter(i + 1)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Image 
                                        src={`https:${image.url}`} 
                                        alt={image.title} 
                                        width={700} 
                                        height={700} 
                                        quality={90}
                                        className={zoomedIndex === i + 1 ? css.zoomedImage : ''} 
                                        style={{
                                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                            transform: zoomedIndex === i + 1 ? 'scale(2)' : 'scale(1)',
                                            transition: 'transform 0.2s ease',
                                        }}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <div className={css.infoContainer} ref={infoContainerRef}>
                    <div className={css.info}>
                        <h1>{name}</h1>
                        <p className={css.description}>{description}</p>
                        <ul className={css.metadata}>
                            {metadata?.size && <li>Size: {metadata.size}</li>}
                            {metadata?.material && <li>Material: {metadata.material}</li>}
                            {metadata?.finding && <li>Earring Findings: {metadata.finding}</li>}
                        </ul>
                        <p className={css.price}>{unit_amount / 100} {currency.toUpperCase()}</p>
                        <Button onClick={saveProduct} title='Save Product' className={css.btn} />
                        <Button onClick={handleAddToCart} title='Add to Cart' className={css.btn} />
                    </div>
                </div>
            </div>
            {similarProducts?.length > 0 && (
                <div className={css.similarProductsContainer}>
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
                </div>
            )}
        </section>
    );
};

export default ProductDetail;