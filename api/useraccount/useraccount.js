const BluePromise = require('bluebird');
const sql = require('sql');
const config = require('../../config/config');

const Conn = require('../../service/connection');
const log = require('color-logs')(true, true, 'User Account');

let that;

function Useraccount(useraccount) {
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

    that = this;
}

Useraccount.prototype.testConnection = () => new BluePromise((resolve, reject) => {
    if (that.dbConn) {
        resolve(that.dbConn);
        return;
    }
    reject('Not Found');
});



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