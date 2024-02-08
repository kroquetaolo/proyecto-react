import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import NavBar from './Components/NavBar/NavBar';
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path='/category/:categoryID' element={<ItemListContainer/>}/>
                <Route path='/item/:itemID' element={<ItemDetailContainer/>}/>
                <Route path='/' element={<ItemListContainer/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
