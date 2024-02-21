import React, { useEffect, useState } from 'react';
import Item from './Item';
import { NavLink } from 'react-router-dom';
import { BiCategory } from "react-icons/bi";
import './Items.css'

const ItemsList = ({ productsList }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(data => {
            setCategories(data)
            console.log("Categorias cargadas");
        })
        .catch((err) => console.error(err));
    },[]);

    const handleCategoryClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 600);
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 600);
    },[])

    return (
        <React.Fragment>
            { loading ? <span className="loader"></span> :
            <div className='content'>
                {productsList.map((product) => (
                    <React.Fragment key={product.id}>
                        <Item itemProduct={product} />
                    </React.Fragment>
                ))}
            </div>
            }
            <nav className='categories'>
                <ul>
                    <li><BiCategory /> Categories:</li>
                    <li><NavLink onClick={handleCategoryClick} to={'/'}>All</NavLink></li>
                    {categories.map((category) => (
                        <li key={category}>
                            <NavLink to={`/category/${category}`} onClick={handleCategoryClick}>{category}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </React.Fragment>
    );
};

export default ItemsList;
