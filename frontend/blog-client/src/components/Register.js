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
      username: username,
      password: password,
      fname: fname,
      createDate: new Date(),
      nickName: nickName,
    });
    await axios
      .post("http://localhost:4000/user/create", data)
      .then((response) => {
        if (response.data.success) {
          navigate("/login");
          console.log(response.data.message);
        } else {
          console.log(response.data.message);
          setApiResponse(response.data);
        }
      })
      .catch((error) => console.log(error));
    setUsername("");
    setPassword("");
    setFname("");
    setNickName("");
  }

  return (
    <div>
      <NavBar auth={false} />

      <div className="container-fluid">
        <div className="container custom-body">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src={register}
                className="d-block mx-lg-auto img-fluid"
                alt="Bootstrap Themes"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <form method="POST" onSubmit={handleSubmit}>
                <h1 className="h3 my-3 fw-normal">Please signup</h1>

                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control my-3 "
                    autoComplete="on"
                    placeholder="Email"
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    required
                    value={username}
                  />

                  <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control my-3 "
                    autoComplete="on"
                    placeholder="Full Name"
                    onChange={(e) => setFname(e.target.value)}
                    name="fname"
                    required
                    value={fname}
                  />

                  <label htmlFor="floatingInput">Full Name</label>
                </div>

                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control my-3 "
                    autoComplete="on"
                    placeholder="Nick Name"
                    onChange={(e) => setNickName(e.target.value)}
                    name="nickName"
                    required
                    value={nickName}
                  />

                  <label htmlFor="floatingInput">Nick Name</label>
                </div>

                <div className="form-floating mb-3 ">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    autoComplete="on"
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    required
                    value={password}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">
                  Signup
                </button>
                {apiResponse.success === false && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {apiResponse.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
