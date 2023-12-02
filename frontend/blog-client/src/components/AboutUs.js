import React from "react";
import NavBar from "./NavBar";
import About from "./About";

function AboutUs() {
  let user = sessionStorage.getItem("user");
  const userObj = JSON.parse(user);
  if (userObj) {
    return (
      <div>
        <NavBar auth={true} user={userObj.nickName} />
        <About />
      </div>
    );
  } else {
    return (
      <div>
        <NavBar auth={false} />
        <About />
      </div>
    );
  }
}
export default AboutUs;
