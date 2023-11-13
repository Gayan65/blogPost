import React from "react";
import navlog from "../images/navLogo.png"
import { Link } from "react-router-dom";



function NavBar(props) {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" >
            <div className="container-fluid">
                <a className="navbar-brand" href="/home">
                    <img src={navlog} alt="Logo" width="30" height="25" className="d-inline-block align-text-top mx-2" />
                    Bloggy
                </a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to={'/about_us'}>About Us</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/products'}>Products</Link>
                    </li>
                </ul>
                <div className="d-flex" role="search">
                    <Link className="btn btn-secondary mx-3" to={'/login'}>Sign in</Link>
                    <Link className="btn btn-outline-secondary" to={'/register'}>Register</Link>
                </div>
            </div>
            </div>



        </nav>

    );
}

export default NavBar;