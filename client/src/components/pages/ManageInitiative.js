import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../Footer";
import "./Default.css";
import axios from "axios";

function ManageInitiative() {
  const [initiative, setInitiative] = useState({
    initiativeId: "",
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

  const [initiatives, setInitiatives] = useState([]);
  const [text, setText] = useState("");
  const [toggleConfirmation, setToggleConfirmation] = useState(false);

  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const location = useLocation();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.token}`,
    },
  };

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!(initiative.initiativeId === "")) {
      const { data } = await axios.put(
        process.env.REACT_APP_ENV === "production"
          ? `/api/initiatives/manageinitiative/update/${initiative.initiativeId}`
          : `http://localhost:3001/initiatives/manageinitiative/update/${initiative.initiativeId}`,
        {
          initiative: initiative,
        },
        config
      );
      setText(data.message);
    } else {
      setText("Please select a initiative");
    }
  };

  const fetchData = async (e) => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? "/api/initiatives/manageinitiative"
        : "http://localhost:3001/initiatives/manageinitiative",
      config
    );
    setInitiatives(data.initiativesResult);
  };

  const fetchCurrentInitiative = async () => {
    console.log("Entering fetch Current");
    initiatives.map((element) => {
      if (`${element.idinitiative}` === initiative.initiativeId) {
        setInitiative({
          initiativeId: initiative.initiativeId,
          initiativeName: element.name,
          initiativeDescription: element.description,
          initiativeTechnologies: element.technologies,
          initiativeTime: element.time,
          accessType: element.access,
          initiativedimA: element.dimA,
          initiativedimB: element.dimB,
          initiativedimC: element.dimC,
          initiativedimD: element.dimD,
          initiativedimE: element.dimE,
        });

        console.log(element);
      }
    });
    console.log(initiative);
  };

  useEffect(() => {
    document.title = "Manage your initiatives";
    setProfile(JSON.parse(localStorage.getItem("profile")));
    if (!profile?.token) {
      window.location = "/login";
    }
    fetchData();
    fetchCurrentInitiative();
    console.log(initiatives);
  }, [location, initiative.initiativeId]);

  return (
    <>
      <h2> Manage your initiatives </h2>
      <div className="middle-container">
        <article className="form">
          <form>
            <div>
              <label htmlFor="initiative"> Change Initiative : </label>
              <select
                id="initiativeId"
                name="initiativeId"
                value={initiative.initiativeId}
                onChange={handleChange}
              >
                <option> Select your initiative Please </option>
                {initiatives?.map((initiative) => (
                  <option
                    key={initiative.idinitiative}
                    value={initiative.idinitiative}
                  >
                    {initiative.name}
                  </option>
                ))}
              </select>
            </div>

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
              {" "}
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
                Dimension E - Evidence-based practices
              </div>
            </div>

            <label htmlFor="initiativeTechnologies">
              {" "}
              Competences involve :
            </label>
            <div>
              <input
                type="text"
                id="initiativeTechnologies"
                name="initiativeTechnologies"
                value={initiative.type}
                onChange={handleChange}
                placeholder="Google Meet, Zoom..."
              />
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
              <button type="submit" className="btn" onClick={handleUpdate}>
                Save Modifications
              </button>

              <Link to="/workingarea">
                <button className="btn"> Working Area</button>
              </Link>
            </div>
          </form>

          <h4 style={{ color: "red", marginTop: "2rem" }}>{text}</h4>
        </article>

        <img
          style={{ marginLeft: "10rem" }}
          width="50%"
          height="50%"
          src="images/design8.jpg"
          alt=""
        />
      </div>
      <Footer />
    </>
  );
}

export default ManageInitiative;
