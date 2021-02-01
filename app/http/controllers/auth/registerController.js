const controller = require('app/http/controller');
const passport = require('passport');

class registerController extends controller {
    showRegisterForm(req, res)
    {
        const title = 'عضویت در سامانه';
        const errors = req.flash('errors');
        res.render('auth/register', {errors, title});
    }

    async registerProcess(req, res, next)
    {
        const result = await this.validationData(req);
            if(result)
                this.register(req, res, next);
            else
                res.redirect('/home');
    }

    register(req, res, next) {
            passport.authenticate('local.register' , { 
            successRedirect : '/home',
            failureRedirect : '/register',
            failureFlash : true
        })(req, res, next);
    }
}
module.exports = new registerController();