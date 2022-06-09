import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import "./Default.css";

function CreateInitiative() {
  const [initiative, setInitiative] = useState({
    initiativeName: "",
    initiativeDescription: "",
    initiativeTechnologies: "",
    initiativeTime: "",
    accessType: "Public",
    dimA: false,
    dimB: false,
    dimC: false,
    dimD: false,
    dimE: false,
  });

  const [text, setText] = useState("");
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setInitiative({ ...initiative, [fieldName]: fieldValue });
  };

  const handleCheckBox = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.checked;

    setInitiative({ ...initiative, [fieldName]: fieldValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(initiative);
    if (profile) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${profile.token}`,
        },
      };

      Axios.post(
        process.env.REACT_APP_ENV === "production"
          ? "/api/initiatives/createinitiative"
          : "http://localhost:3001/initiatives/createinitiative",
        { initiative: initiative },
        config
      ).then((response) => {
        if (response.data.created) {
          setText("initiative was sucessfuly created");
        } else {
          setText(
            "There has been an error while creating the initiative, please retry"
          );
        }
      });
    }
  };

  useEffect(() => {
    document.title = "Create your initiative";
    console.log(profile);
    if (!profile?.token) {
      window.location = "/login";
    }
  }, []);

  return (
    <>
      <h2> Create your initiative </h2>
      <div className="middle-container">
        <article className="form">
          <form>
            <div>
              <label htmlFor="initiativeName"> Name of initiative :</label>
              <input
                type="text"
                id="initiativeName"
                name="initiativeName"
                value={initiative.name}
                onChange={handleChange}
              />
            </div>

            <label htmlFor="initiativeDescription">
              Description of initiative :
            </label>
            <div>
              <textarea
                name="initiativeDescription"
                id="initiativeDescription"
                value={initiative.initiativeDescription}
                onChange={handleChange}
                cols="50"
                rows="5"
              ></textarea>
            </div>

            <div>
              <label htmlFor="dimA"></label>

              <div>
                <input
                  type="checkbox"
                  id="dimA"
                  name="dimA"
                  value="dimA"
                  checked={initiative.dimA}
                  onChange={handleCheckBox}
                />
                Dimension A - Support for teaching
              </div>

              <label htmlFor="dimB"></label>

              <div>
                <input
                  type="checkbox"
                  id="dimB"
                  name="dimB"
                  value="dimB"
                  checked={initiative.dimB}
                  onChange={handleCheckBox}
                />
                Dimension B - Student support
              </div>

              <label htmlFor="dimC"></label>

              <div>
                <input
                  type="checkbox"
                  id="dimC"
                  name="dimC"
                  value="dimC"
                  checked={initiative.dimC}
                  onChange={handleCheckBox}
                />
                Dimension C - Leadership, Culture and Transformation
              </div>

              <label htmlFor="dimD"></label>

              <div>
                <input
                  type="checkbox"
                  id="dimD"
                  name="dimD"
                  value="dimD"
                  checked={initiative.dimD}
                  onChange={handleCheckBox}
                />
                Dimension D - Technology at the service of learning
              </div>

              <label htmlFor="dimE"></label>

              <div>
                <input
                  type="checkbox"
                  id="dimE"
                  name="dimE"
                  value="dimE"
                  checked={initiative.dimE}
                  onChange={handleCheckBox}
                />
                Dimension E - Evidence-based practice
              </div>

              <label htmlFor="initiativeTechnologies"></label>
              <div>
                <input
                  type="text"
                  id="initiativeTechnologies"
                  name="initiativeTechnologies"
                  value={initiative.initiativeTechnologies}
                  onChange={handleChange}
                  placeholder="Google Meet, Zoom..."
                />
              </div>
            </div>

            <div>
              <label htmlFor="accessType"> Type of Access </label>
              <select
                id="accessType"
                name="accessType"
                value={initiative.accessType}
                onChange={handleChange}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div>
              <button type="submit" className="btn" onClick={handleSubmit}>
                Save
              </button>

              <Link to="/workingarea">
                <button className="btn"> Working Area</button>
              </Link>
            </div>

            <h4 style={{ color: "red", marginTop: "2rem" }}>{text}</h4>
          </form>
        </article>

        <img
          style={{ marginLeft: "10rem" }}
          width="50%"
          height="50%"
          src="images/design2.jpg"
          alt=""
        />
      </div>
      <Footer />
    </>
  );
}

export default CreateInitiative;
