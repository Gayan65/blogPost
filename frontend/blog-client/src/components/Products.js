import React from "react";
import NavBar from "./NavBar";

function Products() {
  let user = sessionStorage.getItem("user");
  const userObj = JSON.parse(user);
  if (userObj) {
    return (
      <div>
        <NavBar auth={true} user={userObj.username} />
        <h1>Products</h1>
      </div>
    );
  } else {
    return (
      <div>
        <NavBar auth={false} />
        <h1>Products</h1>
      </div>
    );
  }
}
export default Products;
