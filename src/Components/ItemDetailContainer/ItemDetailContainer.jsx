import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ItemDetailContainer.css'
const ItemDetailContainer = () => {
    const { itemID } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

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
            {loading ? <span className="loader"></span> :
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
                        <div className='item-detail-cart'>Add to cart</div>
                    </div>
                </div>
            }
        </React.Fragment>
    );
};

export default ItemDetailContainer;
