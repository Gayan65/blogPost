import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import qs from "qs";

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
        const data = qs.stringify({
          userId: "65456e79ba85a9e0c9d1cdb9",
        });
        axios
          .post("http://localhost:4000/blogs/user", data)
          .then((response) => {
            console.log(response);
          });
      } else {
        //Navigate to home
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <NavBar auth={true} user={auth ? userObj.username : null} />
      <div>
        Title : {blog._id}
        Content: {blog.content}
      </div>
    </div>
  );
}

export default ViewBlog;
