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
	const { state, dispatch } = useAppContext()
	const [product, setProduct] = useState<Price | null>(null)
	const [productImages, setProductImages] = useState<any>(null)
	const [similarProducts, setSimilarProducts] = useState<Price[]>([])
	const [zoomedIndex, setZoomedIndex] = useState<number | null>(null)
	const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
	const flexRef = useRef<HTMLDivElement>(null)
	const infoContainerRef = useRef<HTMLDivElement>(null)

	console.log('state', state)

	useEffect(() => {
		const fetchProduct = async () => {
			let localProduct = state?.data?.find((p: Price) => p.slug === params.slug);

			if (!localProduct) {
				localProduct = await fetchProductBySlug(params.slug) as Price;
			}

			setProduct(localProduct);

			if (localProduct) {
				const resultProduct = localProduct.product;
				if (resultProduct.metadata.similar) {
					const similarTags = resultProduct.metadata.similar.split(',').map((tag: string) => tag.trim().toLowerCase());
					const similarProducts = state?.data?.filter((p: Price) => {
						const productTags = p.product.metadata.similar?.split(',').map(tag => tag.trim().toLowerCase()) || [];
						const isTagSimilar = similarTags.some((tag: string) => productTags.includes(tag));
						const isIdSimilar = similarTags.includes(p.product.id.toLowerCase());
						return (isTagSimilar || isIdSimilar) && p.product.id !== resultProduct.id;
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
		if (zoomedIndex !== index) return;
		const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
		const x = ((e.clientX - left) / width) * 100;
		const y = ((e.clientY - top) / height) * 100;
		setZoomPosition({ x, y });
	};

	const handleMouseEnter = (index: number) => setZoomedIndex(index);
	const handleMouseLeave = () => setZoomedIndex(null);

	if (!product) {
		return <Loader />;
	}

	const {
		unit_amount,
		currency,
		product: { id, slug, name, images, description, metadata },
	} = product;

	const displayTitle = state.language === 'da-DK' ? metadata.title_da : metadata.title_en
	const displayDescription = state.language === 'da-DK' ? metadata.description_da : metadata.description_en
	const displaySize = state.language === 'da-DK' ? `Størrelse: ${metadata.size_da}` : `Size: ${metadata.size_en}`
	const displayMaterial = state.language === 'da-DK' ? `Materiale: ${metadata.material_da}` : `Material: ${metadata.material_en}`
	const displayFinding = state.language === 'da-DK' ? `Komponenter: ${metadata.finding_da}` : `Findings: ${metadata.finding_en}`

	const handleAddToCart = () => {
		const newItem = {
			quantity: 1,
			id,
			slug,
			name,
			unit_amount,
			metadata,
			images,
		};
		dispatch({ type: 'ADD_TO_CART', payload: newItem });
	};

	const saveProduct = () => {
		dispatch({ type: 'SAVE_PRODUCT', payload: { id } });
	};

	console.log('product', product)

	return (
		<section className={css.productDetail}>
			<div className={css.flex} ref={flexRef}>
				<div className={css.productImages}>
					<div
						className={css.zoomWrapper}
						onMouseMove={e => handleMouseMove(e, 0)}
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

					{productImages && (
						<>
							{productImages.map((image: any, i: number) => (
									<Image
										src={`https:${image.url}`}
										alt={image.title}
										key={i}
										width={700}
										height={700}
										quality={90}
										style={{
											transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
											transform: zoomedIndex === i + 1 ? 'scale(2)' : 'scale(1)',
											transition: 'transform 0.2s ease',
										}}
									/>
							))}
						</>
					)}
				</div>
				<div className={css.infoContainer} ref={infoContainerRef}>
					<div className={css.info}>
						<h1>{displayTitle}</h1>
						<p className={css.description}>{displayDescription}</p>
						<ul className={css.metadata}>
							{metadata?.size_da && <li>{displaySize}</li>}
							{metadata?.material_da && <li>{displayMaterial}</li>}
							{metadata?.finding_da && <li>{displayFinding}</li>}
						</ul>
						<p className={css.price}>
							{unit_amount / 100} {currency.toUpperCase()}
						</p>
						<Button onClick={saveProduct} title={state.language === 'da-DK' ? 'Gem Produkt' : 'Save Product'} className={css.btn} />
						<Button onClick={handleAddToCart} title={state.language === 'da-DK' ? 'Tilføj til kurv' : 'Add to Cart'} className={css.btn} />
					</div>
				</div>
			</div>
			{similarProducts?.length > 0 && (
				<div className={css.similarProductsContainer}>
					<h2>{state.language === 'da-DK' ? 'Lignende Produkter' : 'Similar Products'}</h2>
					<div className={css.similarProducts}>
						{similarProducts.map(similarProduct => (
							<div key={similarProduct.id} className={css.similarProduct}>
								<Link href={`/products/${similarProduct.slug}`}>
									<Image src={similarProduct.product.images[0]} alt={similarProduct.product.name} width={300} height={300} quality={90} />
									<p>{similarProduct.product.name}</p>
									<p>
										{similarProduct.unit_amount / 100} {currency.toUpperCase()}
									</p>
								</Link>
							</div>
						))}
					</div>
				</div>
			)}
		</section>
	);
}

export default ProductDetail;
