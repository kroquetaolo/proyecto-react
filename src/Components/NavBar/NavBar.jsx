import CartWidget from '../CartWidget/CartWidget'
import './NavBar.css'

const NavBar = () => {
    let cartItemsAmount = 0;
    return (
        <div className='navBarContainer'>
            <ul>
                <img src="logo.png" alt="logo"/>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#racks">Racks</a></li>
                <li><a href="#muebles">Muebles</a></li>
                <li><a href="#redes">Redes Sociales</a></li>
                <li><a href="#contacto">Contactanos</a></li>
                <li><a href="#cart"><CartWidget amount={cartItemsAmount}/></a></li>
            </ul>
        </div>
    )
}

export default NavBar
