import { createContext, useState } from "react";


export const CartContext = createContext([]);

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
        } else if (quantity != -1){
            setCartItems([...cartItems, newItem]); 
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

    return (
        <CartContext.Provider value={{cartItems, addItem, removeItem, clear, isInCart, getQuantity, getMaxStock}}> {children} </CartContext.Provider>
    );
}