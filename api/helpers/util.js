const jwt = require('jsonwebtoken');
const fs = require('fs');
const log = require('color-logs')(true, true, 'Item');
const Util = {};
const moment = require('moment');

const cert = fs.readFileSync('./keys/server.key');

Util.signToken = (username) => {
    const token = jwt.sign({ username }, cert, { algorithm: 'RS256' });

    return token;
};

Util.signUserToken = (user) => {
    const exp = moment().add(2, 'hours').unix();
    const token = jwt.sign({ username: user.username, role: user.role_id, exp }, cert, { algorithm: 'HS256' });

    return token;
};

Util.decodeToken = (token) => {
    let authorize = false;
    jwt.verify(token, cert, (err, result) => {
        if (err) {
            log.info(err);
            authorize = false;
        } else {
            log.info(result);
            authorize = true;
        }
    });
    return authorize;
};

module.exports = Util;