const express = require('express')
const router = express.Router()
const userSchema = require('../models/User')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const { check } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/createUser',
    //Non-custom error messages
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }).withMessage({
        message: 'Minimum length for password should be 5'
    }),
    //Custom error messages
    check('email').isEmail().withMessage({
        message: 'Not an email',
        errorCode: 1,
    }),
    //taking request and sending response
    async (req, res)=> {
    //checking all errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
    }

    let success = false;

    //Try block for any unforseen error
    try{
    //checking if user with same email already exists
    let user = await userSchema.findOne({email: req.body.email})

    //If user exists then throws error
    if(user){
        return res.status(400).json({message: "Sorry a user with this email id already exists!"})
    }
    
    //Hash password before storing
    var salt = await bcrypt.genSaltSync(10)
    var secretPass = await bcrypt.hashSync(req.body.password, salt)

    //Else create a new user
    user = await userSchema.create({
        name: req.body.name,
        email: req.body.email,
        password: secretPass, //Store hash password in database
      })

    const data = {
        user:{
            id: user.id
        }
    }
    var authToken = jwt.sign(data, 'MyiNotebook')
    success = true
    res.json({success, authToken})
    } 
    //Catch for any unforseen error
    catch(error){
        success = false;
        return res.status(500).send({success, message: "Internal server occured here!"})
    }
})

//Now check if user has logged in with correct email and password
router.post('/login', 
    //Non-custom error messages
    body('password', 'Password cannot be empty').exists(),
    //Custom error messages
    check('email').isEmail().withMessage({
        message: 'Not an email',
        errorCode: 1,
    }),
    //taking request and sending response
    async (req, res)=> {
    //checking all errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
    }
    let success = false;
    try {
        //Get the user from database with email entered
        let user = await userSchema.findOne({email: req.body.email})

        //If user does not exist in database throw error
        if(!user){
            return res.status(400).json('Please enter correct credentials!');
        } 

        //If user exists, check the password entered with password in database for the user
        let password = await bcrypt.compare(req.body.password, user.password)

        //If password is incorrect
        if(!password){
            return res.status(400).json('Please enter correct credentials!');
        }

        //If password is correct, send the authToken back
        const data = {
            user:{
                id: user.id
            }
        }
        var authToken = jwt.sign(data, 'MyiNotebook')
        success = true;
        res.json({success, authToken})

    }  catch(error){
        success = false;
        return res.status(500).send({success, message: "Internal server occured!"})
    }

})

//Now when user is authenticated, fetch user details
router.post('/getuser', fetchuser, async(req, res)=>{
    let success =false;
    try {
        let userId = req.user.id;
        let userData = await userSchema.findById(userId).select("-password");
        success = true;
        res.json(userData)
    } catch(error){
        success = false;
        return res.status(500).send("Internal server occured!")
    }
})
module.exports = router