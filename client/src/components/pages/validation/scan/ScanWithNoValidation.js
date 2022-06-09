import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer";
import "./Default.css";

const DimensionObjectContext = React.createContext();

function Scan({ match }) {
  const [scan, setScan] = useState({
    id: "",
    name: "",
    description: "",
    dimensionA: "",
    dimensionB: "",
    dimensionC: "",
    dimensionD: "",
    dimensionE: "",
    answers: "",
  });

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "Teacher",
  });

  const [idScan, setIdScan] = useState("");
  const [userAnswers, setUsersAnswers] = useState({});
  const [text, setText] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const getScan = async () => {
    const data = await fetch("/Scan.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const items = await data.json();
    setScan(items);
    console.log(items);
  };

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUsersAnswers({ ...userAnswers, [fieldName]: fieldValue });
  };

  const handleUserChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUser({ ...user, [fieldName]: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    console.log(userAnswers);

    const { data } = await axios.post(
      process.env.REACT_APP_ENV === "production"
        ? "/api/links/answerscan"
        : "http://localhost:3001/links/answerscan",
      { user: user, userAnswers: userAnswers, idScan: idScan }
    );

    if (data.added) {
      window.location = "/thanks";
    } else {
      setText(
        "There has been an error while registring your answers, please try later or contact us via contact page"
      );
    }
  };

  const checkScan = async () => {
    const userid = match.params.userid;
    const unitid = match.params.unitid;
    const scantoken = match.params.scantoken;

    const { data } = await axios.get(
      process.env.REACT_APP_ENV === "production"
        ? `/api/links/checklink/${userid}/${unitid}/${scantoken}`
        : `http://localhost:3001/links/checklink/${userid}/${unitid}/${scantoken}`
    );
    console.log(data);

    if (!data?.error) {
      if (data.authorized) {
        setIdScan(data.idquestionnaire);
        setAuthorized(true);
        getScan();
      } else {
        setText(
          "You are not authorized to answer this scan, please contact your manager"
        );
      }
    } else {
      window.location = "/error";
    }
  };

  useEffect(() => {
    document.title = "Scan";
    checkScan();
    console.log(idScan);
    console.log(match);
    console.log(match.params);
  }, []);

  const getDimension = (dimension) => {
    if (dimension === "A") {
      return scan.dimensionA;
    } else if (dimension === "B") {
      return scan.dimensionB;
    } else if (dimension === "C") {
      return scan.dimensionC;
    } else if (dimension === "D") {
      return scan.dimensionD;
    } else {
      return scan.dimensionE;
    }
  };

  return (
    <div>
      {authorized ? (
        <div className="middle-container">
          <article className="form">
            <form>
              <div>
                <label htmlFor="firstName"> First Name :</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleUserChange}
                />

                <label htmlFor="lastName"> Last Name :</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleUserChange}
                />
              </div>

              <div>
                <label htmlFor="email"> Email :</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleUserChange}
                />

                <label htmlFor="position">Position :</label>
                <select
                  name="position"
                  id="position"
                  value={user.position}
                  onChange={handleUserChange}
                >
                  <option value="Teacher">Teacher</option>
                  <option value="Administrator"> Administrator</option>
                  <option value="Manager"> Manager</option>
                </select>
              </div>

              <DimensionObjectContext.Provider
                value={{ handleChange, userAnswers, scan }}
              >
                <div>
                  <div className="item-area-2">
                    <div className="items-wrapper">
                      <h3>Description</h3>
                      <p>{scan.description}</p>
                    </div>
                  </div>
                  <div className="item-area-2">
                    <div className="items-wrapper">
                      <h3>Competence A</h3>
                      <DimensionObject
                        key="A"
                        {...scan}
                        dimension="A"
                        getDimension={getDimension}
                      />
                    </div>
                  </div>
                  <div className="item-area-2">
                    <div className="items-wrapper">
                      <h3>Competences B</h3>
                      <DimensionObject
                        key="B"
                        {...scan}
                        dimension="B"
                        getDimension={getDimension}
                      />
                    </div>
                  </div>
                  <div className="item-area-2">
                    <div className="items-wrapper">
                      <h3>Competences C</h3>
                      <DimensionObject
                        key="C"
                        {...scan}
                        dimension="C"
                        getDimension={getDimension}
                      />
                    </div>
                  </div>
                  <div className="item-area-2">
                    <div className="items-wrapper">
                      <h3>Competences D</h3>
                      <DimensionObject
                        key="D"
                        {...scan}
                        dimension="D"
                        getDimension={getDimension}
                      />
                    </div>
                  </div>
                  <div className="item-area-2">
                    <div className="items-wrapper">
                      <h3>Competences E</h3>
                      <DimensionObject
                        key="E"
                        {...scan}
                        dimension="E"
                        getDimension={getDimension}
                      />
                    </div>
                  </div>
                </div>
              </DimensionObjectContext.Provider>
              <button className="btn" onClick={handleSubmit}>
                Send
              </button>
            </form>
          </article>
        </div>
      ) : (
        <div className="column-container">
          <h3 style={{ textAlign: "center", margin: "2rem" }}> {text} </h3>
          <img width="50%" height="50%" src="/images/404.jpg" alt="" />
        </div>
      )}

      <Footer></Footer>
    </div>
  );
}

const DimensionObject = ({ dimension, getDimension }) => {
  const { handleChange } = useContext(DimensionObjectContext);
  const { scan } = useContext(DimensionObjectContext);
  const { userAnswers } = useContext(DimensionObjectContext);

  const dim = getDimension(dimension);
  return Object.keys(dim).map((key, index) => {
    const level = `${key}`;

    return (
      <div>
        {index + 1} - {dim[key]}
        <div>
          <label htmlFor={level}> </label>
          <select
            id={level}
            name={level}
            value={userAnswers.level}
            onChange={handleChange}
          >
            <option> Select your Mark Please </option>;
            {Object.keys(scan.answers).map((key, index) => {
              return <option value={index + 1}>{scan.answers[key]}</option>;
            })}
          </select>
        </div>
      </div>
    );
  });
};

export default Scan;
