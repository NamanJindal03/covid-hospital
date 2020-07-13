const express = require('express');
const router = express.Router();
const {reportsWithStatus} = require("../controllers/report_controller");
router.get('/:status', reportsWithStatus);
module.exports = router;