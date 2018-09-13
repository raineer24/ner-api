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
    this.table = 'useraccount';
    this.dbConn = Conn;
    this.sqltable = sql.define({
        name: 'useraccount',
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
            'role_id',
            'lastLogin',
            'dateCreated',
            'dateUpdated',
        ]


    });
    this.sqlTableRole = sql.define({
        name: 'role',
        columns: [
            'id',
            'name',
            'dateCreated',
            'dateUpdated',
        ],
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
  * User authentication of username and password
  * @param {string} username
  * @param {string} password
  * @return {object}
*/
Useraccount.prototype.authenticate = () => new BluePromise((resolve, reject) => {
    const filter = {
        username: that.model.username,
    };
    
    if (that.model.password) {
        filter.password = that.model.password;
    } else if (that.model.uiid) {
        filter.uiid = that.model.uiid;
    }
    
    that.findAll(0, 1, filter)
     .then((results) => {
        if (results.length === 0) {
            reject('Not Found');
            return;
         
        }
        resolve(results[0]);
     })
    .catch((err) => {
        reject(err);
    });
    
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
  * Get by value
  * @param {any} value
  * @param {string} field
  * @return {object<Promise>}
*/
Useraccount.prototype.getRoles = () => {
    const strSql = 'SELECT * FROM role ORDER BY name;';

    return that.dbConn.queryAsync(strSql);
};



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
        query = that.sqltable
          .select(that.sqltable.star())
          .from(that.sqltable)
          .where(that.sqltable.username.equals(filters.username)
            .and(that.sqltable.password.equals(filters.password)))
          .limit(limit)
          .offset(skip)
          .toQuery();
    } else if (filters.username && filters.uiid) {
        query = that.sqltable
            .select(that.sqltable.star())
            .from(that.sqltable)
            .where(that.sqltable.username.equals(filters.username)
                .and(that.sqltable.uiid.equals(filters.uiid)))
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