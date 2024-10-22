import mysql from "mysql2/promise";

var con = await mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  // password: "Admin@123",
  // password:"P@ssw0rd",
  password: "password",
  database: "travelexperts",
});

export default con;
