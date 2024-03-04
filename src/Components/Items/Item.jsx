import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { CartContext } from '../Context/CartContext'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { AiOutlineStop } from "react-icons/ai";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component for rendering a single product from a list of products.
const Item = ({ itemProduct }) => {
    
    // Accessing cart functionalities from CartContext.
    const {addItem, getQuantity, isInCart} = useContext(CartContext);
    // To prevent spamming of notifications for maximum stock and items not in the cart.
    const [notificationActive, setNotificationActive] = useState(false);

    const itemNotInCart = () => {
        if(!notificationActive){
            toast.warn("Item is not in cart", {... toastOptions});
            setNotificationActive(true);
        }
    }
    const maxStockReach = () => {
        if(!notificationActive){
            toast.error("Maximum stock reached", {...toastOptions});
            setNotificationActive(true);
        }
    }
    const toastOptions = {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        onClose: () => setNotificationActive(false)
    }

    return (
        <div className='item'>
                <Link className='item-img' to={`/item/${itemProduct.id}`}>
                    <img src={`/products/${itemProduct.category}/01${itemProduct.title}.jpeg`} alt={itemProduct.title}/>
                </Link>
            <div className='item-title'>
                <h3>{itemProduct.title}</h3>
                <p>{shortText(itemProduct.description, 50)} <Link to={`/item/${itemProduct.id}`}>read more</Link></p>
            </div>
            <div className='item-category'>{itemProduct.category}</div>
            <div className='item-color'>
                <p>Color: </p>
                <div className='item-color-hex' style={{backgroundColor: itemProduct.color}}></div>
            </div>
            <div className='item-price'>
                <p>Price:</p>
                <p>${itemProduct.price}</p>
            </div>
            
            <div className='item-cart'>
                {itemProduct.stock === 0 ? 
                    <div className='item-cart-nostock'> Out of Stock</div> :
                    <React.Fragment>
                        {getQuantity(itemProduct) === itemProduct.stock ?
                            <button className='item-cart-redbutton' onClick={maxStockReach}> <AiOutlineStop/> </button>
                            :
                            <button className='item-cart-greenbutton' onClick={() => addItem(itemProduct, 1)}> <FaPlus/> </button>
                        }
                        <p> {getQuantity(itemProduct)} </p>
                        {!isInCart(itemProduct) ? 
                            <button className='item-cart-redbutton' onClick={itemNotInCart}> <AiOutlineStop /></button>
                            :
                            <button className='item-cart-greenbutton' onClick={() => addItem(itemProduct, -1)}> <FaMinus/> </button>
                        }
                    </React.Fragment>
                }
            </div>
        </div>
    );
};
// Function to shorten the item description text for improved aesthetics.
function shortText(texto, int) {
    return texto.length > int ? `${texto.substring(0, int)}...` : texto;
}

export default Item;
