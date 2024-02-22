import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import NavBar from './Components/NavBar/NavBar';
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';
import { CartProvider } from './Components/context/CartContext';
import CartWidget from './Components/CartWidget/CartWidget';
import ScrollToTop from './Components/ScrollToTop';
import React from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <React.Fragment>
            <CartProvider>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path='/category/:categoryID' element={<ItemListContainer/>}/>
                    <Route path='/item/:itemID' element={<ItemDetailContainer/>}/>
                    <Route path='/' element={<ItemListContainer/>}/>
                    <Route path='/cart' element={<CartWidget/>}/>
                </Routes>
                <ScrollToTop/>
            </BrowserRouter>
        </CartProvider>
        <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={true}
            draggable={false}
            pauseOnHover={false}
            theme="light"
        />
        </React.Fragment>
    );
}

export default App;
