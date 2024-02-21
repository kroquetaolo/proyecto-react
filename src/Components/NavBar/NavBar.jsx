import { Link } from 'react-router-dom'
import './NavBar.css'
import logo from '../../assets/logo.png'
import { LuShoppingCart } from 'react-icons/lu'
import { useContext } from 'react'
import { CartContext } from '../context/cartContext'

const NavBar = () => {

    const {cartItems} = useContext(CartContext);
    return (
        <header className='navBarContainer'>
            <div className='navBarLogo'>
                <Link to='/'> <img src={logo} alt="logo"/> </Link>
                <Link className='navBarLogoText' to='/'> Unique Nock </Link>
            </div>
            <Link to='/cart/' className="cartIcon"> <p className='cartNumber'>{cartItems.length}</p> <LuShoppingCart/></Link>
            
        </header>
    )
}
export default NavBar
