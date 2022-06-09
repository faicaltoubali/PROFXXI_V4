import React, { useEffect } from "react";
import Footer from "../../components/Footer";

function Error() {
  useEffect(() => {
    document.title = "Error";
  }, []);

  return (
    <>
      <div className="column-container">
        <h2> ERROR </h2>
        <img width="50%" height="50%" src="/images/404.jpg" alt="" />
      </div>
      <Footer />
    </>
  );
}

export default Error;
