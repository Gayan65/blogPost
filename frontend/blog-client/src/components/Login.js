import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import login from "../images/login.jpg";
import NavBar from "./NavBar";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [apiResponse, setApiResponse] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    async function handleLogin(event) {
        event.preventDefault();

        const data = qs.stringify({
            'username': username,
            'password': password
        });
        await axios.post('http://localhost:4000/login', data)
            .then(response => {
                console.log(response.data)
                setApiResponse(response.data);
                if (response.data.success) {
                    sessionStorage.setItem('user', JSON.stringify(response.data.user))
                    navigate('/home');
                }
            })
            .catch(error => console.log(error));

        setUsername("");
        setPassword("");
    }

    return (
        <div>
            <NavBar auth={false} />
            <div className="box-login">
                <div className="image-login">
                    <img src={login} className="d-block mx-lg-auto img-fluid pt-5" alt="Bootstrap Themes" width="500" height="300" loading="lazy" />
                </div>
                <div className="form-login">
                        <form method="POST" onSubmit={handleLogin}>
                            <h1 className="form-heading">Please sign in</h1>
                            <input type="text" className="input-normal" placeholder="Email" onChange={e => setUsername(e.target.value)} name="username" value={username} required />
                            <input type="password" className="input-normal" autoComplete="on" placeholder="Password" onChange={e => setPassword(e.target.value)} name="password" value={password} required />
                            <button className="button-start" type="submit">Sign in</button>
                        </form>
                        {apiResponse.success === false && <div className="alert alert-danger mt-3" role="alert"> {apiResponse.message} </div>}
                </div>
            </div>
        </div>
    )
}

export default Login;