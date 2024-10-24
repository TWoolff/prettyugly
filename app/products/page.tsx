'use client'
import { useEffect } from 'react'
import Products from '../components/products/products'
import { useAppContext } from '../context'

const ProductsPage: React.FC = () => {
	const { dispatch } = useAppContext()

	useEffect(() => {
		// Only reset the 'featured' filter, preserve others
		dispatch({ type: 'SET_FILTER', payload: { key: 'featured', value: '' } });
	}, [dispatch]);

	return (
		<section>
			<Products />
		</section>
	)
}

export default ProductsPage
