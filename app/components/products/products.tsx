import Product from './product'
import css from './product.module.css'

type ProductsProps = {
    data: any[]
}

const Products: React.FC<ProductsProps> = ({data}) => {
    return ( 
        <section className={css.products}>
            {data.map((product: any) => {
                return (<Product key={product.product.id} data={product} />)
            })}
        </section>
    )
}

export default Products