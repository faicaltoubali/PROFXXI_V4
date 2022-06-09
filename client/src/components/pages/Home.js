import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import FrontText from "../../components/FrontText";
import ReactPlayer from "react-player";
import Footer from "../../components/Footer";
import "./Home.css";

import i18n from "./../../i18n";
import { useTranslation } from "react-i18next";
import { LangContext } from "./../contexts/LangContext";

function Home() {
  // Translation
  const { t } = useTranslation();
  const { lang, setLang } = useContext(LangContext);

  const handleTranslate = () => {
    i18n.changeLanguage(lang);
  };
  //

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      <div className="middle-container-home">
        <div className="element-container-home">
          <ReactPlayer
            className="element"
            height="500px"
            width="800px"
            url="https://www.youtube.com/watch?v=rz9RQmqWgvM"
          />
        </div>
        <div className="element-container">
          <p className="element-text">{t("Intro")}</p>
        </div>
      </div>

      <div className="logos-container">
        <a href="http://www.profxxi.org/?lang=en">
          <img src="/images/univscollab.jpg" alt="" />
        </a>
      </div>

      <Footer />
    </>
  );
}

export default Home;
