import React from "react";
import NavBar from "./NavBar";

function AboutUs() {
  let user = sessionStorage.getItem("user");
  const userObj = JSON.parse(user);
  if (userObj) {
    return (
      <div>
        <NavBar auth={true} user={userObj.username} />
        <h1>About Us</h1>
      </div>
    );
  } else {
    return (
      <div>
        <NavBar auth={false} />
        <h1>About Us</h1>
      </div>
    );
  }
}
export default AboutUs;
