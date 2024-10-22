import { Router } from "express";
import { getAllAgenciesAndAgents } from "../db-helper/contact.js";
import { body, validationResult } from "express-validator";
import con from "../utils/db-connection.js";
import {options} from "../../index.js";
import userRouter from "./login.js";
const router = Router();

router.get("/", (req, res) => {
  res.sendFile("index.html", options);
});

// Loading Registration Page
router.get("/register", (req, res) => {
  res.sendFile("register.html", options);
});

//Loading Contact Us Page
router.get("/contact", (req, res) => {
  res.sendFile("contact.html", options);
});

//Get api for the Packages
router.get('/api/packages', async (req, res) => {
  const sql = 'SELECT * FROM packages';
  try {
    const [result] = await con.query(sql);
    res.setHeader('content-type', 'application/json');
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching packages');
  }
});

router.use("/user", userRouter);


router.get("/api/agencies", async (req, res) => {
  const result = await getAllAgenciesAndAgents();
  res.setHeader("content-type", "application/json");
  if (res.statusCode == 200) {
    console.log(result);
    res.json(result);
  } else {
    console.log(res.status);
  }
});

/**
 * post api for customer registration/add customer
 */
router.post(
  "/api/addcustomer",
  body("CustFirstName")
    .notEmpty()
    .withMessage("First name is required")
    .matches(/^[A-Za-z\s]+$/)  
    .withMessage("First name must contain only letters and spaces"),
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
  .matches(/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/)
  .withMessage("Invalid Postal Code"),
  body("CustCountry").notEmpty().withMessage("Country is required"),
  body("CustHomePhone")
    .notEmpty()
    .isLength({ max: 10 })
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),
  body("CustBusPhone")
    .notEmpty()
    .isLength({ max: 10 })
    .withMessage("Alternate phone number is required")
    .isMobilePhone()
    .withMessage("Invalid alternate phone number"),
  body("CustEmail")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  async (req, res) => {
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

    try {
      const [result] = await con.query(sql, [
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
      ]);
      res.status(201).json({
        message: "Customer registered successfully",
        CustomerId: result.insertId,
      });
    } catch (err) {
      console.error("Database Error: ", err);
      res.status(500).send("An error occurred while processing your request.");
    }
  }
);

/**
 * post api for booking
 */
router.post('/api/bookings', async (req, res) => {
  try {
    const { bookingDate, bookingNo, travelerCount, customerId, tripTypeId, packageId } = req.body;

    const sql = `INSERT INTO bookings (BookingDate, BookingNo, TravelerCount, CustomerId, TripTypeId, PackageId)
                  VALUES (?, ?, ?, ?, ?, ?)`;

    const [result] = await con.execute(sql, [bookingDate, bookingNo, travelerCount, customerId, tripTypeId, packageId]);

    if (result.affectedRows > 0) {
      console.log('Query successful, Booking No:', bookingNo);
      return res.json({ message: 'Booking successfully created with Booking No: ' + bookingNo });
    } else {
      return res.status(500).json({ message: 'Booking  failed' });
    }
  } catch (err) {
    console.error('Error booking:', err);
    return res.status(500).json({ message: 'Error booking', error: err.message });
  }
});

export default router;
