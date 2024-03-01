import React, { useEffect, useState } from 'react';
import Item from './Item';
import { NavLink } from 'react-router-dom';
import { BiCategory } from "react-icons/bi";
import './Items.css'

const ItemsList = ({ productsList }) => {
    const categories = ["Men's Clothing", "Women's Clothing", "Jewelry"];
    const [loading, setLoading] = useState(true);
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
            { loading ? <div className='loader-container'><span className="loader"></span></div> :
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
