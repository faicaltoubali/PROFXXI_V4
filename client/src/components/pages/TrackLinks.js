import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "./Default.css";
import "./Tracking.css";

import axios from "axios";

function TrackLinks() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.token}`,
    },
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/links/tracklinks`
        : `http://localhost:3001/links/tracklinks`,
      config
    );
    setQuestionnaires(data.linksResult);
    console.log(questionnaires);
  };

  const handleStatus = async (e) => {
    e.preventDefault();
    const idLink = e.target.value;
    const { data } = await axios.put(
      process.env.REACT_APP_ENV === "production"
        ? "/api/links/updatelink"
        : "http://localhost:3001/links/updatelink",
      { idLink: idLink },
      config
    );
    console.log(data);
    window.location.reload();
  };

  useEffect(() => {
    document.title = "Track your links";
    if (!profile?.token) {
      window.location = "/login";
    }
    fetchData();
  }, []);

  return (
    <>
      <h2>Links generation tracker</h2>
      <div className="table-container">
        <Link to="/workingarea">
          <button className="btn"> Working area</button>
        </Link>
        <div>
          <table className="track">
            <tr>
              <th>Link</th>
              <th>Name of the unit</th>
              <th>Date</th>
              <th>Type</th>
              <th>Status</th>
            </tr>

            {questionnaires.map((element) => {
              return (
                <tr key={element.link}>
                  <td>{element.link}</td>
                  <td>{element.name}</td>
                  <td>{element.date}</td>
                  <td>{element.type}</td>
                  <td>
                    {element.status === "OPEN" ? "ACTIVE" : "NOT ACTIVE"}
                    <button
                      className="btn"
                      onClick={handleStatus}
                      value={element.idquestionnaire}
                    >
                      {element.status === "OPEN" ? "Disable" : "Enable"}
                    </button>
                  </td>
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

export default TrackLinks;
