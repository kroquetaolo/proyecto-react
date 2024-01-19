import './ItemListContainer.css'
const ItemListContainer = ({greeting,message}) => {
    return (
        <div className="itemListContainer">
            <h1>{greeting}</h1>
            <p>{message}</p>
        </div>
    )
}

export default ItemListContainer
