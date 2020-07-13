const Doctor = require('../models/doctor');
const {check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const expressJwt  = require('express-jwt');

//to access environment variables
require('dotenv').config();

//registers a new doctor
module.exports.register = (req, res) =>{
    
    //brings out all the error if any 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({

            error: errors.array()[0].msg,
            params: errors.array()[0].param
        })
    }

    //it is compulsory to put return else it will execute other command as well
    if(req.body.password != req.body.confirm_password){
        //return res.redirect('back');
        return res.status(404).json({  message: "pass do not match"});
    }

    //tries to find if doctor already exist
    Doctor.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log(err);
            return res.status(404).json({ status: 404, message: "There is an error in finding user in db"});
        }
        //if doctor doesnt exist creates a new doctor
        if(!user){
            Doctor.create(req.body, function(err,user){
                if(err){
                    console.log(err);
                    return res.status(400).json({  message: "error in creating user"});
                }
                return res.status(200).json({  message: "doctor succesfully registered"});
            })
        }
        //else it returns that you are already registered
        else{
            return res.status(404).json({ message: "doctor already registered"});
        }

    })
}

//sign in the doctor
module.exports.login = (req,res) =>{
    const {email, password} = req.body;
    Doctor.findOne({email}, function(err, user){
        if(err){
            return res.status(400).json({error: "User doesnt exist"})
        }
        //if the doctor doesnt exist or the password dont match return error
        if(!user || user.password!=password){
            return res.status(400).json({error: "Invalid Username/Password"})
        }

        //if doctor exist we 
        //create token
        //default encryption algogrithm = HMAC SHA 256
        const token = jwt.sign({ _id: user._id}, process.env.JWTSECRET, {algorithm: 'HS256'});
        //put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999});
        
        //sending response to frontend
        return res.json({token});
    })
}

module.exports.logout = (req,res) => {
    res.clearCookie("token");
    return res.json({message:"doctor signout succesfully"})
}

//check whether a valid token is present or not and hence help in authentication of the user
module.exports.isSignedIn = expressJwt({
    secret: process.env.JWTSECRET,
    algorithms: ['HS256'],

    //this user property appends auth to our req.user and if we log it then we get _id & iat
    //_id is the one stored in the database 
    userProperty: "auth"
    
});
