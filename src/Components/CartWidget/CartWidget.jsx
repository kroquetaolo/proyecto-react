import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import './CartWidget.css'

const CartWidget = () => {
    
    const {cartItems} = useContext(CartContext);

    return (
        <div className='cart-container'>
            <h1>Carrito de Compras!</h1>
            {cartItems.map((cartItem) => (
                <h1 key={cartItem.id} > {cartItem.title} {">"} {cartItem.quantity}</h1>
            ))}
        </div>
    );
};

export default CartWidget;
