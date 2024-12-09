import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '@/app/context'
import { getProducts } from '@/app/utils/getProducts'
import Product from './product'
import Loader from '../loader/loader'
import css from './product.module.css'

const Products: React.FC = () => {
	const { state, dispatch } = useAppContext()
	const { filters, language } = state

	useEffect(() => {
		if (state.data) return
		const fetchData = async () => {
			const data = await getProducts()
			if (data) {
				dispatch({ 
					type: 'SET_STATE', 
					payload: { 
						data: data.map((item: { description: any }) => ({
							...item,
							description: item.description || ''
						})), 
						hasLoaded: true 
					} 
				})
			}
		}
		fetchData()
	}, [])

	useEffect(() => {
		if (state.filters?.search !== undefined && state.data) {
			if (state.filters.search.trim() === '') {
				dispatch({
					type: 'SET_STATE',
					payload: { data: state.allProducts }
				})
			} else {
				const filteredProducts = state.data.filter(product => {
					const title = product.metadata[`title${language === 'da-DK' ? '_da' : '_en'}`]
					const description = product.metadata[`description${language === 'da-DK' ? '_da' : '_en'}`]
					const searchTerm = state.filters.search.toLowerCase()
					
					return (
						(title?.toLowerCase().includes(searchTerm) || false) ||
						(description?.toLowerCase().includes(searchTerm) || false)
					)
				})
				
				dispatch({
					type: 'SET_STATE',
					payload: { data: filteredProducts }
				})
			}
		}
	}, [state.filters?.search])

	const filteredProducts = state.data?.filter((product: any) => {
		const languageSuffix = language === 'da-DK' ? '_da' : '_en'
		return Object.entries(filters).every(([key, value]) => {
			if (value === '') return true
			if (key === 'color') {
				const colors = product.metadata[`color${languageSuffix}`]?.split(',').map((c: string) => c.trim().toLowerCase()) || []
				return colors.includes(value.toLowerCase())
			}
			if (key === 'search') {
				const searchWords = value
					.toLowerCase()
					.split(' ')
					.filter(word => word.length > 0)
				const searchFields = [
					product.metadata[`title${languageSuffix}`],
					product.metadata[`description${languageSuffix}`],
					product.metadata[`category${languageSuffix}`],
					product.metadata[`color${languageSuffix}`],
				]
				return searchWords.every(word => searchFields.some(field => field && field.toLowerCase().includes(word)))
			}
			if (key === 'featured') {
				const featuredIds = value.split(',')
				return featuredIds.includes(product.id)
			}
			if (key === 'category') {
				return product.metadata[`category${languageSuffix}`]?.toLowerCase() === value.toLowerCase()
			}
			return true
		})
	})

	const getRandomSize = () => {
		const sizes = ['small', 'medium', 'large']
		return sizes[Math.floor(Math.random() * sizes.length)]
	}

	return (
		<>
			{!state.data && <Loader />}
			{state.data && (
				<>
					<div className={css.productsContainer}>
						<h1>
							{language === 'da-DK' ? 'Produkter:' : 'Products:'}{' '}
							{filters.category ? (
								<>
									{filters.category} [ {filteredProducts?.length ?? 0} ]
								</>
							) : filters.color ? (
								<>
									{filters.color} [ {filteredProducts?.length ?? 0} ]
								</>
							) : (
								<>All [ {filteredProducts?.length ?? 0} ]</>
							)}
						</h1>
						<div className={css.products}>
							<AnimatePresence>
								{filteredProducts?.map((product: any) => (
									<motion.div key={product.id} layout className={css.product} data-size={getRandomSize()}>
										<Product key={product.id} data={product} />
									</motion.div>
								))}
							</AnimatePresence>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default Products
