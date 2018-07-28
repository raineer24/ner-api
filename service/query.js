const query = {};
const sql = require('sql');
const log = require('color-logs')(true, true, '');

query.validateParam = (reqParams, name, defaultValue) => {
    return Object.prototype.hasOwnProperty.call(reqParams, name) &&
    reqParams[name].value ? reqParams[name].value : defaultValue;
};

module.exports = query;