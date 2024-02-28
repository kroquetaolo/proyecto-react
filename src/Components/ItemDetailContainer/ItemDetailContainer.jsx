import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ItemDetailContainer.css'
import { toast } from 'react-toastify';
import { CartContext } from '../Context/CartContext';
import { AiOutlineStop } from 'react-icons/ai';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const ItemDetailContainer = () => {
    const { itemID } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    const {addItem, getQuantity, getMaxStock, isInCart} = useContext(CartContext);
    const [notificationActive, setNotificationActive] = useState(false);

    const itemNotInCart = () => {
        if(!notificationActive){
            toast.warn("Item is not in cart", {
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
        }
    }

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.filter((item) => {
                    if (item.id === parseInt(itemID)) {
                        setProduct(item);
                        setLoading(false)
                    }
                });
            })
            .catch((err) => console.error(err));
    }, [itemID]);
    return (
        <React.Fragment>
            {loading ? <div className='loader-container'><span className="loader"></span></div> :
                <div className='item-detail-container'>
                    <div className='back'><Link to={`/category/${product.category}`}> ◀ GO BACK  </Link></div>
                    <div className='item-detail'>
                        <div className='item-detail-img'>
                            <img src={product.image} alt='product image' />
                        </div>
                        <div className='item-detail-title'>
                            <h3>{product.title}</h3>
                        </div>
                        <div className='item-detail-category'>{product.category}</div>
                        <p className='item-detail-description'>{product.description}</p>
                        <div className='item-detail-price'>
                            <p>Price:</p>
                            <p>${product.price}</p>
                        </div>
                        <div className='item-detail-cart'>
                            {getQuantity(product) == getMaxStock() ?
                                <button className='item-detail-cart-redbutton' onClick={maxStockReach}> <AiOutlineStop/> </button>
                                :
                                <button onClick={() => addItem(product, 1)}> <FaPlus/> </button>
                            }
                            <p> {getQuantity(product)} </p>
                            {!isInCart(product) ? 
                                <button className='item-detail-cart-redbutton' onClick={itemNotInCart}> <AiOutlineStop /></button>
                                :
                                <button onClick={() => addItem(product, -1)}> <FaMinus/> </button>
                            }
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    );
};

export default ItemDetailContainer;