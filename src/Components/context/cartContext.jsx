import { createContext, useState } from "react";
import { toast } from 'react-toastify';

export const CartContext = createContext([]);
function notification(message) {
    toast(message, {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
    });
}
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addItem(item, quantity) {
        const newItem = { ...item, quantity: quantity };
        if (isInCart(item)) {
            const updatedCartItems = cartItems.map(cartItem => {
                if (cartItem.id === newItem.id) {
                    if (cartItem.quantity + quantity > getMaxStock()) {
                        return cartItem; 
                    } else {
                        return { ...cartItem, quantity: cartItem.quantity + quantity };
                    }
                }
                return cartItem;
            });
            const itemInCart = updatedCartItems.find(product => product.id === item.id);
            setCartItems(updatedCartItems);
            if (itemInCart.quantity === 0) {
                removeItem(newItem);
            }
            (quantity == 1) ? 
            notification(`"${itemInCart.title}" New quantity: ${itemInCart.quantity}`)
                :
            (itemInCart.quantity != 0) ? 
            notification(`"${itemInCart.title}" New quantity: ${itemInCart.quantity}`)
                    :
                notification(`You delete "${itemInCart.title}" from the cart`);
        } else if (quantity != -1){
            setCartItems([...cartItems, newItem]); 
            notification(`"${item.title}" added to the cart`)
        }
    }

    function removeItem(userItem) {
        setCartItems(prevCartItems => prevCartItems.filter((item) => item.id !== userItem.id));
    }

    function clear() {
        setCartItems([]);
    }

    function isInCart(userItem) {
        return cartItems.some((item) => item.id === userItem.id);
    }

    function getQuantity(userItem) {
        if(isInCart(userItem)) {
            return cartItems.find(product => product.id === userItem.id).quantity;
        } else {
            return 0;
        }
    }

    function getMaxStock() {
        return 5;
    }
    function getTotalPrice() {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    function getTotalItems() {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }
    return (
        <CartContext.Provider value={{cartItems, addItem, removeItem, clear, isInCart, getQuantity, getMaxStock, getTotalPrice, getTotalItems}}> {children} </CartContext.Provider>
    );
}