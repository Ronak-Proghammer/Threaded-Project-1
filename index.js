const express = require('express');
const db = require('./Backend/utils/db-connection');
const path = require('path');
const { body, validationResult } = require('express-validator');

const app = express();
const options = { 'root': path.join(__dirname, 'Frontend') };

app.use(express.static(path.join(__dirname, 'Frontend')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});

app.get('/', (req, res) => {
    res.sendFile("index.html", options);
});

app.get('/register', (req, res) => {
    res.sendFile("register.html", options);
});

app.post('/api/addcustomer',
    body('CustFirstName').notEmpty().withMessage('First name is required').isAlpha().withMessage('First name must contain only letters'),
    body('CustLastName').notEmpty().withMessage('Last name is required').isAlpha().withMessage('Last name must contain only letters'),
    body('CustAddress').notEmpty().withMessage('Address is required').isLength({ min: 5 }).withMessage('Address must be at least 5 characters'),
    body('CustCity').notEmpty().withMessage('City is required').isAlpha().withMessage('City must contain only letters'),
    body('CustProv').notEmpty().withMessage('Province is required'),
    body('CustPostal').notEmpty().withMessage('Postal Code is required').isPostalCode('any').withMessage('Invalid Postal Code'),
    body('CustCountry').notEmpty().withMessage('Country is required'),
    body('CustHomePhone').notEmpty().withMessage('Phone number is required').isMobilePhone().withMessage('Invalid phone number'),
    body('CustBusPhone').notEmpty().withMessage('Alternate phone number is required').isMobilePhone().withMessage('Invalid alternate phone number'),
    body('CustEmail').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address')
    , (req, res) => {
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
            CustEmail
        } = req.body;
        const sql = `INSERT INTO customers (CustFirstName, CustLastName, CustAddress, CustCity, CustProv, CustPostal, CustCountry, CustHomePhone, CustBusPhone, CustEmail)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            // Insert the validated data into the database
            db.query(sql,
                [CustFirstName, CustLastName, CustAddress, CustCity, CustProv, CustPostal, 
                    CustCountry, CustHomePhone, CustBusPhone, CustEmail], (err, result) => {
                    if (err) {
                        console.error("Database Error: ", err);
                        return res.status(500).send("An error occurred while processing your request.");
                    } else {
                        res.status(201).json({ message: 'Customer registered successfully', CustomerId: result.insertId });
                    }
                }
            );

    });

app.get('/contact', (req, res) => {
    res.sendFile("contact.html", options);
});


app.get('/api/packages', (req, res) => {
    const sql = 'select * from packages';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.setHeader('content-type', 'application/json');

        if (res.statusCode == 200) {
            res.json(result);
        } else {
            console.log(res.status)
        }
    });
});

app.get('/api/agencies', (req, res) => {
    const sql = 'select * from agencies';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.setHeader('content-type', 'application/json');

        if (res.statusCode == 200) {
            res.json(result);
        } else {
            console.log(res.status)
        }
    });
});

app.get('/api/agents', (req, res) => {
    try {
        const sql = 'select * from agents';
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.setHeader('content-type', 'application/json');
            if (res.statusCode == 200) {
                res.json(result);
            }
        })
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

