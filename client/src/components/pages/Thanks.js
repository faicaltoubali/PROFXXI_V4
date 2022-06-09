import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "./Default.css";

function Thanks() {
  useEffect(() => {
    document.title = "Thank You";
  }, []);

  return (
    <>
      <h2>Thank You</h2>
      <div className="middle-container">
        <div>
          <p className="element">
            Thank you once again for your kind cooperation! Thank you for taking
            the time out of your day to complete this questionnaire. We highly
            appreciate it.
          </p>
          <p className="element">
            We truly value the information provided by you, as your comments
            will help us in our analysis and will pave the way for further
            improvements in our product offerings.
          </p>
        </div>
        <img src="images/design9.jpg" width="25%" height="25%" alt="" />
      </div>
      <Footer></Footer>
    </>
  );
}

export default Thanks;
