import React, { useEffect, useState } from 'react';
import './ItemListContainer.css';
import { useParams } from 'react-router-dom';
import ItemsList from '../Items/ItemsList';

const ItemListContainer = () => {
    const { categoryID } = useParams();

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (categoryID === undefined) {
                    setProducts(data);
                    console.log("Productos establecidos correctamente");
                } else {
                    const dataFilter = data.filter((item) => {
                        return item.category === categoryID;
                    });
                    setProducts(dataFilter);
                }
            })
            .catch((err) => console.error(err));
    }, [categoryID]);
    return (
        <React.Fragment>
            <div className='itemListContainer'>
                <ItemsList productsList={products} />
            </div>
        </React.Fragment>
    );
};

export default ItemListContainer;
