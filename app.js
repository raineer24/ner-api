const express = require('express')
const app = express();
const config = require('./config/config');
const log = require('color-logs')(true, true, __filename);
const Conn = require('./service/connection');
const bodyParser = require('body-parser');
this.dbConn = Conn;

app.listen(config.env.port, '0.0.0.0', () => {
    log.info(`Server started on ${config.env.port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Retrieve all todos 
app.get('/useraccount', function (req, res) {
    Conn.query('SELECT * FROM useraccount', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Users list.' });
    });
});

//rest api to get a single employee data
app.get('/useraccount/:id', function (req, res) {
    Conn.query('select * from useraccount where id=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to create a new record into mysql database
app.post('/useraccount', function (req, res) {
    var postData = req.body;
    Conn.query('INSERT INTO useraccount SET ?', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});
//rest api to update record into mysql database
app.put('/useraccount', function (req, res) {
    Conn.query('UPDATE `useraccount` SET `username`=?,`password`=?,`email`=? where `id`=?', [req.body.username, req.body.password, req.body.email, req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to delete record from mysql database
app.delete('/useraccount', function (req, res) {
    console.log(req.body);
    Conn.query('DELETE FROM `useraccount` WHERE `id`=?', [req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
    });
});