const express = require('express')
const app = express();
const config = require('./config/config');
const log = require('color-logs')(true, true, __filename);
const Conn = require('./service/connection');
const bodyParser = require('body-parser');
const sql = require('sql');


app.listen(config.env.port, '0.0.0.0', () => {
    log.info(`Server started on ${config.env.port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

sql.setDialect('mysql');
this.table = 'useraccount';
this.dbConn = Conn;
this.sqltable = sql.define({
    name: this.table,
    columns: [
        'id',
        'username',
        'password',
        'email',
        'firstName',
        'lastName',
        'uiid',
        'gender',
        'mobileNumber',
        'birthdate',
        'deactivated',
        'forcedReset',
        'dateCreated',
        'dateUpdated',
    ]

    
});


const query = this.sqltable.select(this.sqltable.star()).from(this.sqltable).toQuery();
    


// Retrieve all todos 
app.get('/useraccount', function (req, res) {
    this.dbConn = Conn;
    this.dbConn.queryAsync(query.text, query.values, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Users list.' });
    });
});

