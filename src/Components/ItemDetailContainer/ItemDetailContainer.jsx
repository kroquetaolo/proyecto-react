import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
const ItemDetailContainer = () => {
    const { itemID } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.filter((item) => {
                    if (item.id === parseInt(itemID)) {
                        setProduct(item);
                    }
                });
            })
            .catch((err) => console.error(err));
    }, [itemID]);
    return (
        <React.Fragment>
            <div className='item'>
                <div className='back'><Link to={`/category/${product.category}`}> VOLVER  </Link></div>
                <div className='item-img'>
                    <img
                        src={product.image}
                        alt='product image'
                    />
                </div>
                <div className='item-title'>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                </div>
                <div className='item-category'>{product.category}</div>
                <div className='item-cart'>Add to cart</div>
                <div className='item-price'>${product.price}</div>
            </div>
        </React.Fragment>
    );
};

export default ItemDetailContainer;
