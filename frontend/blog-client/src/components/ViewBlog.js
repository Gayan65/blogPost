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
          .get(`http://localhost:4000/blog/${state._id}`)
          .then((response) => {
            setBlog(response.data.blog[0]);
            setBlogUser(response.data.blog[0].user.username);
            if (response.data.blog[0].comment.length > 0) {
              // Have to go from here, I think need to implement a map function here to push the data to setComment and then it can be extracted from comment.
              const coms = response.data.blog[0].comment;
              //console.log(coms);
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
    console.log(content);
    const data = qs.stringify({
      content: content,
      userId: user._id,
      blogId: state._id,
    });
    axios
      .post("http://localhost:4000/add/comment", data)
      .then((response) => {
        console.log(response.data);
        window.location.reload(false);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <NavBar auth={true} user={auth ? userObj.username : null} />
      <div className="ms-4 mt-5 ">
        <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
          <div className="blockquote-custom-icon bg-info shadow-sm">
            <img
              src={quote}
              style={{ width: "50px", height: "50px" }}
              alt="quote"
            />
          </div>
          <p className="mb-0 mt-2 font-italic">"{blog.content}".</p>
          <footer className="blockquote-footer pt-4 mt-4 border-top">
            {blogUser}
            <cite title="Source Title"> {blog.title} </cite>
          </footer>
        </blockquote>
      </div>
      {comments.length > 0
        ? comments.map((comment) => {
            return (
              <div key={comment._id}>
                {comment.content} user: {comment.user.username}
              </div>
            );
          })
        : null}

      <div>
        <form method="POST" onSubmit={handleComment}>
          <input onChange={(e) => setContent(e.target.value)} />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}

export default ViewBlog;
