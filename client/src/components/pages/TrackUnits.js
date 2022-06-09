import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "./Default.css";
import "./Tracking.css";

import axios from "axios";

function TrackUnits() {
  const [unit, setUnit] = useState({
    unitId: "",
    unitName: "",
    unitType: "",
    unitDescription: "",
    accessType: "",
  });

  const [units, setUnits] = useState([]);
  const [participants, setParticipants] = useState([]);

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUnit({ ...unit, [fieldName]: fieldValue });
  };

  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.token}`,
    },
  };

  const fetchData = async (e) => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? "/api/units/manageunit"
        : "http://localhost:3001/units/manageunit",
      config
    );
    setUnits(data.unitsResult);
    console.log(units);
  };

  const fetchParticipants = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/links/participants/${unit.unitId}`
        : `http://localhost:3001/links/participants/${unit.unitId}`,
      config
    );
    console.log(data);
    setParticipants(data.participantsResult);
    console.log(participants);
  };

  useEffect(() => {
    document.title = "Track your units";
    setProfile(JSON.parse(localStorage.getItem("profile")));
    if (!profile?.token) {
      window.location = "/login";
    }

    fetchData();
    fetchParticipants();
  }, [unit.unitId]);

  return (
    <>
      <h2> Track units participants </h2>
      <div className="table-container">
        <div>
          <form className="form">
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
            <Link to="/workingarea">
              <button className="btn"> Working area</button>
            </Link>
          </form>
        </div>

        <div>
          <table className="track">
            <tr>
              <th>Participant full name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Date of Answering the scan</th>
            </tr>

            {participants.map((e) => {
              return (
                <tr key={e.date}>
                  <td>
                    {e.participantfirstname} {e.participantlastname}
                  </td>
                  <td>{e.participantemail}</td>
                  <td>{e.participantposition}</td>
                  <td>{e.date}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TrackUnits;
