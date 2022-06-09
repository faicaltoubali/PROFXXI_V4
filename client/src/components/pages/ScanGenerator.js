import React, { useState, useEffect } from "react";
import "./Default.css";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import axios from "axios";

function ScanGenerator() {
  const [scan, setScan] = useState({
    unitId: "",
    scanType: "basic",
    status: "OPEN",
  });

  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [link, setLink] = useState("");

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
    setLoading(true);
    console.log(units);
  };

  useEffect(() => {
    document.title = "Scan generator";
    setProfile(JSON.parse(localStorage.getItem("profile")));
    if (!profile?.token) {
      window.location = "/login";
    }
    fetchData();
  }, [loading]);

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setScan({ ...scan, [fieldName]: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(scan);
    if (!(scan.unitId === "")) {
      const { data } = await axios.post(
        process.env.REACT_APP_ENV === "production"
          ? `/api/links/generatelink`
          : `http://localhost:3001/links/generatelink`,
        { unitId: scan.unitId, scanType: scan.scanType },
        config
      );

      setText(data.message);

      if (data?.link) {
        setLink(data.link);
      }
    } else {
      setText("Please Select an Unit !");
    }
  };

  return (
    <>
      <h2>Scan Link Generator</h2>
      <div className="middle-container">
        <article className="form">
          <form>
            <div>
              <label htmlFor="unit">Select the Unit:</label>
              <select
                name="unitId"
                id="unitId"
                value={scan.unitId}
                onChange={handleChange}
              >
                <option value={null}> Select your unit Please </option>
                {units?.map((unit) => (
                  <option key={unit.idunit} value={unit.idunit}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="type"> Select scan type :</label>
              <select
                name="scanType"
                id="scanType"
                value={scan.scanType}
                onChange={handleChange}
              >
                <option value="basic">Basic Type</option>
                <option value="student">Student Type</option>
              </select>
            </div>

            <div>
              <label htmlFor="status"> Status of your link </label>
              <select
                id="status"
                name="status"
                value={scan.status}
                onChange={handleChange}
              >
                <option value="OPEN"> ACTIVE </option>
                <option value="CLOSED"> NOT ACTIVE </option>
              </select>
            </div>

            <div>
              <button type="submit" className="btn" onClick={handleSubmit}>
                Generate scan link for participants
              </button>
            </div>
          </form>
          <div>
            <p style={{ color: "red", marginTop: "2rem" }}>{text}</p>
            <p style={{ color: "red", marginTop: "2rem" }}>{link}</p>
          </div>
        </article>

        <img
          style={{ marginLeft: "10rem" }}
          width="50%"
          height="50%"
          src="images/design3.jpg"
          alt=""
        />
      </div>
      <Footer></Footer>
    </>
  );
}

export default ScanGenerator;
