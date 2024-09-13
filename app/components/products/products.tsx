import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/app/context';
import { getProducts } from '@/app/utils/getProducts';
import { getExchangeRate } from '@/app/utils/getExchangeRate';
import Product from './product';
import Filter from '../filter/filter';
import Loader from '../loader/loader';
import css from './product.module.css';

const Products: React.FC = () => {
	const { state, dispatch } = useAppContext();
	const { filters } = state;

	useEffect(() => {
		const fetchData = async () => {
			const data = await getExchangeRate();
			if (data) {
				dispatch({ type: 'SET_STATE', payload: { exchangeRate: data } });
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (state.data) return;
		const fetchData = async () => {
			const data = await getProducts();
			if (data) {
				// @ts-ignore
				const activeProducts = data.filter((item) => item.active === true && item.product.active === true);
				dispatch({ type: 'SET_STATE', payload: { data: activeProducts, hasLoaded: true } });
			}
		};
		fetchData();
	}, []);

	const filteredProducts = state.data?.filter(
		(product: { product: { id: string; name: string; metadata: { [key: string]: string } } }) => {
			return Object.entries(filters).every(([key, value]) => {
				if (value === '') return true;
				if (key === 'color') {
					const colors = product.product.metadata[key]?.split(',').map((c) => c.trim().toLowerCase()) || [];
					return colors.includes(value.toLowerCase());
				}
				if (key === 'search') {
					const searchWords = value
						.toLowerCase()
						.split(' ')
						.filter((word) => word.length > 0);
					const name = product.product.name.toLowerCase();
					const metadataValues = Object.values(product.product.metadata).map((val) => val.toLowerCase());

					return searchWords.every(
						(word) =>
							name.includes(word) || metadataValues.some((metadataValue) => metadataValue.includes(word))
					);
				}
				if (key === 'featured') {
					const featuredIds = value.split(',');
					return featuredIds.includes(product.product.id);
				}
				return product.product.metadata[key] === value;
			});
		}
	);

	const getRandomSize = () => {
		const sizes = ['small', 'medium', 'large'];
		return sizes[Math.floor(Math.random() * sizes.length)];
	};

	return (
		<>
			{!state.data && <Loader />}
			{state.data && (
				<div className={css.productsContainer}>
					<Filter />
					<h1>
						Products:{' '}
						{filters.category ? (
							<>
								{filters.category} [ {filteredProducts.length} ]
							</>
						) : filters.color ? (
							<>
								{filters.color} [ {filteredProducts.length} ]
							</>
						) : (
							<>All [ {filteredProducts.length} ]</>
						)}
					</h1>
					<div className={css.products}>
						<AnimatePresence>
							{filteredProducts?.map(
								(product: {
									id: string;
									slug: string;
									unit_amount?: number;
									product?: {
										active: boolean;
										created: number;
										default_price: string;
										images: string[];
										marketing_features: string[];
										metadata: { [key: string]: string };
										id: string;
										name: string;
										description: string;
										productInfo: string;
									};
								}) => (
									<motion.div
										key={product.id}
										layout
										className={css.product}
										data-size={getRandomSize()}>
										<Product
											key={product.id}
											data={{
												...product,
												unit_amount: product.unit_amount || 0,
												currency: state.currency,
												product: product.product || {
													active: false,
													created: 0,
													default_price: '',
													images: [],
													marketing_features: [],
													metadata: {},
													id: '',
													name: '',
													description: '',
													productInfo: '',
												},
											}}
										/>
									</motion.div>
								)
							)}
						</AnimatePresence>
					</div>
				</div>
			)}
		</>
	);
};

export default Products;
