import React, { useState, useEffect } from "react";
import "./Default.css";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

function Contact() {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      process.env.REACT_APP_ENV === "production"
        ? "/api/user/contact"
        : "http://localhost:3001/user/contact",
      {
        name: name,
        organization: organization,
        email: email,
        topic: topic,
        message: message,
      }
    );

    setText(data.message);
  };

  useEffect(() => {
    document.title = "Contact us";
  }, []);

  return (
    <>
      <h2> Contact Us</h2>
      <div className="middle-container">
        <article className="form">
          <form>
            <div>
              <label htmlFor="name"> Name :</label>
              <input
                type="name"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="organization"> Your organization's name :</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email"> Email :</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="topic"> Topic :</label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <label htmlFor="message"> Your message :</label>
            <div>
              <textarea
                name="message"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                cols="50"
                rows="5"
              ></textarea>
            </div>
            <button type="submit" className="btn" onClick={handleSubmit}>
              Send Message
            </button>
          </form>
        </article>

        <img
          style={{ marginLeft: "10rem" }}
          width="50%"
          height="50%"
          src="images/contactUs.jpg"
          alt=""
        />
      </div>
      <Footer />
    </>
  );
}

export default Contact;
