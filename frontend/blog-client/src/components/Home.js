import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Blogs from "./Blogs";
import NavBar from "./NavBar";

function Home() {
  const navigate = useNavigate();

  let user = sessionStorage.getItem("user");
  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (user === "" || user === null) {
      navigate("/login");
      setAuth(false);
    } else {
      setAuth(true);
      const userObj = JSON.parse(user);
      if (userObj.admin) {
        setAdmin(true);
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
      <Blogs />
    </div>
  );
}

export default Home;
