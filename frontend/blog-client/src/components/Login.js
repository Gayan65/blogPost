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
      username: username,
      password: password,
    });
    await axios
      .post("http://localhost:4000/login", data)
      .then((response) => {
        console.log(response.data);
        setApiResponse(response.data);
        if (response.data.success) {
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/home");
        }
      })
      .catch((error) => console.log(error));

    setUsername("");
    setPassword("");
  }

  return (
    <div>
      <NavBar auth={false} />

      <main className="form-signin w-100 m-auto">
        <form method="POST" onSubmit={handleLogin}>
          <img
            src={login}
            className="d-block mx-lg-auto img-fluid pt-5"
            alt="Bootstrap Themes"
            width="500"
            height="300"
            loading="lazy"
          />
          <h1 className="h3 my-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control my-3 custom-input"
              id="floatingInput"
              placeholder="Email"
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              value={username}
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control custom-input"
              id="floatingPassword"
              placeholder="Password"
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign in
          </button>
          {apiResponse.success === false && (
            <div className="alert alert-danger mt-3" role="alert">
              {apiResponse.message}
            </div>
          )}
        </form>
      </main>
    </div>
  );
}

export default Login;
