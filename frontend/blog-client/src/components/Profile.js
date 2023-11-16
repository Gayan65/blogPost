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
            console.log(currentUser);
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
      <NavBar auth={true} user={auth ? currentUser.username : null} />
      <div>
        <div className="card">
          <h5 className="card-header">User Profile</h5>
          <div className="card-body">
            <h5 className="card-title"> {currentUser.username} </h5>
            <p className="card-text">Email {currentUser.username}</p>
            <p className="card-text">Full Name {currentUser.fname}</p>
            <p className="card-text">Nick Name {currentUser.nickName}</p>
            <p className="card-text">Date Joined {currentUser.createDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
