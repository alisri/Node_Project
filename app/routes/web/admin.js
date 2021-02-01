const express = require('express');
const router = express.Router();

const Admin = require('app/http/controllers/admin/adminController');
const homeValidator = require('app/http/validators/homeValidator');

router.get('/', Admin.index);
router.get('/list', Admin.list);
router.get('/members', Admin.members);
router.get('/members/:id', Admin.view);
router.get('/members/m/:id', Admin.members2);
router.get('/list/checked', Admin.checked);
router.get('/reports', Admin.reports);
router.post('/members/m/:id',homeValidator.handle2(), Admin.reply);
router.get('/importUsers',  Admin.importUsers);
router.post('/importUsers',  Admin.importUsersPost);



module.exports = router;