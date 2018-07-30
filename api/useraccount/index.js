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

module.exports = useraccount;