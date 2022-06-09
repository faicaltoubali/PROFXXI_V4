import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Sidebar from "./Sidebar";
import "./Dashboards.css";
import axios from "axios";
import PieChart from "./charts/PieChart";
import BarChart from "./charts/BarChart";
import HorizontalChart from "./charts/HorizontalBarChart";
import Gauge from "./charts/Gauge";
import RadarChart from "./charts/RadarChart";
import LineChart from "./charts/LineChart";
import DistanceBarChart from "./charts/DistanceBarChart";

function UnitAnalytics() {
  const [unit, setUnit] = useState({
    unitId: "",
    unitName: "",
    unitType: "",
    unitDescription: "",
    accessType: "",
  });

  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const [units, setUnits] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.token}`,
    },
  };

  ////////////////////////////////////////////////////////////////////
  const fetchData = async (e) => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? "/api/units/manageunit"
        : "http://localhost:3001/units/manageunit",
      config
    );
    setUnits(data.unitsResult);
  };

  const fetchCurrentUnit = () => {
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
      }
    });
  };

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUnit({ ...unit, [fieldName]: fieldValue });
  };
  ////////////////////////////////////////////////////////////////////////
  // Fetching answers of the current unit

  const [pie, setPie] = useState({});

  const fetchPie = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/dashboards/myunitsanalysis/pie/${unit.unitId}`
        : `http://localhost:3001/dashboards/myunitsanalysis/pie/${unit.unitId}`,
      config
    );
    setPie(data.pieData);
  };
  ///////////////////////////////////////////////////////////////////////

  const [bar, setBar] = useState({});

  const fetchBar = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/dashboards/myunitsanalysis/bar/${unit.unitId}`
        : `http://localhost:3001/dashboards/myunitsanalysis/bar/${unit.unitId}`,
      config
    );
    setBar(data.barData);
  };
  ///////////////////////////////////////////////////////////////////////

  const [hbar, setHbar] = useState({});

  const fetchHbar = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/dashboards/myunitsanalysis/hbar/${unit.unitId}`
        : `http://localhost:3001/dashboards/myunitsanalysis/hbar/${unit.unitId}`,
      config
    );
    setHbar(data.hbarData);
  };

  ////////////////////////////////////////////////////////////////////////

  const [gauge, setGauge] = useState(0);

  const fetchGauge = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/dashboards/myunitsanalysis/gauge/${unit.unitId}`
        : `http://localhost:3001/dashboards/myunitsanalysis/gauge/${unit.unitId}`,
      config
    );
    setGauge(data.gaugeData);
  };

  ///////////////////////////////////////////////////////////////////////

  const [radar, setRadar] = useState({});

  const fetchRadar = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/dashboards/myunitsanalysis/radar/${unit.unitId}`
        : `http://localhost:3001/dashboards/myunitsanalysis/radar/${unit.unitId}`,
      config
    );
    setRadar({ unitName: unit.unitName, data: data.radarData });
  };

  ////////////////////////////////////////////////////////////////

  const [distBar, setDistBar] = useState({});

  const fetchDistBar = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/dashboards/myunitsanalysis/distbar/${unit.unitId}`
        : `http://localhost:3001/dashboards/myunitsanalysis/distbar/${unit.unitId}`,
      config
    );
    setDistBar({ unitName: unit.unitName, data: data.distBarData });
  };
  ///////////////////////////////////////////////////////////////////////

  const [dateIn, setDateIn] = useState({});
  const [dateOut, setDateOut] = useState({});
  const [line, setLine] = useState({});

  const fetchLine = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/dashboards/myunitsanalysis/line/${unit.unitId}/${dateIn}/${dateOut}`
        : `http://localhost:3001/dashboards/myunitsanalysis/line/${unit.unitId}/${dateIn}/${dateOut}`,
      config
    );
    setLine(data.lineData);
    console.log(data.lineData);
  };

  ///////////////////////////////////////////////////////////////////////

  const renderUnitAnalytics = async () => {
    if (!(unit.unitId === "")) {
      setText("");
      await fetchPie();

      await fetchBar();

      await fetchHbar();

      await fetchGauge();

      await fetchRadar();

      await fetchDistBar();

      await fetchLine();
    } else {
      setPie({});
      setBar({});
      setGauge(0);
      setHbar({});
      setRadar({});
      setDistBar({});
      setLine({});
      setText("Please select a valid Unit");
    }
  };
  /////////////////////////////////////////////////////////////////////
  useEffect(() => {
    document.title = "My Units Analytics";
    setProfile(JSON.parse(localStorage.getItem("profile")));
    if (!profile?.token) {
      window.location = "/login";
    }

    fetchData();
  }, []);

  useEffect(() => {
    fetchCurrentUnit();
    renderUnitAnalytics();
  }, [unit.unitId, unit.unitName, dateIn, dateOut]);

  return (
    <div>
      <div className="container">
        <Sidebar />
        <div className="charts-container">
          <div className="form">
            <label htmlFor="unit"> Change Unit : </label>
            <select
              id="unitId"
              name="unitId"
              value={unit.unitId}
              onChange={handleChange}
            >
              <option value=""> Select your unit</option>
              {units?.map((unit) => (
                <option key={unit.idunit} value={unit.idunit}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
          {text}
          <div className="row-container">
            <div className="small-chart">
              <h4 className="chartTitle"> Your unit average </h4>
              <div className="gaugeText">
                <h4 style={{ color: "red" }}>Low</h4>
                <h4 style={{ color: "orange" }}>Moderate</h4>
                <h4 style={{ color: "green" }}>High</h4>
              </div>
              <Gauge data={gauge ? Number(gauge.toFixed(2)) : 0} />
              <h4 className="chartText">
                Your unit global average is :{" "}
                {gauge ? Number(gauge.toFixed(2)) : 0} / 4
              </h4>
            </div>
            <div className="small-chart">
              <h4 className="charTitle">
                Pie Chart : Participants in your unit
              </h4>
              <PieChart data={pie} />
            </div>
          </div>
          <div className="row-container">
            <div className="chart">
              <h4 className="charTitle">
                Radar Chart : Performances of my unit regarding all Dimensions &
                Levels
              </h4>
              <RadarChart data={radar} />
            </div>

            <div className="chart">
              <h4 className="charTitle">
                Bar Chart : Distances between professions in terms of Global
                Mark
              </h4>
              <DistanceBarChart data={distBar} />
            </div>
          </div>
          <div className="row-container">
            <div className="chart">
              <h4 className="charTitle">
                Horizontal Bar Chart : Levels Marks in the unit per profession
              </h4>
              <HorizontalChart data={hbar} />
            </div>

            <div className="chart">
              <h4 className="charTitle">
                Bar Chart : Dimensions Marks in the unit per profession
                <BarChart data={bar} />
              </h4>
            </div>
          </div>

          <div className="row-container">
            <div className="big-chart">
              <h4 className="chartTitle">
                The trends of dimensions & levels in the unit over time
              </h4>
              <div className="form">
                <label htmlFor="dateIn"> From :</label>
                <input
                  type="dateIn"
                  name="dateIn"
                  id="dateIn"
                  placeholder={"YYYY-MM-DD"}
                  onChange={(e) => setDateIn(e.target.value)}
                />
                <label htmlFor="dateIn"> To :</label>
                <input
                  type="dateOut"
                  name="dateOut"
                  id="dateOut"
                  placeholder={"YYYY-MM-DD"}
                  onChange={(e) => setDateOut(e.target.value)}
                />
              </div>

              <LineChart data={line} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitAnalytics;
