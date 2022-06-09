import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import decode from "jwt-decode";
import { LangContext } from "./../components/contexts/LangContext";

import i18n from "./../i18n";

// Translation
import { useTranslation } from "react-i18next";
import { useContext } from "react";

function Navbar() {
  const [button, setButton] = useState(true);
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const location = useLocation();

  const { lang, setLang } = useContext(LangContext);

  const handleLogOut = () => {
    localStorage.removeItem("profile");
    window.location = "/login";
  };

  // Translation
  const { t } = useTranslation();

  const handleTranslate = (lang) => {
    i18n.changeLanguage(lang);
    setLang(lang);
  };

  //

  useEffect(() => {
    const token = profile?.token;

    if (token) {
      const decodedToken = decode(token);

      setTimeout(() => {
        handleLogOut();
      }, 1000 * 60 * 60);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogOut();
      }
    }

    JSON.parse(localStorage.getItem("profile"));
  }, [location]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img width="70" height="40" src="/images/profxxi.png" alt="" />
          </Link>

          <div className="navbar-lang">
            <button
              className="navbar-lang-item"
              onClick={() => handleTranslate("sp")}
            >
              <img width="30" height="30" src="/images/sp.png"></img>
            </button>

            <button
              className="navbar-lang-item"
              onClick={() => handleTranslate("en")}
            >
              <img width="30" height="30" src="/images/en.png"></img>
            </button>

            <button
              className="navbar-lang-item"
              onClick={() => handleTranslate("fr")}
            >
              <img width="30" height="30" src="/images/fr.png"></img>
            </button>
          </div>

          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/" className="navbar-links">
                {t("Home")}
              </Link>
            </li>

            <li className="navbar-item">
              <Link to="/about" className="navbar-links">
                {t("About Us")}
              </Link>
            </li>

            <li className="navbar-item">
              <Link to="/register" className="navbar-links">
                {t("Register")}
              </Link>
            </li>

            <li className="navbar-item">
              <Link to="/searchinitiatives" className="navbar-links">
                {t("Search Initiatives")}
              </Link>
            </li>

            {!profile && (
              <li className="navbar-item">
                <Link to="/login" className="navbar-links">
                  {t("Login")}
                </Link>
              </li>
            )}

            {profile && (
              <>
                <li className="navbar-item">
                  <Link to="/workingarea" className="navbar-links">
                    {t("Working Area")}
                  </Link>
                </li>

                <li className="navbar-item">
                  <button className="navbar-button" onClick={handleLogOut}>
                    {t("Log Out")}
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
