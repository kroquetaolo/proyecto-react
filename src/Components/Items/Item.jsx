import { useContext, useMemo, useState } from 'react';
import { Link } from "react-router-dom";
import { CartContext } from '../context/cartContext'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { AiOutlineStop } from "react-icons/ai";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Item = ({ itemProduct }) => {
    const {addItem, getQuantity, getMaxStock, isInCart} = useContext(CartContext);
    const [notificationActive, setNotificationActive] = useState(false);
    const shortText = useMemo(() => (texto, int) => {
        return texto.length > int ? `${texto.substring(0, int)}...` : texto;
    }, []);
    const itemNotInCart = () => {
        if(!notificationActive){toast.warn("Item is not in cart", {
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
    }}
    const maxStockReach = () => {
        if(!notificationActive){toast.error("Maximum stock reached", {
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            onClose: () => setNotificationActive(false)
        });
        setNotificationActive(true);
    }}

    return (
        <div className='item'>
            <Link className='item-img' to={`/item/${itemProduct.id}`}><img src={itemProduct.image} alt='product image'/></Link>
            <div className='item-title'>
                <h3>{shortText(itemProduct.title, 45)}</h3>
                <p>{shortText(itemProduct.description, 50)} <Link to={`/item/${itemProduct.id}`}>read more</Link></p>
            </div>
            <div className='item-category'>{itemProduct.category}</div>
            <div className='item-price'>
                <p>Price:</p>
                <p>${itemProduct.price}</p>
            </div>
            
            <div className='item-cart'>
                {getQuantity(itemProduct) == getMaxStock() ?
                    <button className='item-cart-redbutton' onClick={maxStockReach}> <AiOutlineStop/> </button>
                    :
                    <button onClick={() => addItem(itemProduct, 1)}> <FaPlus/> </button>
                }
                <p> {getQuantity(itemProduct)} </p>
                {!isInCart(itemProduct) ? 
                    <button className='item-cart-redbutton' onClick={itemNotInCart}> <AiOutlineStop /></button>
                    :
                    <button onClick={() => addItem(itemProduct, -1)}> <FaMinus/> </button>
                }
            </div>
        </div>
    );
};

export default Item;
