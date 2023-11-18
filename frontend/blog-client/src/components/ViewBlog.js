import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";

function ViewBlog() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [userObj, setUserObj] = useState({});
  const [blog, setBlog] = useState({});
  const [blogUser, setBlogUser] = useState();
  const [comments, setComments] = useState([]);
  let { state } = useLocation();

  //const [blogs, setBlogs] = useState([]);
  const currentUser = sessionStorage.getItem("user");

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

  return (
    <div>
      <NavBar auth={true} user={auth ? userObj.username : null} />
      <div className="ms-4 mt-5 ">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{blog.title}</h5>
            <p className="card-text">{blog.content}</p>
          </div>
          <div className="card-footer">{blogUser}</div>
        </div>
      </div>
      {comments.length > 0
        ? comments.map((comment) => {
            return <div key={comment._id}> {comment.content} </div>;
          })
        : null}
    </div>
  );
}

export default ViewBlog;
