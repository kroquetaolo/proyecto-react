import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import NavBar from './Components/NavBar/NavBar';
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';
import { CartProvider } from './Components/Context/CartContext';
import CartWidget from './Components/CartWidget/CartWidget';
import ScrollToTop from './Components/ScrollToTop';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Checkout from './Components/Checkout/Checkout';

function App() {
    return (
        <React.Fragment>
            {/* Provides Cart context to the entire application. */}
            <CartProvider>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        {/*Routes for different parts of the application. */}
                        <Route path='/category/:categoryID' element={<ItemListContainer />} />
                        <Route path='/item/:itemID' element={<ItemDetailContainer />} />
                        <Route path='/' element={<ItemListContainer />} />
                        <Route path='/cart' element={<CartWidget />} />
                        <Route path='/cart/checkout' element={<Checkout />} />
                    </Routes>
                    <footer> The products are not real and the images were generated using artificial intelligence. </footer>
                    <ScrollToTop />
                </BrowserRouter>
            </CartProvider>
            {/* Configuration for notifications when adding products to the cart. */}
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
