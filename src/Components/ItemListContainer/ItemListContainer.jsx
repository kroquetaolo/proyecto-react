import { useEffect, useState } from 'react';
import './ItemListContainer.css';
import { useParams } from 'react-router-dom';
import ItemsList from '../Items/ItemsList';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

const ItemListContainer = () => {
    const { categoryID } = useParams();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const productRef = collection(db, 'products');
        const dataQuery = categoryID === undefined ? productRef : query(productRef, where("category", "==", categoryID));
        getDocs(dataQuery)
            .then(collection => {
                const products = collection.docs.map(doc => doc.data());
                setProducts(products);
            }).catch(err => console.error(err));
    }, [categoryID]);

    return (
        <div className='itemListContainer'>
            <ItemsList productsList={products} />
        </div>
    );
};

export default ItemListContainer;
