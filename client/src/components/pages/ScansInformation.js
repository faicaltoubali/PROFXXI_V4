import React from "react";
import { Link } from "react-router-dom";
import "./Default.css";
import Footer from "../Footer";

function ScansInformation() {
  return (
    <>
      <h2>Scan Questionnaires Information</h2>
      <div className="middle-container">
        <div>
          <h3>Information about the scan I : Basic Scan</h3>
          <div className="item-area-2">
            <ul style={{ padding: "1.5rem" }}>
              <li>
                Introduction :
                <p className="scan-text">
                  This scan is used as a questionnaire to ask participants about
                  their position towards many competences levels in their
                  institution or organization. The data collected is submitted
                  to General Data Protection Regulation
                </p>
              </li>
              <li>Type of the scan : </li>
              <p className="scan-text"> Basic Type </p>
              <li>Who should answer this questionnaire ?</li>
              <p className="scan-text">
                This questionnaire can be answered regardless the position of
                the participant
              </p>
              <li>How the collected data will be used ?</li>
              <p className="scan-text">
                The collected data will be used to construct, design dashboards
                containing graphical information.
              </p>
              <Link to="/scangenerator">
                <button className="btn">Create your scan</button>
              </Link>
            </ul>
          </div>
          <h3>Information about the scan II : Students scan</h3>
          <div className="item-area-2">
            <ul style={{ padding: "1.5rem" }}>
              <li>- Introduction</li>
              <p className="scan-text">
                This scan is used as a questionnaire to ask students about their
                position towards many competences levels in their institution or
                organization. The data collected is submitted to General Data
                Protection Regulation
              </p>
              <li>- What is this scan for ?</li>
              <p className="scan-text"> Student Scan Type </p>
              <li>- Who should answer this questionnaire ?</li>
              <p className="scan-text">
                This questionnaire can be answered only by students
              </p>
              <li>- How the data collected will be used ?</li>
              <p className="scan-text">
                The collected data will be used to construct, design dashboards
                containing graphical information.
              </p>
              <Link to="/scangenerator">
                <button className="btn">Create your scan</button>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ScansInformation;
