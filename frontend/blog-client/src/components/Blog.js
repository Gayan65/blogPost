import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import NavBar from "./NavBar";

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
          <div className="ms-4 mt-5 ">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <form>
                  <h5 className="card-title">
                    <input
                      type="text"
                      value={titleValue}
                      onChange={(e) => setTileValue(e.target.value)}
                      name="title"
                    />
                  </h5>
                  <p className="card-text">
                    Content :
                    <input
                      type="text"
                      value={contentValue}
                      onChange={(e) => setContentValue(e.target.value)}
                      name="content"
                    />
                  </p>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="ms-4 mt-5 ">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">
                  {titleValue.length > 0 ? titleValue : title}
                </h5>
                <p className="card-text">
                  {contentValue.length > 0 ? contentValue : content}
                </p>
              </div>
            </div>
          </div>
        )}
        {editClicked ? (
          <button className="btn btn-success " onClick={handleClickOk}>
            Ok
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleClickEdit}>
            Edit
          </button>
        )}
        <button className="btn btn-danger" onClick={handleClickDelete}>
          Delete
        </button>
      </div>
    );
  }
}

export default Blog;
