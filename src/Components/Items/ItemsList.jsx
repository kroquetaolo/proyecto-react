import React, { useEffect, useState } from 'react';
import Item from './Item';
import { NavLink } from 'react-router-dom';
import { BiCategory } from "react-icons/bi";
import './Items.css'

const ItemsList = ({ productsList }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(data => {setCategories(data)})
        .catch((err) => console.error(err));
    },[]);

    return (
        <React.Fragment>
            <div className='content'>
                {productsList.map((product) => (
                    <React.Fragment key={product.id}>
                        <Item itemProduct={product} />
                    </React.Fragment>
                ))}
            </div>
            <nav className='categories'>
                <ul>
                    <li><BiCategory /> Categories:</li>
                    <li><NavLink to={'/'}>All</NavLink></li>
                    {categories.map((category) => (
                        <li key={category}>
                            <NavLink to={`/category/${category}`}> {category} </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </React.Fragment>
    );
};

export default ItemsList;
