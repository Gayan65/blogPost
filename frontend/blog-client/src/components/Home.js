import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
            <Blogs />
        </div>
    )
}

export default Home;