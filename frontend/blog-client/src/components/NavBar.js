import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  return (
    <nav className="navbar navbar-expand-lg bg-primary sticky-top ">
      <div className="container">
        <a className="navbar-brand nav-link-custom" href="/home">
          {"Bloggi"}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link nav-link-custom-other"
                aria-current="page"
                href="/about_us"
              >
                About us
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link nav-link-custom-other"
                aria-current="page"
                href="/products"
              >
                Products
              </a>
            </li>
          </ul>
          {props.auth ? (
            <div className="dropdown-center">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {props.user}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/user/blogs"}>
                    My blogs
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/user/blogs"}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/user/create_blog"}>
                    Create blog
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/login"}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex">
              <Link className="btn btn-primary navbar-btn" to={"/login"}>
                Sign in
              </Link>
              <Link className="btn btn-primary navbar-btn" to={"/register"}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
