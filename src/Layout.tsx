import { Outlet, Link } from "react-router-dom";
import './layout.css';
import {Container} from "@mui/material";

function Layout() {
    return (
        <div>
            <nav className='layout'>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <Link to="/checkout">Checkout</Link>
                    </li>
                </ul>
            </nav>

            <hr/>

            <Container>
                <Outlet/>
            </Container>
        </div>
    );
}

export default Layout;