import { LuShoppingCart } from "react-icons/lu";

const CartWidget = ({amount}) => {
    return (
        <>
            <LuShoppingCart /> {amount}
        </>
    )
}

export default CartWidget
