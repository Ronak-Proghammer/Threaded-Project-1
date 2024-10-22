import express from "express"
import db from "./Backend/utils/db-connection.js";
import path from "path"
import router from "./Backend/Routes/routes.js";
import { fileURLToPath } from 'node:url'
import { dirname } from "node:path";
import cors from 'cors';
import session from "express-session";

export const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
export const options = { root: path.join(__dirname, "Frontend") };

app.use(express.static(path.join(__dirname, "Frontend")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(session({
  secret: 'travelxperts',
  resave: false,
  saveUninitialized: false
}));  

db.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

app.use(router);

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});

router.get('/order/:packageId', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'order.html'));
});
