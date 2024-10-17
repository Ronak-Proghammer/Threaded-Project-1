var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Admin@123",
  database: "travelexperts",
});

module.exports = con;
