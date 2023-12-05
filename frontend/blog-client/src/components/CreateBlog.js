import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import NavBar from "./NavBar";

function CreateBlog() {
  //Test Comment for new git branch
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState({});
  let user = sessionStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (user === "" || user === null) {
      navigate("/login");
      setAuth(false);
    } else {
      setAuth(true);
    }
    // eslint-disable-next-line
  }, []);

  const userObj = JSON.parse(user);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = qs.stringify({
      title: title,
      content: content,
      userId: userObj._id,
    });

    await axios
      .post("http://localhost:4000/blog/save", data)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));

    setTitle("");
    setContent("");
  }
  return (
    <div>
      <NavBar
        auth={true}
        user={auth ? userObj.nickName : null}
        admin={userObj.admin}
      />

      <div className="body-custom-css">
        <div className="container my-auto">
          <main className="form-blogcreate w-100 mx-auto mt-5 ">
            <form method="POST" onSubmit={handleSubmit}>
              <h1 className="h3 mb-3 fw-normal">Create Blog</h1>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control my-3 custom-input"
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  id="floatingInput"
                  placeholder="Blog Title"
                  value={title}
                  required
                />
                <label htmlFor="floatingInput">Blog Title</label>
              </div>
              <div className="form-floating">
                <textarea
                  type="text"
                  className="form-control mb-3 custom-input textarea-custom"
                  onChange={(e) => setContent(e.target.value)}
                  name="content"
                  value={content}
                  id="floatingInput"
                  placeholder="Blog Content"
                  required
                />
                <label htmlFor="floatingPassword">Blog Content</label>
              </div>
              <button
                className="btn btn-primary w-100 py-2 login-btn"
                type="submit"
              >
                Post
              </button>
            </form>
            {data.success ? (
              <div
                className="alert alert-primary text-center mt-3 "
                role="alert"
              >
                {data.message}
                <a href="/home" className="alert-link">
                  View Blogs
                </a>
                . Give it a click if you like.
              </div>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
