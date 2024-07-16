import { useEffect } from 'react'
import { useAppContext } from '@/app/context'
import { getProducts } from '@/app/utils/getProducts'
import Product from './product'
import Filter from '../filter/filter'
import css from './product.module.css'
import Loader from '../loader/loader'

const Products: React.FC = () => {
    const { state, dispatch } = useAppContext()
    const { filters: { category } } = state

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts()
            if (data) {
                dispatch({ type: 'SET_STATE', payload: { data } })
            }
        }
        if (!state.data) fetchData()
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
            {!state.data && <Loader />}
            {state.data && (
                <section>
                    <Filter />
                    <h1>
                        Products:{' '}
                        {category ? (
                            <>
                                {category} [ {filteredProducts.length} ]
                            </>
                        ) : (
                            <>All [ {filteredProducts.length} ]</>
                        )}
                    </h1>
                    <div className={css.products}>
                        {filteredProducts?.map(
                            (product: {
                                id: string
                                slug: string
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
                                <Product
                                    key={product.id}
                                    data={{
                                        ...product,
                                        unit_amount: product.unit_amount || 0,
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
                            )
                        )}
                    </div>
                </section>
            )}
        </>
    )
}

export default Products
