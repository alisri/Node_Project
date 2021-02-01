const autoBind = require('auto-bind');
const { validationResult } = require('express-validator/check');

class controller {
    constructor()
    {
        autoBind(this);
    }

    async validationData(req)
    {
        const result = validationResult(req);
        if(! result.isEmpty())
        {
            const errors = result.array();
            const messages = [];
            errors.forEach(error=> messages.push(error.msg));
            req.flash('errors', messages)
            return false;
        }
        return true;
    }
}
module.exports = controller;