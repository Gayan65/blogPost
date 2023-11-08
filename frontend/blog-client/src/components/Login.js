import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import login from "../images/login.jpg";

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
        <div className="body-custom-css">
            <div className="col-10 col-sm-8 col-lg-6 m-auto">
                <img src={login} className="d-block mx-lg-auto img-fluid pt-5" alt="Bootstrap Themes" width="500" height="300" loading="lazy" />
            </div>
            <div className="container my-auto">
                <main className="form-signin w-100 mx-auto">
                    <form method="POST" onSubmit={handleLogin}>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                        <div className="form-floating">
                            <input type="text" className="form-control mb-3 input-custom-css" id="floatingInput" placeholder="name@example.com" onChange={e => setUsername(e.target.value)} name="username" value={username} required />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control mb-3 input-custom-css" id="floatingPassword" autoComplete="on" placeholder="Password" onChange={e => setPassword(e.target.value)} name="password" value={password} required />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-check text-start my-3">
                            <input className="form-check-input mb-3" type="checkbox" value="remember-me" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Remember me
                            </label>
                        </div>
                        <button className="btn btn-primary w-100 py-2 login-btn" type="submit">Sign in</button>
                        {apiResponse.success === false && <div className="alert alert-danger mt-3" role="alert"> {apiResponse.message} </div>}
                    </form>
                </main>
            </div>
        </div>
    )
}

export default Login;