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
import { Warning } from "@material-ui/icons";

function GlobalAnalytics() {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.token}`,
    },
  };

  const [univ1, setUniv1] = useState({
    univNum: "1",
    univName: "",
    units: [],
  });

  const [univ2, setUniv2] = useState({
    univNum: "2",
    univName: "",
    units: [],
  });

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

  const [univs, setUnivs] = useState([]);

  const fetchUnivs = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? "/api/dashboards/globalanalysis"
        : "http://localhost:3001/dashboards/globalanalysis",
      config
    );
    setUnivs(data.univsResult);
  };

  const fetchUnits = async (univ) => {
    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/dashboards/globalanalysis/${univ.univName}`
        : `http://localhost:3001/dashboards/globalanalysis/${univ.univName}`,
      config
    );
    if (univ.univNum === "1") {
      setUniv1({ ...univ1, units: data.unitsResult });
    } else {
      setUniv2({ ...univ2, units: data.unitsResult });
    }
  };

  const fetchCurrentUnit = async (univ) => {
    if (univ.univNum === "1") {
      univ?.units?.map((element) => {
        if (`${element.idunit}` === unit1.unitId) {
          setUnit1({
            ...unit1,
            unitName: element.name,
            unitType: element.type,
            unitDescription: element.description,
            accessType: element.access,
          });
        } else if (unit1.unitId === "Global") {
          setUnit1({
            num: "1",
            unitId: "Global",
            unitName: univ.univName,
            unitType: "University",
            unitDescription: "Global Analytics",
            accessType: "Public",
          });
        } else if (unit1.unitId === "") {
          setUnit1({
            num: "1",
            unitId: "",
            unitName: "",
            unitType: "",
            unitDescription: "",
            accessType: "",
          });
        }
      });
    } else {
      univ?.units?.map((element) => {
        if (`${element.idunit}` === unit2.unitId) {
          setUnit2({
            ...unit2,
            unitName: element.name,
            unitType: element.type,
            unitDescription: element.description,
            accessType: element.access,
          });
        } else if (unit2.unitId === "Global") {
          setUnit2({
            num: "2",
            unitId: "Global",
            unitName: univ.univName,
            unitType: "University",
            unitDescription: "Global Analytics",
            accessType: "Public",
          });
        } else if (unit2.unitId === "") {
          setUnit2({
            num: "2",
            unitId: "",
            unitName: "",
            unitType: "",
            unitDescription: "",
            accessType: "",
          });
        }
      });
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  const [gauge, setGauge] = useState({ unit1: 0, unit2: 0 });

  const fetchGauge = async (unit) => {
    let req = ``;
    if (unit.unitId === "Global") {
      req =
        process.env.REACT_APP_ENV === "production"
          ? `/api/dashboards/universityanalysis/gauge/${unit.unitName}`
          : `http://localhost:3001/dashboards/universityanalysis/gauge/${unit.unitName}`;
    } else {
      req =
        process.env.REACT_APP_ENV === "production"
          ? `/api/dashboards/myunitsanalysis/gauge/${unit.unitId}`
          : `http://localhost:3001/dashboards/myunitsanalysis/gauge/${unit.unitId}`;
    }

    const response = await axios.get(req, config);

    if (unit.num === "1") {
      setGauge({ ...gauge, unit1: response.data.gaugeData });
    } else {
      setGauge({ ...gauge, unit2: response.data.gaugeData });
    }
  };

  ///////////////////////////////////////////////////////////////////////////
  const [pie, setPie] = useState({ unit1: 0, unit2: 0 });

  const fetchPie = async (unit) => {
    let req = ``;
    if (unit.unitId === "Global") {
      req =
        process.env.REACT_APP_ENV === "production"
          ? `/api/dashboards/universityanalysis/pie/${unit.unitName}`
          : `http://localhost:3001/dashboards/universityanalysis/pie/${unit.unitName}`;
    } else {
      req =
        process.env.REACT_APP_ENV === "production"
          ? `/api/dashboards/myunitsanalysis/pie/${unit.unitId}`
          : `http://localhost:3001/dashboards/myunitsanalysis/pie/${unit.unitId}`;
    }

    const response = await axios.get(req, config);
    if (unit.num === "1") {
      setPie({ ...pie, unit1: response.data.pieData });
    } else {
      setPie({ ...pie, unit2: response.data.pieData });
    }
  };

  /////////////////////////////////////////////////////////////////////////

  const [radar, setRadar] = useState({});

  const fetchRadar = async (unit) => {
    let req = ``;
    if (unit.unitId === "Global") {
      req =
        process.env.REACT_APP_ENV === "production"
          ? `/api/dashboards/universityanalysis/radar/${unit.unitName}`
          : `http://localhost:3001/dashboards/universityanalysis/radar/${unit.unitName}`;
    } else {
      req =
        process.env.REACT_APP_ENV === "production"
          ? `/api/dashboards/myunitsanalysis/radar/${unit.unitId}`
          : `http://localhost:3001/dashboards/myunitsanalysis/radar/${unit.unitId}`;
    }

    const response = await axios.get(req, config);

    if (unit.num === "1") {
      setRadar({
        ...radar,
        unit1: {
          unitName:
            unit1.unitType === "University"
              ? "University: " + unit1.unitName
              : "Unit: " + unit1.unitName,
          data: response.data.radarData,
        },
      });
    } else {
      setRadar({
        ...radar,
        unit2: {
          unitName:
            unit2.unitType === "University"
              ? "University: " + unit2.unitName
              : "Unit: " + unit2.unitName,
          data: response.data.radarData,
        },
      });
    }
  };

  ///////////////////////////////////////////////////////////////////////////

  const [distBar, setDistBar] = useState({});

  const fetchDistBar = async (unit) => {
    let req = ``;
    if (unit.unitId === "Global") {
      req =
        process.env.REACT_APP_ENV === "production"
          ? `/api/dashboards/universityanalysis/distbar/${unit.unitName}`
          : `http://localhost:3001/dashboards/universityanalysis/distbar/${unit.unitName}`;
    } else {
      req =
        process.env.REACT_APP_ENV === "production"
          ? `/api/dashboards/myunitsanalysis/distbar/${unit.unitId}`
          : `http://localhost:3001/dashboards/myunitsanalysis/distbar/${unit.unitId}`;
    }

    const response = await axios.get(req, config);
    if (unit.num === "1") {
      setDistBar({
        ...distBar,
        unit1: {
          unitName:
            unit1.unitType === "University"
              ? "University: " + unit1.unitName
              : "Unit: " + unit1.unitName,
          data: response.data.distBarData,
        },
      });
    } else {
      setDistBar({
        ...distBar,
        unit2: {
          unitName:
            unit2.unitType === "University"
              ? "University: " + unit2.unitName
              : "Unit: " + unit2.unitName,
          data: response.data.distBarData,
        },
      });
    }
  };

  ///////////////////////////////////////////////////////////////////////////
  const [bar, setBar] = useState({});

  const fetchBar = async (unit) => {
    let req = ``;
    if (unit.unitId === "Global") {
      req =
        process.env.REACT_APP_ENV === "production"
          ? `/api/dashboards/globalanalysis/bar/${unit.unitName}`
          : `http://localhost:3001/dashboards/globalanalysis/bar/${unit.unitName}`;
    } else {
      req =
        process.env.REACT_APP_ENV === "production"
          ? `/api/dashboards/myunitsanalysis/bar/${unit.unitId}`
          : `http://localhost:3001/dashboards/myunitsanalysis/bar/${unit.unitId}`;
    }

    const response = await axios.get(req, config);
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
    let req = ``;
    if (unit.unitId === "Global") {
      req =
        process.env.REACT_APP_ENV === "production"
          ? `/api/dashboards/globalanalysis/hbar/${unit.unitName}`
          : `http://localhost:3001/dashboards/globalanalysis/hbar/${unit.unitName}`;
    } else {
      req =
        process.env.REACT_APP_ENV === "production"
          ? `/api/dashboards/myunitsanalysis/hbar/${unit.unitId}`
          : `http://localhost:3001/dashboards/myunitsanalysis/hbar/${unit.unitId}`;
    }

    const response = await axios.get(req, config);
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

  /////////////////////////////////////////////////////////////////////

  const renderUnitAnalytics = async (unit) => {
    if (!(unit.unitId === "")) {
      await fetchGauge(unit);
      await fetchPie(unit);
      await fetchRadar(unit);
      await fetchDistBar(unit);
      await fetchBar(unit);
      await fetchHbar(unit);
    } else {
      if (unit.num === "1") {
        setGauge({ ...gauge, unit1: 0 });
        setPie({ ...pie, unit1: 0 });
        setRadar({ ...radar, unit1: {} });
        setDistBar({ ...distBar, unit1: {} });
        setBar({ ...bar, unit1: {} });
        setHbar({ ...hbar, unit1: {} });
      } else {
        setGauge({ ...gauge, unit2: 0 });
        setPie({ ...pie, unit2: 0 });
        setRadar({ ...radar, unit2: {} });
        setDistBar({ ...distBar, unit2: {} });
        setBar({ ...bar, unit2: {} });
        setHbar({ ...hbar, unit2: {} });
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    document.title = "Global Analytics";
    setProfile(JSON.parse(localStorage.getItem("profile")));
    if (!profile?.token) {
      window.location = "/login";
    }
    fetchUnivs();
  }, []);

  useEffect(() => {
    fetchUnits(univ1);
    fetchCurrentUnit(univ1);
  }, [univ1.univName, unit1.unitId, unit1.unitName]);

  useEffect(() => {
    fetchUnits(univ2);
    fetchCurrentUnit(univ2);
  }, [univ2.univName, unit2.unitId, unit2.unitName]);

  useEffect(() => {
    renderUnitAnalytics(unit1);
  }, [unit1.unitId, unit1.unitName]);

  useEffect(() => {
    renderUnitAnalytics(unit2);
  }, [unit2.unitId, unit2.unitName]);

  return (
    <div>
      <div className="container">
        <Sidebar />
        <div className="charts-container">
          <div className="row-container">
            <Warning style={{ color: "orange" }} />

            <h4 className="chartText" style={{ color: "orange" }}>
              Only public units from universities are displayed !
            </h4>
          </div>
          <div className="form">
            <div className="units-selection">
              <div>
                <label htmlFor="univ1"></label>
                <select
                  id="univ1"
                  name="univ1"
                  value={univ1.univName}
                  onChange={(e) =>
                    setUniv1({ ...univ1, univName: e.target.value })
                  }
                >
                  <option value=""> Select your university 1</option>
                  {univs?.map((univ) => (
                    <option
                      key={univ.organizationName}
                      value={univ.organizationName}
                    >
                      {univ.organizationName}
                    </option>
                  ))}
                </select>
                <label htmlFor="unit1"></label>
                <select
                  id="unit1"
                  name="unit1"
                  value={unit1.unitId}
                  onChange={(e) =>
                    setUnit1({ ...unit1, unitId: e.target.value })
                  }
                >
                  <option value=""> Select your unit</option>
                  <option value="Global">
                    Global Analytics ( University Overview )
                  </option>

                  {univ1?.units?.map((unit) => (
                    <option key={unit.idunit} value={unit.idunit}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="univ2"></label>
                <select
                  id="univ2"
                  name="univ2"
                  value={univ2.univName}
                  onChange={(e) =>
                    setUniv2({ ...univ2, univName: e.target.value })
                  }
                >
                  <option value=""> Select your university 2</option>
                  {univs?.map((univ) => (
                    <option
                      key={univ.organizationName}
                      value={univ.organizationName}
                    >
                      {univ.organizationName}
                    </option>
                  ))}
                </select>
                <label htmlFor="unit2"></label>
                <select
                  id="unit2"
                  name="unit2"
                  value={unit2.unitId}
                  onChange={(e) =>
                    setUnit2({ ...unit2, unitId: e.target.value })
                  }
                >
                  <option value=""> Select your unit</option>
                  <option value="Global">
                    Global Analytics ( University Overview )
                  </option>

                  {univ2?.units?.map((unit) => (
                    <option key={unit.idunit} value={unit.idunit}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row-container">
            <div className="small-chart">
              <h4 className="chartTitle">
                {" "}
                Your {unit1.unitType === "University" ? "University" : "Unit"} 1
                average{" "}
              </h4>
              <div className="gaugeText">
                <h4 style={{ color: "red" }}>Low</h4>
                <h4 style={{ color: "orange" }}>Moderate</h4>
                <h4 style={{ color: "green" }}>High</h4>
              </div>
              <Gauge data={gauge.unit1 ? Number(gauge.unit1.toFixed(2)) : 0} />
              <h4 className="chartText">
                Your {unit1.unitType === "University" ? "University" : "Unit"} 1
                global average is :{" "}
                {gauge.unit1 ? Number(gauge.unit1.toFixed(2)) : 0} / 4
              </h4>
            </div>

            <div className="small-chart">
              <h4 className="chartTitle">
                {" "}
                Your {unit2.unitType === "University" ? "University" : "Unit"} 2
                average{" "}
              </h4>
              <div className="gaugeText">
                <h4 style={{ color: "red" }}>Low</h4>
                <h4 style={{ color: "orange" }}>Moderate</h4>
                <h4 style={{ color: "green" }}>High</h4>
              </div>
              <Gauge data={gauge.unit2 ? Number(gauge.unit2.toFixed(2)) : 0} />
              <h4 className="chartText">
                Your {unit2.unitType === "University" ? "University" : "Unit"} 2
                global average is :{" "}
                {gauge.unit2 ? Number(gauge.unit2.toFixed(2)) : 0} / 4
              </h4>
            </div>
          </div>
          <div className="row-container">
            <div className="small-chart">
              <h4 className="charTitle">
                Pie Chart : Participants in your{" "}
                {unit1.unitType === "University" ? "University" : "Unit"} 1
              </h4>
              <PieChart data={pie?.unit1} />
            </div>
            <div className="small-chart">
              <h4 className="charTitle">
                Pie Chart : Participants in your{" "}
                {unit2.unitType === "University" ? "University" : "Unit"} 2
              </h4>
              <PieChart data={pie?.unit2} />
            </div>
          </div>
          <div className="row-container">
            <div className="chart">
              <h4 className="charTitle">
                Radar Chart : Performances of the units regarding all Dimensions
                & Levels
              </h4>
              <RadarChart data={radar?.unit1} data2={radar?.unit2} />
            </div>
            <div className="chart">
              <h4 className="charTitle">
                Bar Chart : Distances between professions in terms of Global
                Mark
              </h4>
              <DistanceBarChart data={distBar?.unit1} data2={distBar?.unit2} />
            </div>
          </div>
          <div className="row-container">
            <div className="chart">
              <h4 className="charTitle">
                Bar Chart : Dimensions Marks in the unit per profession for{" "}
                {unit1.unitType === "University" ? "University" : "Unit"}{" "}
                {unit1.unitName}
              </h4>
              <BarChart data={bar?.unit1} />
            </div>
            <div className="chart">
              <h4 className="charTitle">
                Bar Chart : Dimensionss Marks in the unit per profession for
                {unit2.unitType === "University" ? "University" : "Unit"}{" "}
                {unit2.unitName}
              </h4>
              <BarChart data={bar?.unit2} />
            </div>
          </div>
          <div className="row-container">
            <div className="chart">
              <h4 className="charTitle">
                Horizontal Bar Chart : Levels Marks in the unit per profession
                for {unit1.unitType === "University" ? "University" : "Unit"}{" "}
                {unit1.unitName}
              </h4>
              <HorizontalChart data={hbar?.unit1} />
            </div>

            <div className="chart">
              <h4 className="charTitle">
                Horizontal Bar Chart : Levels Marks in the unit per profession
                for {unit2.unitType === "University" ? "University" : "Unit"}{" "}
                {unit2.unitName}
              </h4>
              <HorizontalChart data={hbar?.unit2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalAnalytics;
