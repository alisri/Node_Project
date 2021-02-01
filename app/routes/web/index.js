const express = require('express');
const router = express.Router();

const admin = require('./admin');
const auth = require('app/http/validators/authenticateAdmin');
router.use('/admin', auth.handle, admin);



const home = require('./home');
const authUsers = require('app/http/validators/authenticate');
router.use('/', home);

module.exports = router;