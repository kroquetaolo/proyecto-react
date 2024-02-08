import { Link } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'
import './NavBar.css'
import logo from '../../assets/logo.png'

const NavBar = () => {

    return (
        <header className='navBarContainer'>
            <div className='navBarLogo'>
                <Link to='/'> <img src={logo} alt="logo"/> </Link>
                <Link className='navBarLogoText' to='/'> Unique Nock </Link>
            </div>
            <Link to='/card/' className="cartIcon"> <p className='cartNumber'>0</p> <CartWidget/></Link>
            
        </header>
    )
}
export default NavBar
