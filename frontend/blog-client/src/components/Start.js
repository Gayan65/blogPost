import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import imgOne from "../images/imgStart.jpg";
import NavBar from "./NavBar";

function Start() {
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <div>
      <NavBar auth={false} />
      <div className="container-fluid">
        <div className="container custom-body">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src={imgOne}
                className="d-block mx-lg-auto img-fluid"
                alt="Bootstrap Themes"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h1 className="fs-1 mb-4 ">Your Bloggi,</h1>
              <p className="lead fs-5 lh-base mb-4 ">
                With Bloggi, you can effortlessly compose, edit, and manage your
                blog posts, making it easier than ever to share your thoughts,
                stories, and ideas with the world. Whether you're a seasoned
                blogger or just starting your journey, Bloggi empowers you to
                craft and maintain your online presence with simplicity and
                style."
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link
                  className="btn btn-primary btn-lg px-4 me-md-2"
                  to={"/login"}
                >
                  Sign in
                </Link>
                <Link
                  className="btn btn-outline-primary btn-lg px-4"
                  to={"/register"}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start;
