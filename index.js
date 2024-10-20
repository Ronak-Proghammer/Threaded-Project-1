import express from "express"
import db from "./Backend/utils/db-connection.js";
import path from "path"
import { body, validationResult } from "express-validator";
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

app.post(
  "/api/addcustomer",
  body("CustFirstName")
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage("First name must contain only letters"),
  body("CustLastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha()
    .withMessage("Last name must contain only letters"),
  body("CustAddress")
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 characters"),
  body("CustCity")
    .notEmpty()
    .withMessage("City is required")
    .isAlpha()
    .withMessage("City must contain only letters"),
  body("CustProv").notEmpty().withMessage("Province is required"),
  body("CustPostal")
    .notEmpty()
    .withMessage("Postal Code is required")
    .isPostalCode("any")
    .withMessage("Invalid Postal Code"),
  body("CustCountry").notEmpty().withMessage("Country is required"),
  body("CustHomePhone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),
  body("CustBusPhone")
    .notEmpty()
    .withMessage("Alternate phone number is required")
    .isMobilePhone()
    .withMessage("Invalid alternate phone number"),
  body("CustEmail")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      CustFirstName,
      CustLastName,
      CustAddress,
      CustCity,
      CustProv,
      CustPostal,
      CustCountry,
      CustHomePhone,
      CustBusPhone,
      CustEmail,
    } = req.body;
    const sql = `INSERT INTO customers (CustFirstName, CustLastName, CustAddress, CustCity, CustProv, CustPostal, CustCountry, CustHomePhone, CustBusPhone, CustEmail)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // Insert the validated data into the database
    db.query(
      sql,
      [
        CustFirstName,
        CustLastName,
        CustAddress,
        CustCity,
        CustProv,
        CustPostal,
        CustCountry,
        CustHomePhone,
        CustBusPhone,
        CustEmail,
      ],
      (err, result) => {
        if (err) {
          console.error("Database Error: ", err);
          return res
            .status(500)
            .send("An error occurred while processing your request.");
        } else {
          res.status(201).json({
            message: "Customer registered successfully",
            CustomerId: result.insertId,
          });
        }
      }
    );
  }
);

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
