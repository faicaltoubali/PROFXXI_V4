import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import "./Default.css";
import Footer from "../../components/Footer";
import { Link, Redirect, useHistory } from "react-router-dom";
import WorkingArea from "../../components/pages/WorkingArea";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [loginState, setloginState] = useState("");
  const [forgot, setForgot] = useState({ state: false, email: "" });
  const [text, setText] = useState("");

  Axios.defaults.withCredentials = true;

  const login = (e) => {
    e.preventDefault();
    Axios.post(
      process.env.REACT_APP_ENV === "production"
        ? "/api/user/login"
        : "http://localhost:3001/user/login",
      {
        email: email,
        password: password,
      }
    ).then((response) => {
      console.log(response);

      if (response.data.loggedIn) {
        setloginState(response.data.message);
        localStorage.setItem("profile", JSON.stringify(response.data));
        window.location = "/workingarea";
      }

      setText(response.data.message);

      //   history.push("/workingarea");
    });
  };

  const handleForgot = (e) => {
    e.preventDefault();
    Axios.post(
      process.env.REACT_APP_ENV === "production"
        ? "/api/user/forgotpassword"
        : "http://localhost:3001/user/forgotpassword",
      {
        email: forgot.email,
      }
    ).then((response) => {
      if (response.data?.sent) {
        setText(response.data.message);
      } else {
        setText(response.data.message);
      }
    });
  };

  useEffect(() => {
    document.title = "Login";
    let profile = JSON.parse(localStorage.getItem("profile"));
    console.log(process.env.REACT_APP_ENV === "production");
    console.log(process.env.REACT_APP_ENV);
    if (profile) {
      window.location = "/workingarea";
    }
  }, []);

  return (
    <>
      <h2> Log In </h2>
      <div className="middle-container">
        <div>
          <article className="form">
            <form>
              <div>
                <label htmlFor="email"> Email :</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password"> Password :</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button type="submit" className="btn" onClick={login}>
                  Login
                </button>

                <Link to="/register">
                  <button className="btn"> Register </button>
                </Link>
              </div>
            </form>

            <button
              className="btn"
              onClick={() => setForgot({ ...forgot, state: !forgot.state })}
            >
              forgot password
            </button>

            {forgot.state && (
              <div>
                Please enter the email you registred with :
                <form>
                  <div>
                    <label htmlFor="email"> Email :</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={forgot.email}
                      onChange={(e) =>
                        setForgot({ ...forgot, email: e.target.value })
                      }
                    />
                  </div>
                  <button className="btn" onClick={handleForgot}>
                    Request Password Resetting
                  </button>
                </form>
                <h4 className="warning">{text}</h4>
              </div>
            )}
          </article>
        </div>
        <img
          style={{ marginLeft: "10rem" }}
          width="50%"
          height="50%"
          src="images/design1.jpg"
          alt=""
        />
      </div>
      <Footer />
    </>
  );
}

export default Login;
