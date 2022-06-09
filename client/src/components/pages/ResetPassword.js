import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Default.css";
import Footer from "../../components/Footer";

function ResetPassword({ match }) {
  const [reset, setReset] = useState({ password: "", confirmpassword: "" });
  const [text, setText] = useState("");

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setReset({ ...reset, [fieldName]: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = match.params.token;

    if (reset.password === reset.confirmpassword) {
      const { data } = await axios.put(
        process.env.REACT_APP_ENV === "production"
          ? `/api/user/resetpassword/${token}`
          : `http://localhost:3001/user/resetpassword/${token}`,
        {
          password: reset.password,
        }
      );
      setText(data.message);
    } else {
      setText("The passwords mismatch !");
    }
  };

  useEffect(() => {
    document.title = "Resetting Password";
  }, []);

  return (
    <div>
      <h2> Reset Your Password</h2>
      <div className="middle-container">
        <div>
          <div className="form">
            <div>
              <label htmlFor="password"> Password :</label>
              <input
                type="password"
                name="password"
                id="password"
                value={reset.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password"> Confirm Password :</label>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                value={reset.confirmpassword}
                onChange={handleChange}
              />
            </div>
            <button className="btn" onClick={handleSubmit}>
              Send
            </button>
          </div>
          <h4 className="warning">{text}</h4>
        </div>
        <img
          style={{ marginLeft: "10rem" }}
          width="50%"
          height="50%"
          src="/images/design2.jpg"
          alt=""
        />
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;
