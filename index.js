const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./Backend/swagger');
const db = require('./Backend/utils/db-connection');
const path = require('path');

const app = express();
const options = {'root': path.join(__dirname, 'Frontend')};

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(express.static(path.join(__dirname, 'Frontend')));

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

