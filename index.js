import express from "express"
import db from "./Backend/utils/db-connection.js";
import path from "path"
import router from "./Backend/Routes/routes.js";
import { getAllAgenciesAndAgents } from "./Backend/db-helper/contact.js";

const app = express();
const __dirname = import.meta.dirname;

const options = { root: path.join(__dirname, "Frontend") };

app.use(express.static(path.join(__dirname, "Frontend")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

app.use(router);

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
