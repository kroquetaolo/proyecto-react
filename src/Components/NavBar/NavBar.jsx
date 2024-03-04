import { Link } from 'react-router-dom'
import './NavBar.css'
import logo from '../../assets/logo.png'
import { LuShoppingCart } from 'react-icons/lu'
import { useContext } from 'react'
import { CartContext } from '../Context/CartContext'
import DarkMode from '../DarkMode/DarkMode'

// Component for the navigation bar.
const NavBar = () => {
    // Accessing cart items from CartContext.
    const { cartItems } = useContext(CartContext);
    return (
        <header className='nav-bar-container'>
            <div className='nav-bar-logo'>
                <Link to='/'> <img src={logo} alt="logo" /> </Link>
                <Link className='nav-bar-logo-text' to='/'> Unique Nock </Link>
            </div>
            <div className='nav-bar-controls'>
                <DarkMode />
                <div className="cart-icon">
                    <p className='cart-number'>{cartItems.length}</p>
                    <Link to='/cart/' className='cart-icon'>
                        <LuShoppingCart />
                    </Link>
                </div>
            </div>

        </header>
    )
}
export default NavBar
