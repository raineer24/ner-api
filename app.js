const express = require('express')
const app = express();
const config = require('./config/config');
const log = require('color-logs')(true, true, __filename);
const Conn = require('./service/connection');
const bodyParser = require('body-parser');
const sql = require('sql');


const SwaggerParser = require('swagger-parser');
const SwaggerExpress = require('swagger-express-mw');
const SwaggerUi = require('swagger-tools/middleware/swagger-ui');

// Validate swagger definition
SwaggerParser.validate(config.swaggerFile)
    .then((result) => {
        log.info('Validation OK', result.info);
    })
    .catch((err) => {
        log.info('Swagger Error:', err);
    });

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
//rest api to get a single employee data
app.get('/useraccount/:id', function (req, res) {
    Conn.query('select * from useraccount where id=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});
