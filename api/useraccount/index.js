const query = require('../../service/query');

const Useraccount = require('./useraccount');
const log = require('color-logs')(true, true, 'User Account');

const useraccount = {};

useraccount.connectDb = (req, res) => {
    const instUseraccount = new Useraccount({});
    instUseraccount.testConnection()
        .then(result => res.json({ message: result }))
        .catch(() => res.status(404).json({
            message: 'Not Found',
        }));
};

/**
* User authentication and authorization
* @param {Object} req
* @param {Object} res
* @return {Object}
*/
useraccount.loginAccount = (req,res) => {
    const instUseraccount = new Useraccount(req.swagger.params.body.value);
    instUseraccount.authenticate()
      .then((result) => {
        return res.json(instUseraccount.cleanResponse(result, {message: 'Found'}));
      })
      .catch(() => res.status(404).json({
          message: 'Not Found',
      }))
      .finally(() => {
          instUseraccount.release();
      });
};

/**
* List
* @param {Object} req
* @param {Object} res
* @return {Object}
*/
useraccount.getAllUsers = (req, res) => {
    const instUseraccount = new Useraccount({});
    instUseraccount.findAll(query.validateParam(req.swagger.params, 'skip', 0), query.validateParam(req.swagger.params, 'limit', 10), {
        // useraccountId: query.validateParam(req.swagger.params, 'useraccountId', 0),
    })
        .then((result) => {
            //new Log({ message: 'Successfully retrieve all users', action: 'USER_LIST', type: 'INFO' }).create();
            return res.json(result);
        })
        .catch((err) => {
            //new Log({ message: `${err}`, action: 'USER_LIST', type: 'ERROR' }).create();
            return res.status(err === 'Not Found' ? 404 : 500).json({ message: err === 'Not Found' ? 'Not Found' : 'Failed' });
        })
        .finally(() => {
            instUseraccount.release();
        });
};

/**
* User registration
* @param {Object} req
* @param {Object} res
* @return {Object}
*/
useraccount.registerAccount = (req, res) => {
    //new Log({ message: 'Create new user account', action: 'USER_REGISTER', type: 'INFO' }).create();
    const instUseraccount = new Useraccount(req.swagger.params.body.value);
    instUseraccount.create()
        .then(userData => res.json(instUseraccount.cleanResponse(userData, { message: 'Saved' })))
        .catch(err => res.status(err === 'Found' ? 201 : 500).json({
            message: err === 'Found' ? 'Existing' : err,
        }))
        .finally(() => {
            instUseraccount.release();
        });
};

/**
* View user profile
* @param {Object} req
* @param {Object} res
* @return {Object}
*/
useraccount.viewAccount = (req, res) => {
    const instUseraccount = new Useraccount();
    instUseraccount.getById(query.validateParam(req.swagger.params, 'id', 0))
     .then((resultList) => {
        if (!resultList[0].id) {
            return res.status(404).json({
                message: 'Not Found'
            });
        }
        return res.json(instUseraccount.cleanResponse(resultList[0], {
            message: 'Found'
        }));
     })
     .catch(() => res.status(404).json({
        message: 'Not Found',
     }))
     .finally(() => {
         instUseraccount.release();
     });
};

/**
* Get user roles
* @param {Object} req
* @param {Object} res
* @return {Object}
*/
useraccount.getRoles = (req, res) => {
    const instUseraccount = new Useraccount();
    instUseraccount.getRoles()
        .then(result => res.json(result))
        .catch((err) => {
            //new Log({ message: `${err}`, action: 'SELLER_ACCOUNT_ROLES', type: 'ERROR' }).create();
            return res.status(500).json({ message: 'Failed' });
        })
        .finally(() => {
            instUseraccount.release();
        });
};


module.exports = useraccount;