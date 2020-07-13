const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {register ,  login, logout, isSignedIn} = require('../controllers/doctor_auth_controller');


//basic error handling before we hit the database usiniig express-valdator
router.post('/register',[
    check('password').isLength({ min: 5 }).withMessage('password must be at least 5 chars long'),
    check('email').isEmail().withMessage('email must be valid')
], register);

router.post('/login', login);
router.get('/logout', logout);
router.get("/testroute",isSignedIn, (req,res) =>{
    //res.send("a protected route");
    res.json(req.auth);
} );

module.exports = router;