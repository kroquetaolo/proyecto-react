import Item from './Item';
import './Items.css'

// Component for rendering a list of items.
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
