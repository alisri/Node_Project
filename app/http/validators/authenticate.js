const validator = require('./validator');

class authenticate extends validator{
    handle(req, res, next)
    {
        if(!req.isAuthenticated())
            return next();
        return res.redirect('/home');
    }

    handl2(req, res, next)
    {
        if(req.isAuthenticated())
            return next();
        return res.redirect('/');
    }
}

module.exports = new authenticate();
