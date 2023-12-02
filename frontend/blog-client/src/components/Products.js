import React from "react";
import NavBar from "./NavBar";
import Product from "./Product";

function Products() {
  let user = sessionStorage.getItem("user");
  const userObj = JSON.parse(user);
  if (userObj) {
    return (
      <div>
        <NavBar auth={true} user={userObj.nickName} />
        <Product />
      </div>
    );
  } else {
    return (
      <div>
        <NavBar auth={false} />
        <Product />
      </div>
    );
  }
}
export default Products;
