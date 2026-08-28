
import { Link } from 'react-router-dom'

function Navbar(){
    return(
        <nav>
            <div className="navbar">
                <div className="navbar-logo">
                    <span className="logo-icon"><img src="./public/picafoodlogo.png" alt="" /></span>
                    <span className="logo-text">PicaFood</span>
                </div>
                <div className="navbar-links">
                    <Link to="/home" className="nav-link">Cardápio</Link>
                    <Link to="/pedidos" className="nav-link">Meus Pedidos</Link>
                    <Link to="/carrinho" className="nav-link nav-link-cart">🛒 Carrinho</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
    