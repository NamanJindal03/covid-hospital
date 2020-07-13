const express = require('express');
const router = express.Router();
const {register, createReport} = require('../controllers/patient_controller');
router.post('/register', register);
router.post('/:id/create-report', createReport);
module.exports = router;