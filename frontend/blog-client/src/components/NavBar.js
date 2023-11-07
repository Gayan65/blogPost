import React from "react";
import '../styles/main.css';
import {Link} from "react-router-dom";



function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-custom">
            <div className="container">

                <a className="navbar-brand nav-link-custom" href="/"> Bloggi  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chat-left-text-fill" viewBox="0 0 25 25">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
                </svg> </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active nav-link-custom-other" aria-current="page" href="/about_us">About us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active nav-link-custom-other" aria-current="page" href="/products">Products</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <Link className="btn btn-outline-success navbar-btn" to={'/login'}>Sign in</Link>
                    </form>
                    <form className="d-flex" role="search">
                        <Link className="btn btn-outline-success navbar-btn" to={'/register'}>Register</Link>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;