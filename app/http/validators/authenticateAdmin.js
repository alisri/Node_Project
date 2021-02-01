const validator = require('./validator');

class authenticate extends validator{
    handle(req, res, next)
    {
        if(req.isAuthenticated() && req.user.admin)
            return next();
        return res.redirect('/');
    }
}

module.exports = new authenticate();
