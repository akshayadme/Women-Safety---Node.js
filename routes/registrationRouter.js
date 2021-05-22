const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const Users = require('../models/userModel');

router.use(bodyParser.json());

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) =>{
    return jwt.sign({id}, 
        config.secretKey,
        {expiresIn:maxAge});
} 

router.post('/signup', async (req,res)=>{
        try {
            const findUser = await Users.findOne({'email':req.body.email});
            if(findUser){
                res.status(401).render("login",{
                    err:'User Already Exist',
                    success:'',
                    loginUser:''
                    });
            } else {
                var password = req.body.password;
                var encPassword = await bcrypt.hash(password,10);
                
                const registerUser = new Users({
                    fname: req.body.fname,
                    lname:req.body.lname,
                    email:req.body.email,
                    password:encPassword,
                    mobileNo:req.body.mobileNo,
                    address:req.body.address,
                    state:req.body.state,
                    city:req.body.city,
                    pincode:req.body.pincode  
                });
                const user = await registerUser.save();
                const token = createToken(user._id);
                res.cookie('jwt',token,{ httpOnly:true, maxAge: maxAge * 1000 });
                res.status(201).redirect('/home');
            }
        } catch (error) {
            res.status(401).send(error);
        }
})

router.post('/login', async (req,res)=>{
    try {
        const findUser = await Users.findOne({email:req.body.email});
        if(findUser){
            const decPassword = await bcrypt.compare(req.body.password,findUser.password);
            if(decPassword){
                const token = createToken(findUser._id);
                res.cookie('jwt',token,{ httpOnly:true, maxAge: maxAge * 1000 });
                res.status(200).redirect('/home');
            } else{
                res.status(404).render('login');
            }
        } 
    } catch (error) {
        res.status(401).send(error);
    }
    
})

router.get('/logout', function(req, res, next) {
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');

});

router.get('/signup', function(req, res) {
    res.render('login');
  });
  
module.exports = router;
