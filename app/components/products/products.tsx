import { getProducts } from '@/app/utils/getProducts'
import { useAppContext } from '../../context'
import Filter from '../filter/filter'
import Product from './product'
import css from './product.module.css'
import { useEffect } from 'react'
import Link from 'next/link'

const Products: React.FC = () => {
    const { state, dispatch } = useAppContext()

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts()
            if (data) {
                dispatch({ type: 'SET_STATE', payload: { data } })
            }
        }
        fetchData()
    }, [])

    const filteredProducts = state.data?.filter(
        (product: { product: { metadata: { [x: string]: string } } }) => {
            return Object.entries(state.filters).every(
                ([key, value]) =>
                    value === '' || product.product.metadata[key] === value
            )
        }
    )

    return (
        <>
            {!state.data && <p>Loading...</p>}
            {state.data && (
                <>
                    <Filter data={state.data} />
                    <section className={css.products}>
                        {filteredProducts?.map(
                            (product: {
                                id: any
                                unit_amount?: number
                                product?: {
                                    active: boolean
                                    created: number
                                    default_price: string
                                    images: string[]
                                    marketing_features: string[]
                                    metadata: { [key: string]: string }
                                    id: string
                                    name: string
                                    description: string
                                    productInfo: string
                                }
                            }) => (
                                <Link key={product.id} href={`/products/${product.id}`}><Product key={product.id} data={{ ...product, unit_amount: product.unit_amount || 0, product: product.product || { active: false, created: 0, default_price: '', images: [], marketing_features: [], metadata: {}, id: '', name: '', description: '', productInfo: '' } }} /></Link>
                            )
                        )}
                    </section>
                </>
            )}
        </>
    )
}

export default Products