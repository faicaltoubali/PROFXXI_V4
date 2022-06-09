import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "./Default.css";

function CreateUnit() {
  const [unit, setUnit] = useState({
    unitName: "",
    unitType: "",
    unitDescription: "",
    accessType: "Public",
  });

  const [text, setText] = useState("");
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUnit({ ...unit, [fieldName]: fieldValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (profile) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${profile.token}`,
        },
      };

      Axios.post(
        process.env.REACT_APP_ENV === "production"
          ? "/api/units/createunit"
          : "http://localhost:3001/units/createunit",
        { unit: unit },
        config
      ).then((response) => {
        if (response.data.created) {
          setText("Unit was sucessfuly created");
        } else {
          setText(
            "There has been an error while creating the unit, please retry"
          );
        }
      });
    }
  };

  useEffect(() => {
    document.title = "Create your unit";
    console.log(profile);
    if (!profile?.token) {
      window.location = "/login";
    }
  }, []);

  return (
    <>
      <h2> Create your unit of Analysis</h2>
      <div className="middle-container">
        <article className="form">
          <form>
            <div>
              <label htmlFor="unitName"> Name of unit of Analysis :</label>
              <input
                type="text"
                id="unitName"
                name="unitName"
                value={unit.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="unitType"> Type of your unit : </label>
              <select
                id="unitType"
                name="unitType"
                value={unit.unitType}
                onChange={handleChange}
              >
                <option> Select your type</option>
                <option value="Computer Science"> Computer Science</option>
                <option value="Mechanics"> Mechanics</option>
                <option value="Electronics"> Electronics</option>
                <option value="Aerodynamics"> Aerodynamics</option>
                <option value="Civil Engineering"> Civil engineering</option>
                <option value="Library"> Library</option>
                <option value="Biology"> Biology</option>
                <option value="Medecine"> Medecine</option>
                <option value="Litterature"> Economics</option>
                <option value="Management"> Management</option>
                <option value="Mathematics"> Mathematics</option>
                <option value="Physics"> Physics</option>
                <option value="Law"> Law</option>
                <option value="History"> History</option>
                <option value="Arts"> Arts</option>
              </select>
            </div>
            <div>
              Other Type :
              <input
                type="text"
                id="unitType"
                name="unitType"
                value={unit.type}
                onChange={handleChange}
              />
            </div>

            <label htmlFor="unitDescription"> Description of unit :</label>
            <div>
              <textarea
                name="unitDescription"
                id="unitDescription"
                value={unit.unitDescription}
                onChange={handleChange}
                cols="50"
                rows="5"
              ></textarea>
            </div>

            <div>
              <label htmlFor="accessType"> Type of Access </label>
              <select
                id="accessType"
                name="accessType"
                value={unit.accessType}
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
          src="images/design4.jpg"
          alt=""
        />
      </div>
      <Footer />
    </>
  );
}

export default CreateUnit;
