require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

const unitRoute = require("./routes/unitRoute");
app.use("/units", unitRoute);

const linkRoute = require("./routes/linkRoute");
app.use("/links", linkRoute);

const dashboardRoute = require("./routes/dashboardRoute");
app.use("/dashboards", dashboardRoute);

const initiativeRoute = require("./routes/initiativeRoute");
app.use("/initiatives", initiativeRoute);

app.listen(3001, () => {
  console.log("runing server on port 3001");
});
