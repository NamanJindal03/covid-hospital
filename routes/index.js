const express = require('express');
const router = express.Router();
const {isSignedIn} = require('../controllers/doctor_auth_controller');

router.use('/doctors', require('./doctor_auth'));
router.use('/patients', isSignedIn, require('./patient'));
router.use('/reports', isSignedIn, require('./report'));

module.exports = router;