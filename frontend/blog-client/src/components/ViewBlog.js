import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
function ViewBlog() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [userObj, setUserObj] = useState({});
  const [blog, setBlog] = useState({});
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
        setBlog(state);
        console.log(blog);
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <NavBar auth={true} user={auth ? userObj.username : null} />
      <div>
        Title : {blog.title}
        Content: {blog.content}
      </div>
    </div>
  );
}

export default ViewBlog;
