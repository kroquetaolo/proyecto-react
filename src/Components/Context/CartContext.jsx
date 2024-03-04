import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

// Creating a context for managing the shopping cart.
export const CartContext = createContext([]);

// CartProvider component manages the state and actions related to the shopping cart.
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    function addItem(item, quantity) {
        const newItem = { ...item, quantity: quantity };
        
        // Checking if the item is already in the cart.
        if (isInCart(item)) {

            // Updating the quantity if the item is already in the cart.
            const updatedCartItems = cartItems.map(cartItem => {
                //Check if its ID matches the ID of the new item.
                if (cartItem.id === newItem.id) {
                    if (cartItem.quantity + quantity > newItem.stock) { // If the IDs match, update the quantity based on the provided quantity.
                        return cartItem; // If adding more exceeds stock, do not update quantity and return the original item.
                    } else {
                        return { ...cartItem, quantity: cartItem.quantity + quantity }; // Otherwise, update the quantity and return the modified item.
                    }
                }
                return cartItem; // If IDs don't match, return the original item unchanged.
            });

            const itemInCart = updatedCartItems.find(product => product.id === item.id);
            setCartItems(updatedCartItems);
            if (itemInCart.quantity === 0) {
                removeItem(newItem);
            }

            (quantity === 1) ?
                notification(`"${itemInCart.title}" New quantity: ${itemInCart.quantity}`)
                :
                (itemInCart.quantity != 0) ?
                    notification(`"${itemInCart.title}" New quantity: ${itemInCart.quantity}`)
                    :
                    notification(`You delete "${itemInCart.title}" from the cart`);
        } else if (quantity != -1) {
            setCartItems([...cartItems, newItem]);
            notification(`"${item.title}" added to the cart`)
        }
    }

    function removeItem(userItem) {
        setCartItems(prevCartItems => prevCartItems.filter((item) => item.id !== userItem.id));
    }

    function clear() {
        setCartItems([]);
        localStorage.getItem('cartItems') && localStorage.removeItem('cartItems');
    }

    function isInCart(userItem) {
        return cartItems.some((item) => item.id === userItem.id);
    }

    function getQuantity(userItem) {
        return isInCart(userItem) ? cartItems.find(product => product.id === userItem.id).quantity : 0;
    }

    function getTotalPrice() {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    function getTotalItems() {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }
    // Providing cart state and actions through context to its children component
    return (
        <CartContext.Provider value={{ cartItems, addItem, removeItem, clear, isInCart, getQuantity, getTotalPrice, getTotalItems }}> {children} </CartContext.Provider>
    );
}
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