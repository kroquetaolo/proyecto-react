import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import NavBar from './Components/NavBar/NavBar';
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';
import { CartProvider } from './Components/context/cartContext';
import CartWidget from './Components/CartWidget/CartWidget';
import ScrollToTop from './Components/ScrollToTop';

function App() {
    return (
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
    );
}

export default App;
