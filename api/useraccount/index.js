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

useraccount.getAllUsers = (req, res) => {
    const instUseraccount = new Useraccount({});
    instUseraccount.findAll(query.validateParam(req.swagger.params, 'skip', 0), query.validateParam(req.swagger.params, 'limit', 10), {
        // useraccountId: query.validateParam(req.swagger.params, 'useraccountId', 0),
    })
        .then((result) => {
            new Log({ message: 'Successfully retrieve all users', action: 'USER_LIST', type: 'INFO' }).create();
            return res.json(result);
        })
        .catch((err) => {
            new Log({ message: `${err}`, action: 'USER_LIST', type: 'ERROR' }).create();
            return res.status(err === 'Not Found' ? 404 : 500).json({ message: err === 'Not Found' ? 'Not Found' : 'Failed' });
        })
        .finally(() => {
            instUseraccount.release();
        });
};

module.exports = useraccount;