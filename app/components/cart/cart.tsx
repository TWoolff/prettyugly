'user client'
import { useAppContext } from '../../context'
import Button from '../button/button'
import css from './cart.module.css'

const Cart: React.FC = () => {
    const { state, dispatch } = useAppContext()
    const { cart, isCartVisible } = state

    const handleRemoveFromCart = (id: string, name: string, unit_amount: number, quantity: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { id, name, unit_amount, quantity } })
    }

    if (!isCartVisible) {
        return null;
    } 

    return ( 
        <section className={css.cart}>
            <h2>Cart ({cart.length})</h2>
            <ul>
                {cart.map((item, i) => {
                    return (
                        <li key={i}>
                            <p>{item.name}</p>
                            <p>{item.unit_amount/100},00 kr.</p>
                            <p>{item.quantity}</p>
                            <Button onClick={() => handleRemoveFromCart(item.id, item.name, item.unit_amount, item.quantity)} title='Remove' className={css.btn}/>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default Cart