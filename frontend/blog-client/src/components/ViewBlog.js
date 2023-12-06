import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import qs from "qs";
import quote from "../images/icons/card.png";

function ViewBlog() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [userObj, setUserObj] = useState({});
  const [blog, setBlog] = useState({});
  const [blogUser, setBlogUser] = useState();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState({});
  let { state } = useLocation();

  //const [blogs, setBlogs] = useState([]);
  const currentUser = sessionStorage.getItem("user");
  const user = JSON.parse(currentUser);

  useEffect(() => {
    if (currentUser === "" || currentUser === null) {
      navigate("/login");
      setAuth(false);
    } else {
      setAuth(true);
      const userObj = JSON.parse(currentUser);
      setUserObj(userObj);
      if (state) {
        axios
          .get(`https://yourbestbloggi.onrender.com/blog/${state._id}`)
          .then((response) => {
            setBlog(response.data.blog[0]);
            setBlogUser(response.data.blog[0].user.fname);
            if (response.data.blog[0].comment.length > 0) {
              const coms = response.data.blog[0].comment;
              setComments(coms);
            }
          });
      } else {
        navigate("/home");
      }
    }
    // eslint-disable-next-line
  }, []);

  function handleComment(event) {
    event.preventDefault();
    const data = qs.stringify({
      content: content,
      userId: user._id,
      blogId: state._id,
    });
    axios
      .post("https://yourbestbloggi.onrender.com/add/comment", data)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <NavBar
        auth={true}
        user={auth ? userObj.nickName : null}
        admin={userObj.admin}
      />
      <div className="ms-4 mt-5 ">
        <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded custom-card">
          <div className="blockquote-custom-icon bg-info shadow-sm">
            <img
              src={quote}
              style={{ width: "50px", height: "50px" }}
              alt="quote"
            />
          </div>
          <div>
            <p className="mb-0 mt-2 font-italic">"{blog.content}".</p>
          </div>
          <footer className="blockquote-footer pt-4 mt-4 border-top">
            {blogUser}
            <cite title="Source Title"> {blog.title} </cite>
          </footer>
          {comments.length > 0
            ? comments.map((comment) => {
                return (
                  <div key={comment._id} className="comment-custom container ">
                    <div className="comment">{comment.content}</div>
                    <div className="comment-user">
                      ~{comment.user.nickName}~
                    </div>
                  </div>
                );
              })
            : null}

          <div className="input-comment-container">
            <form method="POST" onSubmit={handleComment}>
              <input
                className="input-comment"
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add comment"
              />
              <button className="btn btn-outline-secondary" type="submit">
                Post
              </button>
            </form>
          </div>
        </blockquote>
      </div>
    </div>
  );
}

export default ViewBlog;
