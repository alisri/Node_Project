const controller = require('app/http/controller');
const passport = require('passport');

class loginController extends controller {
    showLoginForm(req, res)
    {
        const title = 'ورود به سامانه';
        const errors = req.flash('errors');
        res.render('auth/login', {errors, title});
    }

    async loginProcess(req, res, next)
    {
        const result = await this.validationData(req);
            if(result)
                this.login(req, res, next);
            else
                res.redirect('/');
    }
    
    login(req, res, next) {
        passport.authenticate('local.login', (err,user)=>{
            if(!user) return res.redirect('/');

            req.logIn(user, err=>{
                if(req.body.remember) {
                    user.setRememberToken(res);
                }
                return res.redirect('/home');
            })
        })(req,res,next);
}
}
module.exports = new loginController();