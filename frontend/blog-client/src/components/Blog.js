import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import NavBar from "./NavBar";
import quote from "../images/icons/card.png";

function Blog() {
  const [editClicked, setEditClicked] = useState(false);
  const [titleValue, setTileValue] = useState("");
  const [contentValue, setContentValue] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [_id, setId] = useState("");

  let { state } = useLocation();

  //console.log(user.username);

  const [auth, setAuth] = useState(false);
  let user = sessionStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (user === "" || user === null) {
      navigate("/login");
      setAuth(false);
    } else {
      setAuth(true);
      if (state) {
        const { title, content, _id } = state;
        setTitle(title);
        setContent(content);
        setId(_id);
      } else {
        navigate("/home");
      }
    }
    // eslint-disable-next-line
  }, []);

  const userObj = JSON.parse(user);

  async function handleClickDelete() {
    await axios
      .delete(`http://localhost:4000/user/blog/${_id}`)
      .then((response) => {
        console.log(response.data);
        navigate("/user/blogs");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleClickEdit() {
    setEditClicked(true);
    setTileValue(title);
    setContentValue(content);
  }

  function handleBackClicked() {
    navigate("/user/blogs");
  }

  async function handleClickOk() {
    console.log(titleValue, contentValue);

    const data = qs.stringify({
      title: titleValue,
      content: contentValue,
    });

    await axios
      .patch(`http://localhost:4000/blog/update/${_id}`, data)
      .then((response) => {
        console.log(response.data);
        setEditClicked(false);
      })
      .catch((error) => console.log(error));
  }
  if (auth) {
    return (
      <div>
        <NavBar auth={true} user={auth ? userObj.username : null} />
        {editClicked ? (
          <div className="ms-4 mt-5 blockquote blockquote-custom bg-white p-5 shadow rounded custom-card container">
            <div className="blockquote-custom-icon bg-info shadow-sm">
              <img
                src={quote}
                style={{ width: "50px", height: "50px" }}
                alt="quote"
              />
            </div>
            <div className="card-body">
              <form>
                <h5>
                  <input
                    type="text"
                    value={titleValue}
                    onChange={(e) => setTileValue(e.target.value)}
                    name="title"
                    className="input-edit-blog-title"
                  />
                </h5>
                <p>
                  <textarea
                    type="text"
                    value={contentValue}
                    onChange={(e) => setContentValue(e.target.value)}
                    name="content"
                    className="input-edit-blog-title textarea-custom"
                  />
                </p>
              </form>
            </div>
          </div>
        ) : (
          <div className="ms-4 mt-5 blockquote blockquote-custom bg-white p-5 shadow rounded custom-card container ">
            <div className="blockquote-custom-icon bg-info shadow-sm">
              <img
                src={quote}
                style={{ width: "50px", height: "50px" }}
                alt="quote"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">
                {titleValue.length > 0 ? titleValue : title}
              </h5>
              <p className="card-text">
                {contentValue.length > 0 ? contentValue : content}
              </p>
            </div>
          </div>
        )}

        <button
          className="btn btn-outline-primary ms-5"
          onClick={handleBackClicked}
        >
          Back
        </button>
        {editClicked ? (
          <button className="btn btn-primary ms-2" onClick={handleClickOk}>
            Ok
          </button>
        ) : (
          <button className="btn btn-primary ms-2" onClick={handleClickEdit}>
            Edit
          </button>
        )}
        <button className="btn btn-danger ms-2" onClick={handleClickDelete}>
          Delete
        </button>
      </div>
    );
  }
}

export default Blog;
