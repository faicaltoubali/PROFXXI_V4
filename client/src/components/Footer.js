import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

//<div class="footer-link items">
// <h2>PROF XXI © 2021</h2>
//  <h3> Under construction</h3>
// </div>;

function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="footer-links">
          <a className="logo" href="https://www.irit.fr/">
            <img width="120" height="120" src="/images/irit.png" alt="" />
          </a>

          <a className="logo" href="http://www.profxxi.org/?lang=en">
            <img
              width="120"
              height="70"
              style={{ margin: 20 }}
              src="/images/profxxi.png"
              alt=""
            />
          </a>

          <a className="logo" href="https://www.univ-tlse3.fr/">
            <img
              width="250"
              height="80"
              style={{ margin: 20 }}
              src="/images/UPS.jpg"
              alt=""
            />
          </a>

          <a className="logo" href="https://info.erasmusplus.fr/">
            <img
              width="300"
              height="70"
              style={{ margin: "20px 0px 0px 0px" }}
              src="/images/erasmus3.png"
              alt=""
            />
          </a>

          <div className="footer-link-wrapper"></div>
        </div>
        <h4>PROF XXI © 2021</h4>
      </div>
    </>
  );
}

export default Footer;
