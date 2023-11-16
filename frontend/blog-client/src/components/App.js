import React from "react";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Start from "./Start";
import UserBlog from "./UserBlog";
import CreateBlog from "./CreateBlog";
import Blog from "./Blog";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./AboutUs";
import Products from "./Products";
import Footer from "./Footer";
import ViewBlog from "./ViewBlog";
import Profile from "./Profile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/user/blogs" element={<UserBlog />}></Route>
          <Route path="/user/create_blog" element={<CreateBlog />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/about_us" element={<AboutUs />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/view_blog" element={<ViewBlog />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
