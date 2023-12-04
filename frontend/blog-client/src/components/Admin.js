import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";

function Admin() {
  const navigate = useNavigate();

  let user = sessionStorage.getItem("user");
  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (user === "" || user === null) {
      navigate("/login");
      setAuth(false);
    } else {
      const userObj = JSON.parse(user);
      if (userObj.admin) {
        setAuth(true);
        setAdmin(true);
        axios
          .get("http://localhost:4000/users/all")
          .then((response) => {
            setUsers(response.data.allUsers);
          })
          .catch((err) => console.log(err));

        axios
          .get("http://localhost:4000/blogs/all")
          .then((response) => {
            setBlogs(response.data.blogs);
            console.log(response.data.blogs);
          })
          .catch((err) => console.log(err));

        axios
          .get("http://localhost:4000/comments/all")
          .then((response) => {
            setComments(response.data.comments);
            console.log(response.data.comments);
          })
          .catch((err) => console.log(err));
      } else {
        navigate("/home");
      }
    }
    // eslint-disable-next-line
  }, []);
  const userObj = JSON.parse(user);

  async function handdleDeleteComment(e) {
    console.log("Dleteclicked");
    console.log(e.target.value);
    const commentId = e.target.value;
    await axios
      .delete(`http://localhost:4000/comment/delete/${commentId}`)
      .then((response) => {
        console.log(response.data);
        window.location.reload(false);
        alert(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <NavBar
        auth={true}
        user={auth ? userObj.nickName : null}
        admin={admin ? userObj.admin : null}
      />
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Users
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  {users.map((userItem) => {
                    return (
                      <div key={userItem._id} className="card my-2 ">
                        <div className="card-body">
                          <h5 className="card-title"> {userItem.username} </h5>
                          <div className="card-text">
                            <p>{userItem._id}</p>
                            <p>{userItem.fname}</p>
                          </div>
                          {userItem.admin === false ? (
                            <button className="btn btn-primary">Delete</button>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Blogs
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="col-sm-6 mb-3 mb-sm-0">
                {blogs.map((blogItem) => {
                  return (
                    <div key={blogItem._id} className="card my-2 ">
                      <div className="card-body">
                        <h5 className="card-title"> {blogItem.title} </h5>
                        <div className="card-text">
                          <p>{blogItem.content}</p>
                        </div>

                        <button className="btn btn-primary">Delete</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Comments
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="col-sm-6 mb-3 mb-sm-0">
                {comments.map((commentItem) => {
                  return (
                    <div key={commentItem._id} className="card my-2 ">
                      <div className="card-body">
                        <h5 className="card-title"> Comment </h5>
                        <div className="card-text">
                          <p>{commentItem.content}</p>
                        </div>

                        <button
                          className="btn btn-primary"
                          onClick={handdleDeleteComment}
                          value={commentItem._id}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
