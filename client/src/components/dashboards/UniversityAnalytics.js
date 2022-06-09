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
import { ContactsOutlined } from "@material-ui/icons";

function UniversityAnalytics() {
  const [unit1, setUnit1] = useState({
    num: "1",
    unitId: "",
    unitName: "",
    unitType: "",
    unitDescription: "",
    accessType: "",
  });

  const [unit2, setUnit2] = useState({
    num: "2",
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

  const fetchCurrentUnits = async () => {
    console.log("Entering fetch Current");
    units.map((element) => {
      if (`${element.idunit}` === unit1.unitId) {
        setUnit1({
          ...unit1,
          unitId: unit1.unitId,
          unitName: element.name,
          unitType: element.type,
          unitDescription: element.description,
          accessType: element.access,
        });
      }
      if (`${element.idunit}` === unit2.unitId) {
        setUnit2({
          ...unit2,
          unitId: unit2.unitId,
          unitName: element.name,
          unitType: element.type,
          unitDescription: element.description,
          accessType: element.access,
        });
      }
    });
  };

  const handleChange1 = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUnit1({ ...unit1, [fieldName]: fieldValue });
  };

  const handleChange2 = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUnit2({ ...unit2, [fieldName]: fieldValue });
  };

  ////////////////////////////////////////////////////////////////////////

  const [gauge, setGauge] = useState({
    university: 0,
    unit1: 0,
    unit2: 0,
  });

  const fetchUniversityGauge = async () => {
    console.log(profile?.user?.organizationName);
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/dashboards/universityanalysis/gauge/${profile?.user?.organizationName}`
        : `http://localhost:3001/dashboards/universityanalysis/gauge/${profile?.user?.organizationName}`,
      config
    );
    setGauge({ ...gauge, university: data.gaugeData });
  };

  const fetchGauge = async (unit) => {
    const response = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/dashboards/myunitsanalysis/gauge/${unit.unitId}`
        : `http://localhost:3001/dashboards/myunitsanalysis/gauge/${unit.unitId}`,
      config
    );
    if (unit.num === "1") {
      setGauge({ ...gauge, unit1: response.data.gaugeData });
    } else {
      setGauge({ ...gauge, unit2: response.data.gaugeData });
    }
  };

  /////////////////////////////////////////////////////////

  const [radar, setRadar] = useState({});

  const fetchUniversityRadar = async () => {
    const university = profile?.user?.organizationName;
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/dashboards/universityanalysis/radar/${university}`
        : `http://localhost:3001/dashboards/universityanalysis/radar/${university}`,
      config
    );
    setRadar({
      ...gauge,
      university: { unitName: university, data: data.radarData },
    });
  };

  const fetchRadar = async (unit) => {
    const response = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/dashboards/myunitsanalysis/radar/${unit.unitId}`
        : `http://localhost:3001/dashboards/myunitsanalysis/radar/${unit.unitId}`,
      config
    );
    if (unit.num === "1") {
      setRadar({
        ...radar,
        unit1: { unitName: unit1.unitName, data: response.data.radarData },
      });
    } else {
      setRadar({
        ...radar,
        unit2: {
          unitName: unit2.unitName,
          data: response.data.radarData,
        },
      });
    }
  };
  ////////////////////////////////////////////////////////////////////
  const [distBar, setDistBar] = useState({});

  const fetchUniversityDistBar = async () => {
    const university = profile?.user?.organizationName;
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/dashboards/universityanalysis/distbar/${university}`
        : `http://localhost:3001/dashboards/universityanalysis/distbar/${university}`,
      config
    );
    setDistBar({
      ...distBar,
      university: { unitName: university, data: data.distBarData },
    });
  };

  const fetchDistBar = async (unit) => {
    const response = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/dashboards/myunitsanalysis/distbar/${unit.unitId}`
        : `http://localhost:3001/dashboards/myunitsanalysis/distbar/${unit.unitId}`,
      config
    );
    if (unit.num === "1") {
      setDistBar({
        ...distBar,
        unit1: { unitName: unit1.unitName, data: response.data.distBarData },
      });
    } else {
      setDistBar({
        ...distBar,
        unit2: {
          unitName: unit2.unitName,
          data: response.data.distBarData,
        },
      });
    }
  };
  ////////////////////////////////////////////////////////////////////////
  const [bar, setBar] = useState({});

  const fetchBar = async (unit) => {
    const response = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/dashboards/myunitsanalysis/bar/${unit.unitId}`
        : `http://localhost:3001/dashboards/myunitsanalysis/bar/${unit.unitId}`,
      config
    );
    if (unit.num === "1") {
      setBar({
        ...bar,
        unit1: response.data.barData,
      });
    } else {
      setBar({
        ...bar,
        unit2: response.data.barData,
      });
    }
  };
  /////////////////////////////////////////////////////////////////
  const [hbar, setHbar] = useState({});

  const fetchHbar = async (unit) => {
    const response = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/dashboards/myunitsanalysis/hbar/${unit.unitId}`
        : `http://localhost:3001/dashboards/myunitsanalysis/hbar/${unit.unitId}`,
      config
    );
    if (unit.num === "1") {
      setHbar({
        ...hbar,
        unit1: response.data.hbarData,
      });
    } else {
      setHbar({
        ...hbar,
        unit2: response.data.hbarData,
      });
    }
  };
  ////////////////////////////////////////////////////////////////////
  const renderUnitAnalytics = async (unit) => {
    if (!(unit.unitId === "")) {
      await fetchGauge(unit);
      await fetchRadar(unit);
      await fetchDistBar(unit);
      await fetchBar(unit);
      await fetchHbar(unit);
    } else {
      if (unit.num === "1") {
        setGauge({ ...gauge, unit1: 0 });
        setRadar({ ...radar, unit1: {} });
        setDistBar({ ...distBar, unit1: {} });
        setBar({ ...bar, unit1: {} });
        setHbar({ ...hbar, unit1: {} });
      } else {
        setGauge({ ...gauge, unit2: 0 });
        setRadar({ ...radar, unit2: {} });
        setDistBar({ ...distBar, unit2: {} });
        setBar({ ...bar, unit2: {} });
        setHbar({ ...hbar, unit2: {} });
      }
    }
  };

  /////////////////////////////////////////////////////////

  useEffect(() => {
    document.title = "My University Analytics";
    setProfile(JSON.parse(localStorage.getItem("profile")));
    if (!profile?.token) {
      window.location = "/login";
    }
    fetchData();
    fetchUniversityGauge();
    fetchUniversityRadar();
    fetchUniversityDistBar();
  }, []);

  useEffect(() => {
    fetchCurrentUnits();
    renderUnitAnalytics(unit1);
  }, [unit1.unitId, unit1.unitName]);

  useEffect(() => {
    fetchCurrentUnits();
    renderUnitAnalytics(unit2);
  }, [unit2.unitId, unit2.unitName]);

  return (
    <div>
      <div className="container">
        <Sidebar />
        <div className="charts-container">
          <div className="form">
            <div className="units-selection">
              <div>
                <label htmlFor="unitId"> Change Unit 1 : </label>
                <select
                  id="unitId"
                  name="unitId"
                  value={unit1.unitId}
                  onChange={handleChange1}
                >
                  <option value=""> Select your unit</option>
                  {units?.map((unit) => (
                    <option key={unit.idunit} value={unit.idunit}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="unitId"> Change Unit 2 : </label>
                <select
                  id="unitId"
                  name="unitId"
                  value={unit2.unitId}
                  onChange={handleChange2}
                >
                  <option value=""> Select your unit</option>
                  {units?.map((unit) => (
                    <option key={unit.idunit} value={unit.idunit}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row-container">
            <div className="small-chart-univ">
              <h4 className="chartTitle"> Your unit 1 average </h4>
              <div className="gaugeText">
                <h4 style={{ color: "red" }}>Low</h4>
                <h4 style={{ color: "orange" }}>Moderate</h4>
                <h4 style={{ color: "green" }}>High</h4>
              </div>
              <Gauge data={gauge.unit1 ? Number(gauge.unit1.toFixed(2)) : 0} />
              <h5 className="chartText">
                Your unit 1 global average is :{" "}
                {gauge.unit1 ? Number(gauge.unit1.toFixed(2)) : 0} / 4
              </h5>
            </div>
            <div className="small-chart-univ">
              <h4 className="chartTitle"> Your university average </h4>
              <div className="gaugeText">
                <h4 style={{ color: "red" }}>Low</h4>
                <h4 style={{ color: "orange" }}>Moderate</h4>
                <h4 style={{ color: "green" }}>High</h4>
              </div>
              <Gauge
                data={
                  gauge.university ? Number(gauge.university.toFixed(2)) : 0
                }
              />
              <h5 className="chartText">
                Your university global average is :
                {gauge.university ? Number(gauge.university.toFixed(2)) : 0} / 4
              </h5>
            </div>
            <div className="small-chart-univ">
              <h4 className="chartTitle"> Your unit 2 average </h4>
              <div className="gaugeText">
                <h4 style={{ color: "red" }}>Low</h4>
                <h4 style={{ color: "orange" }}>Moderate</h4>
                <h4 style={{ color: "green" }}>High</h4>
              </div>
              <Gauge data={gauge.unit2 ? Number(gauge.unit2.toFixed(2)) : 0} />
              <h5 className="chartText">
                Your unit 2 global average is :{" "}
                {gauge.unit2 ? Number(gauge.unit2.toFixed(2)) : 0} / 4
              </h5>
            </div>
          </div>
          <div className="row-container">
            <div className="chart">
              <h4 className="charTitle">
                Radar Chart : Performances of my unit regarding all Dimensions &
                Levels
              </h4>
              <RadarChart
                data={radar?.unit1}
                data2={radar?.unit2}
                data3={radar?.university}
              />
            </div>

            <div className="chart">
              <h4 className="charTitle">
                Bar Chart : Distances between professions in terms of Global
                Mark
              </h4>
              <DistanceBarChart
                data={distBar?.unit1}
                data2={distBar?.unit2}
                data3={distBar?.university}
              />
            </div>
          </div>
          <div className="row-container">
            <div className="chart">
              <h4 className="charTitle">
                Bar Chart : Dimensions Marks in the unit per profession for
                Unit: {unit1.unitName}
              </h4>
              <BarChart data={bar?.unit1} />
            </div>

            <div className="chart">
              <h4 className="charTitle">
                Bar Chart : Dimensionss Marks in the unit per profession for
                Unit: {unit2.unitName}
              </h4>
              <BarChart data={bar?.unit2} />
            </div>
          </div>
          <div className="row-container">
            <div className="chart">
              <h4 className="charTitle">
                Horizontal Bar Chart : Levels Marks in the unit per profession
                for Unit: {unit1.unitName}
              </h4>
              <HorizontalChart data={hbar?.unit1} />
            </div>

            <div className="chart">
              <h4 className="charTitle">
                Horizontal Bar Chart : Levels Marks in the unit per profession
                for Unit: {unit2.unitName}
              </h4>
              <HorizontalChart data={hbar?.unit2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversityAnalytics;
