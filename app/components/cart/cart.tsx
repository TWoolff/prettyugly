'user client'

import { useAppContext } from "../../context";

const Cart = () => {
    const { state, dispatch } = useAppContext()
    const { cart } = state
    console.log(state)

    return ( 
        <section>
            <h2>Cart</h2>
            <ul>
                {cart.map((item, i) => {
                    return (
                        <li key={i}>
                            <p>{item.name}</p>
                            <p>{item.unit_amount/100},00 kr.</p>
                            <p>{item.quantity}</p>
                        </li>
                    )
                })}
            </ul>
        </section>
    );
}

export default Cart