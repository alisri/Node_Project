const controller = require('app/http/controller');

class userPanel extends controller
{
    index(req, res) 
    {

        res.render('userPanel', {title: 'پروفایل کاربری'});
    }
}


module.exports = new userPanel();