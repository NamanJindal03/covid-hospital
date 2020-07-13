const express = require('express');
const router = express.Router();
const {register, createReport, allReports} = require('../controllers/patient_controller');
router.post('/register', register);
router.post('/:id/create-report', createReport);
router.get('/:id/all-reports', allReports);
module.exports = router;