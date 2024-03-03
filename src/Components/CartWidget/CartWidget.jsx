import { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import './CartWidget.css'
import { AiOutlineStop } from "react-icons/ai";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import cartEmpty from "../../assets/cart-empty.jpeg"
import { Link } from 'react-router-dom';

const CartWidget = () => {
    const {cartItems, addItem, getQuantity, getTotalPrice, getTotalItems} = useContext(CartContext);
    const [notificationActive, setNotificationActive] = useState(false);
    const maxStockReach = () => {
        if(!notificationActive){
            toast.warn("Maximum stock reached", {
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                onClose: () => setNotificationActive(false)
            });
            setNotificationActive(true);
        }
    }


    return (
        <div className='cart-container'>
            {cartItems.length == 0 ? 
            <div className='cart-empty'>
                <img src={cartEmpty} alt="your cart is empty" />
                <h1>Time to start shopping!</h1>
                <p>Fill it up with these incredible products.</p>
                <Link to='/'>HOME PAGE</Link>
            </div> 
            : 
            <div className='cart'>
                <div className='cart-items-container'>
                    <div className='cart-item'>
                        <p>Product</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Subtotal</p>
                    </div>
                    {cartItems.map((cartItem) => (
                        <div key={cartItem.id} className='cart-item'>
                            <p>
                                {cartItem.title}
                            </p>
                            <p>
                                ${cartItem.price}
                            </p>
                            <div className='cart-item-button'>
                                {getQuantity(cartItem) == cartItem.stock ?
                                    <button className='cart-item-button-maxstock' onClick={ maxStockReach }><AiOutlineStop/></button>
                                    :
                                    <button onClick={() => addItem(cartItem, 1)}><FaPlus/></button>
                                }
                                <p>{cartItem.quantity}</p>
                                {cartItem.quantity === 1 ? 
                                <button className='cart-item-button-trash' onClick={() => addItem(cartItem, -1)}> <FaTrashAlt/> </button>
                                    :
                                <button onClick={() => addItem(cartItem, -1)}> <FaMinus/></button>
                                }
                            </div>
                            <p>
                                ${(cartItem.price * cartItem.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>
                <div className='cart-total-container'>
                    <div className='cart-total'>
                        <h2>Total: ${getTotalPrice().toFixed(2)}</h2>
                        <p>Items: {getTotalItems()}</p>
                    </div>
                    <div className='cart-total-buttons'>
                        <Link to='checkout'>CHECKOUT</Link>
                        <Link to='/'>Continue Shopping</Link>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default CartWidget;
