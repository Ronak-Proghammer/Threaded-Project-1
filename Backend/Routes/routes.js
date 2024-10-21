import { Router } from "express";
import { getAllAgenciesAndAgents } from "../db-helper/contact.js";
import { body, validationResult } from "express-validator";
const router = Router();



router.get("/", (req, res) => {
  res.sendFile("index.html", options);
});

router.get("/register", (req, res) => {
  res.sendFile("register.html", options);
});

router.get("/contact", (req, res) => {
  res.sendFile("contact.html", options);
});

router.get("/api/agencies", async (req, res) => {
  const sql = "select * from agencies";
  const result = await getAllAgenciesAndAgents();
  res.setHeader("content-type", "application/json");

  if (res.statusCode == 200) {
    console.log(result);
    res.json(result);
  } else {
    console.log(res.status);
  }
});

router.post(
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

export default router;
