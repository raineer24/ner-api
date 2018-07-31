const BluePromise = require('bluebird');
const sql = require('sql');
const config = require('../../config/config');
const _ = require('lodash');

const Conn = require('../../service/connection');
const log = require('color-logs')(true, true, 'User Account');

let that;

function Useraccount(useraccount) {
    sql.setDialect('mysql');

    this.model = _.extend(useraccount, {
        dateCreated: new Date().getTime(),
        dateUpdated: new Date().getTime(),
    });
    log.info(this.model);
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

    that = this;
}

Useraccount.prototype.testConnection = () => new BluePromise((resolve, reject) => {
    if (that.dbConn) {
        resolve(that.dbConn);
        return;
    }
    reject('Not Found');
});

/**
  * Save User account
  * @param {string} username
  * @param {string} password
  * @param {string} email
  * @param {string} uiid
  * @return {object}
*/
Useraccount.prototype.create = () => new BluePromise((resolve, reject) => {
   that.getByValue(that.model.username, 'username')
    .then((results) => {
        if (results.length === 0) {
            const query = that.sqltable.insert(that.model).toQuery();
            that.dbConn.queryAsync(query.text, query.values)
             .then((response) => {
               that.getById(response.insertId)
                .then((resultList) => {
                    resolve(resultList[0]);
                })
                .catch((err) => {
                    reject(err);
                });
             })
            .catch((err) => {
                reject(err);
            });
        } else {
            reject('Found');
        }
    })
    .catch((err) => {
        reject(err);
    });
});



/**
  * Format response object and/or append additional object properties
  * @param {object} object
  * @param {object} properties
  * @return {object}
*/
Useraccount.prototype.cleanResponse = (object, properties) => {
    // eslint-disable-next-line
    delete object.password;
    _.merge(object, properties);

    return object;
};


/**
  * Get by value
  * @param {any} value
  * @param {string} field
  * @return {object<Promise>}
*/
Useraccount.prototype.getByValue = (value, field) => {
   
    const query = that.sqltable
        .select(that.sqltable.star())
        .from(that.sqltable)
        .where(that.sqltable[field].equals(value)).toQuery();
        return that.dbConn.queryAsync(query.text, query.values);
   
};

/**
  * Get userAccount by id
  * @param {integer} id
  * @return {object<Promise>}
*/
// User.prototype.getById = id => that.dbConn.readAsync(id);
Useraccount.prototype.findById = id => that.getByValue(id, 'id');
Useraccount.prototype.getById = id => that.getByValue(id, 'id');

Useraccount.prototype.findAll = (skip, limit, filters) => {
    let query = null;
    if (filters.username && filters.password) {
        query = that.sqlTable
            .select(that.sqlTable.star())
            .from(that.sqlTable)
            .where(that.sqlTable.username.equals(filters.username)
                .and(that.sqlTable.password.equals(filters.password)))
            .limit(limit)
            .offset(skip)
            .toQuery();
    } else if (filters.username && filters.uiid) {
        query = that.sqlTable
            .select(that.sqlTable.star())
            .from(that.sqlTable)
            .where(that.sqlTable.username.equals(filters.username)
                .and(that.sqlTable.uiid.equals(filters.uiid)))
            .limit(limit)
            .offset(skip)
            .toQuery();
    } else {
        query = that.sqltable.select(that.sqltable.star()).from(that.sqltable).toQuery();
    }
    log.info(query.text);

    return that.dbConn.queryAsync(query.text, query.values);
};

/**
  * Release connection
  * @param {any} value
  * @param {string} field
  * @return {object<Promise>}
*/
Useraccount.prototype.release = () => that.dbConn.releaseConnectionAsync();
module.exports = Useraccount;