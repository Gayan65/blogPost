import axios from "axios";
import React, { useEffect, useState } from "react";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/blogs/all")
      .then((response) => {
        //Edited here
        if (response.data.success) {
          console.log(response.data.blogs);
          setBlogs(response.data.blogs);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid body-custom-css">
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="col">
              <div className="card mb-3" style={{ maxWidth: "18rem" }}>
                <div className="card-header">From {blog.user.username} </div>
                <div className="card-body">
                  <h5 className="card-title">{blog.title} </h5>
                  <p className="card-text"> {blog.content} </p>
                </div>
                <div className="card-footer">Footer</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
