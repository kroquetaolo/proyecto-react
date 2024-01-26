import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CartWidget = ({amount}) => {
    return (
        <>
            {/*<FontAwesomeIcon icon="fa-solid fa-cart-shopping" />*/}
            <FontAwesomeIcon icon="fa-solid fa-basket-shopping" /> {amount}
        </>
    )
}

export default CartWidget
