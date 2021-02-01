const User = require('app/models/users');
const validator = require('./validator');


class rememberLogin extends validator{
    handle(req, res, next)
    {
        if(! req.isAuthenticated()) 
        {
            const rememberToken = req.signedCookies.remember_token;
            if(rememberToken)
                {
                    return this.userFind(rememberToken, req, next);
                }
        }
        next();
    }

    userFind(rememberToken, req, next)
    {
        User.findOne({rememberToken})
            .then(user=> {
                if(user){
                    req.logIn(user, err=> {
                        if(err) next(err);
                        next();
                    })
                }
                next();
            }) .catch(err => next(err));
    }
}
module.exports = new rememberLogin();