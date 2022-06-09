import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer";

function UpdateProfile() {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const [user, setUser] = useState({
    organizationName: profile?.user?.organizationName,
    universityWebsite: profile?.user?.universityWebsite,
    firstName: profile?.user?.firstName,
    lastName: profile?.user?.lastName,
    position: profile?.user?.position,
    profile: profile?.user?.profile,
    email: profile?.user?.email,
    password: profile?.user?.password,
  });

  const [resetPassword, setResetPassword] = useState({
    password: "",
    confirmedPassword: "",
  });

  const [toggleConfirmation, setToggleConfirmation] = useState(false);
  const [toggleReset, setToggleReset] = useState(false);
  const [action, setAction] = useState("");
  const [text, setText] = useState();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.token}`,
    },
  };

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUser({ ...user, [fieldName]: fieldValue });
  };

  const handlePasswordChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setResetPassword({ ...resetPassword, [fieldName]: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    const { data } = await axios.put(
      process.env.REACT_APP_ENV === "production"
        ? `/api/user/update`
        : `http://localhost:3001/user/update`,
      { email: user.email, user: user },
      config
    );
    localStorage.setItem(
      "profile",
      JSON.stringify({ loggedIn: true, token: profile.token, user: data.user })
    );
    setText(data.message);
  };

  const reset = async (e) => {
    e.preventDefault();
    if (resetPassword.password === resetPassword.confirmedPassword) {
      const { data } = await axios.put(
        process.env.REACT_APP_ENV === "production"
          ? `/api/user/resetpassword`
          : `http://localhost:3001/user/resetpassword`,
        {
          password: resetPassword.password,
        },
        config
      );
      setText(data.message);
    } else {
      setText("passwords don't match");
    }
  };

  const handleDelete = () => {
    if (action === "data") {
      handleDeleteAllData();
    } else {
      handleDeleteProfile();
    }
  };
  const handleDeleteProfile = async () => {
    const { data } = await axios.delete(
      process.env.REACT_APP_ENV === "production"
        ? `/api/user/deleteprofile`
        : `http://localhost:3001/user/deleteprofile`,
      config,
      {}
    );
    setText(data.message);
    localStorage.removeItem("profile");
    window.location = "/login";
  };

  const handleDeleteAllData = async () => {
    const { data } = await axios.delete(
      process.env.REACT_APP_ENV === "production"
        ? `/api/user/deletedata`
        : `http://localhost:3001/user/deletedata`,
      config,
      {}
    );
    setText(data.message);
  };

  const handleConfirmation = (e) => {
    if (e.target.value === "data") {
      setAction("data");
    } else {
      setAction("profile");
    }

    if (!toggleConfirmation) {
      setToggleConfirmation(true);
      setText(
        "Are you sure you want to delete with the suppression of your " +
          action +
          " ? "
      );
    } else {
      setToggleConfirmation(false);
      setText("");
    }
  };

  useEffect(() => {
    document.title = "Update Profile";
    setProfile(JSON.parse(localStorage.getItem("profile")));
    if (!profile?.token) {
      window.location = "/login";
    }
  }, []);

  return (
    <>
      <h2> Your Profile </h2>
      <div className="middle-container">
        <article className="form">
          <form>
            <div>
              <label htmlFor="organizationName">Name of organization : </label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={user.organizationName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="universityWebsite">
                Your university's official website :
              </label>
              <input
                type="text"
                id="universityWebsite"
                name="universityWebsite"
                value={user.universityWebsite}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="firstName">First Name :</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="lastName">Last Name :</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="position">Position :</label>
              <select
                name="position"
                id="position"
                value={user.position}
                onChange={handleChange}
              >
                <option defaultValue="Teacher">Teacher</option>
                <option value="Administrator"> Administrator</option>
                <option value="Manager"> Manager</option>
              </select>
            </div>

            <div>
              <label htmlFor="profile">Your profile :</label>
              <input
                type="text"
                id="profile"
                name="profile"
                value={user.profile}
                onChange={handleChange}
              />
              <p style={{ color: "blue" }}>
                Examples : LinkedIn / researchGate / University profile
              </p>
            </div>

            <div>
              <label htmlFor="email">Your email :</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn" onClick={handleSubmit}>
              Update
            </button>
            <h4 style={{ color: "red", marginTop: "2rem" }}>{text}</h4>
          </form>
          <div>
            <button
              className="btn"
              onClick={handleConfirmation}
              value="profile"
            >
              Delete Your Profile
            </button>
            <button className="btn" onClick={handleConfirmation} value="data">
              Delete All your data
            </button>

            <button className="btn" onClick={() => setToggleReset((v) => !v)}>
              Reset your password
            </button>

            {toggleConfirmation && (
              <>
                <div>
                  <button
                    style={{ backgroundColor: "red" }}
                    className="btn"
                    onClick={handleDelete}
                  >
                    Continue !
                  </button>
                  <button
                    style={{ backgroundColor: "orange" }}
                    className="btn"
                    onClick={handleConfirmation}
                  >
                    Abondon Deleting
                  </button>
                </div>
              </>
            )}

            {toggleReset && (
              <>
                <div>
                  <label htmlFor="password">Your new password :</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handlePasswordChange}
                  />
                </div>
                <div>
                  <label htmlFor="confirmedpassword">
                    Confirm your new password :
                  </label>
                  <input
                    type="password"
                    id="confirmedPassword"
                    name="confirmedPassword"
                    onChange={handlePasswordChange}
                  />
                </div>
                <button className="btn" onClick={reset}>
                  Confirm
                </button>
              </>
            )}
          </div>
        </article>

        <div
          className="column-container"
          style={{ width: "60rem", height: "40rem", margin: "2rem" }}
        >
          <p>
            If you want to change you whole organization, you need to create a
            new account for that. In case, you want just to rename the same
            organization, you can update it via the field beside.
          </p>
          <img width="100%" height="80%" src="images/design8.jpg" alt="" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UpdateProfile;
