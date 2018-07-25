const express = require('express')
const app = express();
const config = require('./config/config');
const log = require('color-logs')(true, true, __filename);

app.listen(config.env.port, '0.0.0.0', () => {
    log.info(`Server started on ${config.env.port}`);
});

