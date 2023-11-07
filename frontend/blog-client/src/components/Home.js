import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Blogs from "./Blogs";

function Home() {
    const navigate = useNavigate();

    let user = sessionStorage.getItem('user');
    useEffect(() => {

        if(user === '' || user === null) {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    const userObj = JSON.parse(user)

    return(
        <div>
            <h1>Welcome to the home page {userObj.username}</h1>
            <Link to={'/login'}>Logout</Link>
            <Blogs />
            <Link to={'/user/blogs'}>My Blogs</Link>
            <Link to={'/user/create_blog'}>Create Blog</Link>
            

        </div>
    )
}

export default Home;