const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const db = require('./utils/db-connection')

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))


db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/', (req, res) => {
    res.status(201).json("Home GET req");
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

