import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import quote from "../images/icons/card.png";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("https://yourbestbloggi.onrender.com/blogs/all")
      .then((response) => {
        //Edited here
        if (response.data.success) {
          setBlogs(response.data.blogs);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid">
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="col">
              <div
                className="blockquote blockquote-custom bg-white p-5 shadow rounded"
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
                    <Link className="text-info" to={"/view_blog"} state={blog}>
                      @View
                    </Link>
                  </cite>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
