import { Link } from "react-router-dom";

const Item = ({ itemProduct }) => {
    return (
        <div className='item'>
            
            <Link className='item-img' to={`/item/${itemProduct.id}`}><img src={itemProduct.image} alt='product image'/></Link>
            <div className='item-title'>
                <h3>{shortText(itemProduct.title, 45)}</h3>
                <p>{shortText(itemProduct.description, 50)} <Link to={`/item/${itemProduct.id}`}>read more</Link></p>
                
            </div>
            <div className='item-category'>{itemProduct.category}</div>
            <div className='item-price'>
                <p>Price:</p>
                <p>${itemProduct.price}</p>
            </div>
            <div className='item-cart'>Add to cart</div>
        </div>
    );
};

function shortText(texto, int){
    return texto.length > int ? `${texto.substring(0, int)}...` : texto;
}
export default Item;
