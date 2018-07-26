const express = require('express')
const app = express();
const config = require('./config/config');
const log = require('color-logs')(true, true, __filename);
const Conn = require('./service/connection');

this.dbConn = Conn;

app.listen(config.env.port, '0.0.0.0', () => {
    log.info(`Server started on ${config.env.port}`);
});


// Retrieve all todos 
app.get('/useraccount', function (req, res) {
    Conn.query('SELECT * FROM useraccount', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Todos list.' });
    });
});