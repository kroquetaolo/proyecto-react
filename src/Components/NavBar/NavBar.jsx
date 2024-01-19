import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavBar = () => {
    return (
        <div className='navBarContainer'>
            <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#racks">Racks</a></li>
                <li><a href="#muebles">Muebles</a></li>
                <li><a href="#redes">Redes Sociales</a></li>
                <li><a href="#contacto">Contactanos</a></li>
                <li className='cartIcon'><a href="#contacto"><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /></a></li>
            </ul>
        </div>
    )
}

export default NavBar
