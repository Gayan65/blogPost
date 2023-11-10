import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import register from "../images/register.jpg";
import NavBar from "./NavBar";


function Register() {
    //Use state hook
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [nickName, setNickName] = useState("");
    const [apiResponse, setApiResponse] = useState({});

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const data = qs.stringify({
            'username': username,
            'password': password,
            'fname': fname,
            'createDate': new Date(),
            'nickName': nickName
        });
        await axios.post('http://localhost:4000/user/create', data)
            .then(response => {
                if (response.data.success) {
                    navigate('/login');
                    console.log(response.data.message);
                }
                else {
                    console.log(response.data.message);
                    setApiResponse(response.data);
                }
            })
            .catch(error => console.log(error));
        setUsername("");
        setPassword("");
        setFname("");
        setNickName("");
    }

    return (
        <div>
            <NavBar auth={false} />
            <div className="body-custom-css">
                <div className="col-10 col-sm-8 col-lg-6 m-auto">
                    <img src={register} className="d-block mx-lg-auto img-fluid pt-5" alt="Bootstrap Themes" width="500" height="300" loading="lazy" />
                </div>
                <div className="container my-auto">
                    <main className="form-signin w-100 mx-auto">
                        <form method="POST" onSubmit={handleSubmit}>
                            <h1 className="form-heading">Please Signup</h1>
                                <input type="text" className="input-normal" autoComplete="on" placeholder="Email" onChange={(e) => setUsername(e.target.value)} name="username" required value={username} />
                                <input type="text" className="input-normal" autoComplete="on" placeholder="Full Name" onChange={(e) => setFname(e.target.value)} name="fname" required value={fname} />
                                <input type="text" className="input-normal" autoComplete="on" placeholder="Nick Name" onChange={(e) => setNickName(e.target.value)} name="nickName" required value={nickName} />
                                <input type="password" className="input-normal" autoComplete="on" placeholder="Password" onChange={(e) => setPassword(e.target.value)} name="password" required value={password} />
                            <button className="button-start" type="submit">Register</button>
                            {apiResponse.success === false && <div className="alert alert-danger mt-3" role="alert"> {apiResponse.message} </div>}
                        </form>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Register;