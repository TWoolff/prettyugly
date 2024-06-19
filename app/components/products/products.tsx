import { useAppContext } from '../../context'
import Filter from '../filter/filter'
import Product from './product'
import css from './product.module.css'

type ProductsProps = {
    data: any[]
}

const Products: React.FC<ProductsProps> = ({ data }) => {
    const { state } = useAppContext();

    console.log(state)

    const filteredProducts = data.filter((product) => {
        return Object.entries(state.filters).every(
            ([key, value]) => value === "" || product.product.metadata[key] === value
        )
    })

    return (
        <>
            <Filter data={data} />
            <section className={css.products}>
                {filteredProducts.map((product) => (
                    <Product key={product.id} data={product} />
                ))}
            </section>
        </>
    )
}

export default Products
