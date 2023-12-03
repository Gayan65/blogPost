import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Admin() {
  const navigate = useNavigate();

  let user = sessionStorage.getItem("user");
  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (user === "" || user === null) {
      navigate("/login");
      setAuth(false);
    } else {
      const userObj = JSON.parse(user);
      if (userObj.admin) {
        setAuth(true);
        setAdmin(true);
      } else {
        navigate("/home");
      }
    }
    // eslint-disable-next-line
  }, []);
  const userObj = JSON.parse(user);
  return (
    <div>
      <NavBar
        auth={true}
        user={auth ? userObj.nickName : null}
        admin={admin ? userObj.admin : null}
      />
      <h1>Admin Function page</h1>
    </div>
  );
}

export default Admin;
