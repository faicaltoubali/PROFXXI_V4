const mysql = require("mysql");

const db = mysql.createConnection({
  user: process.env.ENV_NODE === "production" ? process.env.DB_USER : "root",
  host:
    process.env.ENV_NODE === "production" ? process.env.DB_HOST : "localhost",
  password:
    process.env.ENV_NODE === "production"
      ? process.env.DB_PASSWORD
      : "Faicalmysql99",
  database:
    process.env.ENV_NODE === "production" ? process.env.DB_NAME : "profxxi",
});

db.connect(function (err) {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully connected to the database");
  }
});

module.exports = db;
