import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import "./Default.css";
import axios from "axios";

function ManageUnit() {
  const [unit, setUnit] = useState({
    unitId: "",
    unitName: "",
    unitType: "",
    unitDescription: "",
    accessType: "",
  });

  const [units, setUnits] = useState([]);
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
    setUnit({ ...unit, [fieldName]: fieldValue });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!(unit.unitId === "")) {
      const { data } = await axios.put(
        process.env.REACT_APP_ENV === "production"
          ? `/api/units/manageunit/update/${unit.unitId}`
          : `http://localhost:3001/units/manageunit/update/${unit.unitId}`,
        {
          unit: unit,
        },
        config
      );
      setText(data.message);
    } else {
      setText("Please select a unit");
    }
  };

  const handleConfirmation = (e) => {
    if (!(unit.unitId === "")) {
      if (!toggleConfirmation) {
        setToggleConfirmation(true);
        setText(
          "We inform you that all the data assigned to the selected unit are going to be deleted, Do you still want to continue with this process ?"
        );
      } else {
        setToggleConfirmation(false);
        setText("");
      }
    } else {
      setText("Please select a unit");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(`deleting unit ${unit.unitId}`);
    const { data } = await axios.delete(
      process.env.REACT_APP_ENV === "production"
        ? `/api/units/manageunit/delete/${unit.unitId}`
        : `http://localhost:3001/units/manageunit/delete/${unit.unitId}`,
      config,
      {
        unitId: unit.unitId,
      }
    );

    setText(data.message);
  };

  const fetchData = async (e) => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? "/api/units/manageunit"
        : "http://localhost:3001/units/manageunit",
      config
    );
    setUnits(data.unitsResult);
  };

  const fetchCurrentUnit = async () => {
    console.log("Entering fetch Current");
    units.map((element) => {
      if (`${element.idunit}` === unit.unitId) {
        setUnit({
          unitId: unit.unitId,
          unitName: element.name,
          unitType: element.type,
          unitDescription: element.description,
          accessType: element.access,
        });

        console.log(element);
      }
    });
    console.log(unit);
  };

  useEffect(() => {
    document.title = "Manage your units";
    setProfile(JSON.parse(localStorage.getItem("profile")));
    if (!profile?.token) {
      window.location = "/login";
    }
    fetchData();
    fetchCurrentUnit();
    console.log(units);
  }, [location, unit.unitId]);

  return (
    <>
      <h2> Manage your unit of Analysis</h2>
      <div className="middle-container">
        <article className="form">
          <form>
            <div>
              <label htmlFor="unit"> Change Unit : </label>
              <select
                id="unitId"
                name="unitId"
                value={unit.unitId}
                onChange={handleChange}
              >
                <option> Select your unit Please </option>
                {units?.map((unit) => (
                  <option key={unit.idunit} value={unit.idunit}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="unitName"> Name of unit of Analysis :</label>
              <input
                type="text"
                id="unitName"
                name="unitName"
                value={unit.unitName}
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
                value={unit.unitType}
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
                <option defaultValue="Public">Public</option>
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

          <div>
            <button className="btn" onClick={handleConfirmation}>
              Delete Unit
            </button>
          </div>
          <h4 style={{ color: "red", marginTop: "2rem" }}>{text}</h4>

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
        </article>

        <img
          style={{ marginLeft: "10rem" }}
          width="50%"
          height="50%"
          src="images/design7.jpg"
          alt=""
        />
      </div>
      <Footer />
    </>
  );
}

export default ManageUnit;
