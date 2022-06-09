import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";
import Footer from "../../components/Footer";
import "./Default.css";
import axios from "axios";

function WorkingArea() {
  const [value, setValue] = useState(0);
  const [unitsNumber, setUnitsNumber] = useState("0");
  const [scansNumber, setScansNumber] = useState("0");
  const [participantsNumber, setParticipantsNumber] = useState("0");
  const [totalUnits, setTotalUnits] = useState("0");
  const [totalParticipants, setTotalParticipants] = useState("0");
  const [totalUniversities, setTotalUniversities] = useState("0");
  const [totalScans, setTotalScans] = useState("0");

  //const [initiativesNumber, setInitiativesNumber] = useState("0");
  const [initiativesNumber, setInitiativesNumber] = useState("0");

  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const [text, setText] = useState("");
  const location = useLocation();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile?.token}`,
    },
  };

  ////////////////////// GETTING WORKING AREA STATS ///////////////////////
  const getUnitsNumber = async (e) => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? "/api/units/unitsnumber"
        : "http://localhost:3001/units/unitsnumber",
      config
    );
    setUnitsNumber(data.unitsNumber);
  };

  const getScansNumber = async (e) => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? "/api/links/scansnumber"
        : "http://localhost:3001/links/scansnumber",
      config
    );
    setScansNumber(data.scansNumber);
  };

  const getParticipantsNumber = async (e) => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? "/api/links/participantsnumber"
        : "http://localhost:3001/links/participantsnumber",
      config
    );
    setParticipantsNumber(data.participantsNumber);
  };

  const getTotalUnitsNumber = async (e) => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? "/api/units/totalunitsnumber"
        : "http://localhost:3001/units/totalunitsnumber",
      config
    );
    setTotalUnits(data.totalUnitsNumber);
  };

  const getTotalParticipantsNumber = async (e) => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? "/api/links/totalparticipantsnumber"
        : "http://localhost:3001/links/totalparticipantsnumber",
      config
    );
    setTotalParticipants(data.totalParticipantsNumber);
  };

  const getTotalUniversitiesNumber = async (e) => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? "/api/user/totaluniversitiesnumber"
        : "http://localhost:3001/user/totaluniversitiesnumber",
      config
    );
    setTotalUniversities(data.totalUniversitiesNumber);
  };

  const getTotalScansNumber = async (e) => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? "/api/links/totalscansnumber"
        : "http://localhost:3001/links/totalscansnumber",
      config
    );
    setTotalScans(data.totalScansNumber);
  };

  const getInitiativesNumber = async (e) => {
    const { data } = await axios.get(
      "http://localhost:3001/initiatives/initiativesnumber",
      config
    );
    setInitiativesNumber(data.initiativesNumber);
  };

  /////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    document.title = "Working Area";

    // Getting the User from the
    setProfile(JSON.parse(localStorage.getItem("profile")));
    if (!profile?.token) {
      window.location = "/login";
    }
    getUnitsNumber();
    getScansNumber();
    getParticipantsNumber();
    getTotalParticipantsNumber();
    getTotalScansNumber();
    getTotalUnitsNumber();
    getTotalUniversitiesNumber();
    getInitiativesNumber();
    //////////////////////////////////////////
  }, [location]);

  return (
    <>
      <div className="middle-container">
        <div>
          <h2>Working Area</h2>
          <h2>Happy to see you again {profile?.user?.firstName} </h2>
        </div>
        <div
          className="column-container"
          style={{ width: "10rem", height: "10rem", marginLeft: "10rem" }}
        >
          <h4>Your profile</h4>
          <Link to="/updateprofile" className="navbar-links">
            <img src="/images/profile.png" alt="" />
          </Link>
        </div>
      </div>

      <div className="middle-container">
        <div className="item-area">
          <div className="items-wrapper">
            <h3> Units Area</h3>
            <Link to="/createunit">
              <button className="btn"> Create your units </button>
            </Link>
            <Link to="/manageunit">
              <button className="btn"> Manage your units </button>
            </Link>
            <Link to="/trackunits">
              <button className="btn"> Track your participants</button>
            </Link>
            <p>Number of units you have created : {unitsNumber}</p>
            <p>
              Number of participants registred in your units :
              {participantsNumber}
            </p>
          </div>
        </div>

        <div className="item-area">
          <div className="items-wrapper">
            <h3> Initiatives Area</h3>
            <Link to="/createinitiative">
              <button className="btn"> Create your initiatives </button>
            </Link>
            <Link to="/manageinitiative">
              <button className="btn"> Manage your initiatives </button>
            </Link>
            <p>Number of initiatives you have created : {initiativesNumber} </p>
          </div>
        </div>

        <div className="item-area">
          <div className="items-wrapper">
            <h3> Scan Area</h3>
            <Link to="/scansinformation">
              <button className="btn"> Scans Information </button>
            </Link>
            <Link to="/scangenerator">
              <button className="btn"> Scan Link Generator </button>
            </Link>
            <Link to="/tracklinks">
              <button className="btn"> Scan tracker </button>
            </Link>
            <p>Number of scans from the begining by roles : {scansNumber}</p>
            <p>Current amount of scans : {scansNumber}</p>
          </div>
        </div>

        <div className="item-area">
          <div className="items-wrapper">
            <h3>Monitoring Area</h3>
            <Link to="/dashboards/unitanalytics">
              <button className="btn"> Monitor your units </button>
            </Link>

            <p>Total Number of units : {totalUnits}</p>
            <p>Total Number of participants : {totalParticipants}</p>
            <p>Total Number of universitites : {totalUniversities}</p>
            <p>Total Number of scans : {totalScans}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

/*
        <div className="item-area">
          <div className="items-wrapper">
            <h3> Initiatives Area</h3>
            <Link to="/createinitiative">
              <button className="btn"> Create your initiatives </button>
            </Link>
            <Link to="/manageinitiative">
              <button className="btn"> Manage your initiatives </button>
            </Link>
            <p>Number of initiatives you have created : {initiativesNumber} </p>
          </div>
        </div>
*/

export default WorkingArea;
