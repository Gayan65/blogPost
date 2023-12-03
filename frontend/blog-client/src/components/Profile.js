import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";

function Profile() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");

  const [auth, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (user === "" || user === null) {
      navigate("/login");
      setAuth(false);
    } else {
      setAuth(true);
      const userObj = JSON.parse(user);
      const userId = userObj._id;

      axios
        .get(`http://localhost:4000/profile/${userId}`)
        .then((response) => {
          if (response.data.success) {
            setCurrentUser(response.data.user[0]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <NavBar
        auth={true}
        user={auth ? currentUser.nickName : null}
        admin={currentUser.admin}
      />

      <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
        <div className="list-group custom-profile-card container">
          <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 className="mb-0">Username/ Email Address</h6>
                <p className="mb-0 opacity-75">{currentUser.username}</p>
              </div>
            </div>
          </div>
          <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 className="mb-0">Full Name</h6>
                <p className="mb-0 opacity-75">{currentUser.fname}</p>
              </div>
            </div>
          </div>
          <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 className="mb-0">Nick Name</h6>
                <p className="mb-0 opacity-75">{currentUser.nickName}</p>
              </div>
            </div>
          </div>
          <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 className="mb-0">Date Joined</h6>
                <p className="mb-0 opacity-75">{currentUser.createDate}</p>
              </div>
            </div>
          </div>
          <div className="">
            <div>
              <a href="/home" className="btn btn-outline-primary mt-2 ">
                Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
