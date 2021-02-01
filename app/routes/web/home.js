const express = require('express');
const router = express.Router();

//home controllers
const homeController = require('app/http/controllers/homeController');
const userPanel = require('app/http/controllers/userPanel');
const loginController = require('app/http/controllers/auth/loginController');
const registerController = require('app/http/controllers/auth/registerController');
const loginValidator = require('app/http/validators/loginValidator');
const homeValidator = require('app/http/validators/homeValidator');
const auth = require('app/http/validators/authenticate');

//if the user is not loggined
router.get('/',  auth.handle,  loginController.showLoginForm);
router.post('/', auth.handle,  loginValidator.handle(), loginController.loginProcess);
router.get('/register', auth.handle, registerController.showRegisterForm);
router.post('/register', auth.handle, loginValidator.handle2(), registerController.registerProcess);
router.get('/report', homeController.showReportForm);
router.post('/report', loginValidator.handleReport(), homeController.report);

//when the user is loggined
router.get('/home', auth.handl2, homeController.main);
router.get('/home/new',auth.handl2, homeController.index1);
router.post('/home/new',auth.handl2, homeValidator.handle(), homeController.store);
router.get('/home/list', auth.handl2, homeController.index);
router.get('/home/list/:id',auth.handl2, homeController.index2);
router.get('/user-panel',auth.handl2, userPanel.index);
router.get('/logout', (req, res)=>{
    req.logout();
    res.clearCookie('remember_token');
    res.redirect('/');
});
router.get('*',homeController.error404);

module.exports = router;