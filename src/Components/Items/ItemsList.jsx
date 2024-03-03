import Item from './Item';
import './Items.css'

const ItemsList = ({ productsList }) => {

    return (
        <div className='content'>
            {productsList.map((product) => (
                <Item key={product.id} itemProduct={product} />
            ))}
        </div>
    );
};

export default ItemsList;
