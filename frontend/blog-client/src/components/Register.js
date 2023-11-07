import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";


function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const data = qs.stringify({
            'username' : username,
            'password' : password
        });
        await axios.post( 'http://localhost:4000/user/create', data)
        .then(response => {
            if(response.data.success) {
                navigate('/login');
                console.log(response.data.message);
            }
            else {
                console.log(response.data.message);
            }
        })
          .catch(error => console.log(error));
        setUsername("");
        setPassword("");
    }

    return(
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit} method="POST">
                <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" required placeholder="Username" value={username}/>
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" required placeholder="Password" value={password}/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;