'use client'
import { Suspense, useEffect } from 'react'
import Products from '../components/products/products'
import { useAppContext } from '../context'

const ProductsPage: React.FC = () => {
	const { dispatch } = useAppContext()

	useEffect(() => {
		dispatch({ type: 'SET_FILTER', payload: { key: 'featured', value: '' } });
	}, [dispatch]);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<section>
				<Products />
			</section>
		</Suspense>
	)
}

export default ProductsPage
