import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Blogs from "./Blogs";
import NavBar from "./NavBar";

function Home() {
    const navigate = useNavigate();

    let user = sessionStorage.getItem('user');
    const [auth, setAuth] = useState(false);
    useEffect(() => {

        if(user === '' || user === null) {
            navigate('/login');
            setAuth(false);
        }
        else {
            setAuth(true);
        }
        // eslint-disable-next-line
    }, []);
    const userObj = JSON.parse(user)

    return(
        <div>
            <NavBar auth = {true} user = { auth ? userObj.username : null} />
            <Link to={'/login'}>Logout</Link>
            <Blogs />
            <Link to={'/user/blogs'}>My Blogs</Link>
            <Link to={'/user/create_blog'}>Create Blog</Link>
            

        </div>
    )
}

export default Home;