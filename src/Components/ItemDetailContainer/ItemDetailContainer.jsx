import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ItemDetailContainer.css'
import { toast } from 'react-toastify';
import { CartContext } from '../Context/CartContext';
import { AiOutlineStop } from 'react-icons/ai';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const ItemDetailContainer = () => {
    const { itemID } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    const { addItem, getQuantity, isInCart } = useContext(CartContext);
    const [notificationActive, setNotificationActive] = useState(false);

    const [imageIndex, setImageIndex] = useState({ grey: [2, 3], thumbnail: 1 });

    const itemNotInCart = () => {
        if (!notificationActive) {
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
        if (!notificationActive) {
            toast.error("Maximum stock reached", {
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
        const db = getFirestore();
        const document = doc(db, "products", itemID);
        getDoc(document).then((snapshot) => {
            setProduct(snapshot.data());
            setLoading(false)
        })
    }, [itemID]);

    function changeIndex(index) {
        const indexMap = {
            "2,3": { 2: { grey: [1, 3], thumbnail: 2 }, 3: { grey: [2, 1], thumbnail: 3 } },
            "2,1": { 2: { grey: [3, 1], thumbnail: 2 }, 1: { grey: [2, 3], thumbnail: 1 } },
            "3,1": { 3: { grey: [2, 1], thumbnail: 3 }, 1: { grey: [3, 2], thumbnail: 1 } },
            "1,3": { 1: { grey: [2, 3], thumbnail: 1 }, 3: { grey: [1, 2], thumbnail: 3 } },
            "1,2": { 1: { grey: [3, 2], thumbnail: 1 }, 2: { grey: [1, 3], thumbnail: 2 } },
            "3,2": { 3: { grey: [1, 2], thumbnail: 3 }, 2: { grey: [3, 1], thumbnail: 2 } }
        };

        const key = imageIndex.grey.join(',');
        const action = indexMap[key][index];
        setImageIndex(action);
    }

    return (
        <React.Fragment>
            {loading ? <div className='loader-container'><span className="loader"></span></div> :
                <div className='item-detail-container'>
                    <div className='back'><Link to={`/category/${product.category}`}> ◀ GO BACK  </Link></div>
                    <div className='item-detail'>
                        <div className='item-detail-img'>
                            <div className='item-detail-img-grey'>
                                {
                                    imageIndex.grey.map((index) => (
                                        <img key={index} onClick={() => changeIndex(index)} src={`/products/${product.category}/0${index}${product.title}.jpeg`} alt={product.title} />
                                    ))
                                }
                            </div>
                            <img className='item-detail-principal-img' src={`/products/${product.category}/0${imageIndex.thumbnail}${product.title}.jpeg`} alt={product.title} />
                        </div>
                        <div className='item-detail-title'>
                            <h3>{product.title}</h3>
                        </div>
                        <div className='item-detail-category'>{product.category}</div>
                        <div className='item-detail-color'>
                                <p className='item-detail-color-text'>Color: </p>
                                <div className='item-detail-color-hex' style={{backgroundColor: product.color}}></div>
                        </div>
                        <p className='item-detail-description'>{product.description}</p>
                        <div className='item-detail-price'>
                            <p>Price:</p>
                            <p>${product.price}</p>
                        </div>
                        <div className='item-detail-cart'>
                            {getQuantity(product) == product.stock ?
                                <button className='item-detail-cart-redbutton' onClick={maxStockReach}> <AiOutlineStop /> </button>
                                :
                                <button onClick={() => addItem(product, 1)}> <FaPlus /> </button>
                            }
                            <p> {getQuantity(product)} </p>
                            {!isInCart(product) ?
                                <button className='item-detail-cart-redbutton' onClick={itemNotInCart}> <AiOutlineStop /></button>
                                :
                                <button onClick={() => addItem(product, -1)}> <FaMinus /> </button>
                            }
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    );
};

export default ItemDetailContainer;