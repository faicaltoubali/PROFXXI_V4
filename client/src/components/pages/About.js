import React, { useEffect } from "react";
import "./Default.css";
import Footer from "../../components/Footer";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

function About() {
  useEffect(() => {
    document.title = "About Us";
  }, []);

  return (
    <>
      <h2> Want to know more about us ?</h2>
      <div className="middle-container">
        <ReactPlayer
          className="element"
          height="500px"
          width="800px"
          url="https://www.youtube.com/watch?v=rz9RQmqWgvM"
        />
      </div>
      <div className="middle-container">
        <Link to="/login">
          <button className="btn">Log In / Register</button>
        </Link>

        <Link to="/contact">
          <button className="btn"> Contact Us</button>
        </Link>
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

export default About;
