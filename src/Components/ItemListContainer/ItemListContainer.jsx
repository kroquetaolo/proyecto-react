import { useEffect, useState } from 'react';
import './ItemListContainer.css';
import { useParams } from 'react-router-dom';
import ItemsList from '../Items/ItemsList';
import { NavLink } from 'react-router-dom';
import { BiCategory } from "react-icons/bi";
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

const ItemListContainer = () => {
    const { categoryID } = useParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const categories = ["Men's Clothing", "Women's Clothing", "Jewelry"];

    useEffect(() => {
        const db = getFirestore();
        const productRef = collection(db, 'products');
        const dataQuery = categoryID === undefined ? productRef : query(productRef, where("category", "==", categoryID));
        setLoading(true)
        getDocs(dataQuery)
            .then(collection => {
                const products = collection.docs.map(doc => doc.data());
                setLoading(false)
                setProducts(products);
            }).catch(err => console.error(err));
    }, [categoryID]);

    return (
        <div className='item-list-container'>
            {loading ? <div className='loader-container'><span className="loader"></span></div> :
                <ItemsList productsList={products} />
            }

            <nav className='categories'>
                <ul>
                    <li><BiCategory /> Categories:</li>
                    <li><NavLink to='/'>All</NavLink></li>
                    {categories.map((category) => (
                        <li key={category}>
                            <NavLink to={`/category/${category}`}>{category}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default ItemListContainer;
