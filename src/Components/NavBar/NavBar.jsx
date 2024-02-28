import { Link } from 'react-router-dom'
import './NavBar.css'
import logo from '../../assets/logo.png'
import { LuShoppingCart } from 'react-icons/lu'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import DarkMode from '../DarkMode/DarkMode'

const NavBar = () => {

    const {cartItems} = useContext(CartContext);
    return (
        <header className='navBarContainer'>
            <div className='navBarLogo'>
                <Link to='/'> <img src={logo} alt="logo"/> </Link>
                <Link className='navBarLogoText' to='/'> Unique Nock </Link>
            </div>
            <div className='navBarControls'>
                <DarkMode/>
                <Link to='/cart/' className="cartIcon"> <p className='cartNumber'>{cartItems.length}</p> <LuShoppingCart/></Link>
            </div>
            
        </header>
    )
}
export default NavBar
