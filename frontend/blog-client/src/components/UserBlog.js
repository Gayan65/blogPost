import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "./NavBar";
import quote from "../images/icons/card.png";

function UserBlog() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [userObj, setUserObj] = useState({});

  const [blogs, setBlogs] = useState([]);
  const user = sessionStorage.getItem("user");

  useEffect(() => {
    if (user === "" || user === null) {
      navigate("/login");
      setAuth(false);
    } else {
      setAuth(true);
      const userObj = JSON.parse(user);
      setUserObj(userObj);
      const userId = userObj._id;
      const data = qs.stringify({
        userId: userId,
      });

      axios
        .post("https://yourbestbloggi.onrender.com/blogs/user", data)
        .then((response) => {
          if (response.data.success) {
            setBlogs(response.data.blogs);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <NavBar
        auth={true}
        user={auth ? userObj.nickName : null}
        admin={userObj.admin}
      />
      <div className="container-fluid body-custom-css">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog._id} className="col">
                  <div
                    className="blockquote blockquote-custom bg-white p-5 shadow rounded mt-5 "
                    style={{ minHeight: "15rem" }}
                  >
                    <div className="blockquote-custom-icon bg-light shadow-sm">
                      <img
                        src={quote}
                        style={{ width: "50px", height: "50px" }}
                        alt="quote"
                      />
                    </div>
                    <div className="mb-0 mt-2 font-italic card-text">
                      <h5>{blog.title} </h5>
                      <p>{blog.content}</p>
                    </div>

                    <footer className="blockquote-footer pt-4 mt-4 border-top">
                      {blog.user.fname}
                      <cite title="Source Title">
                        <Link className="text-info" to={"/blog"} state={blog}>
                          @View
                        </Link>
                      </cite>
                    </footer>
                  </div>
                </div>
              ))
            ) : (
              <div className="alert alert-danger mt-5">
                No blogs to display
                <a href="/user/create_blog" className="alert-link">
                  . Create a blog
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBlog;
