import { useEffect } from 'react'
import { useAppContext } from '@/app/context'
import { getProducts } from '@/app/utils/getProducts'
import Product from './product'
import Filter from '../filter/filter'
import css from './product.module.css'
import Loader from '../loader/loader'

const Products: React.FC = () => {
    const { state, dispatch } = useAppContext()
    const { filters } = state

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
        (product: { product: { name: string; metadata: { [key: string]: string } } }) => {
            return Object.entries(filters).every(
                ([key, value]) => {
                    if (value === '') return true
                    if (key === 'color') {
                        const colors = product.product.metadata[key]?.split(',').map(c => c.trim().toLowerCase()) || []
                        return colors.includes(value.toLowerCase())
                    }
                    if (key === 'search') {
                        const searchWords = value.toLowerCase().split(' ').filter(word => word.length > 0)
                        const name = product.product.name.toLowerCase()
                        const metadataValues = Object.values(product.product.metadata).map(val => val.toLowerCase())

                        return searchWords.every(word =>
                            name.includes(word) ||
                            metadataValues.some(metadataValue => metadataValue.includes(word))
                        )
                    }
                    return product.product.metadata[key] === value
                }
            )
        }
    )

    return (
        <>
            {!state.data && <Loader />}
            {state.data && (
                <div>
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
                </div>
            )}
        </>
    )
}

export default Products
