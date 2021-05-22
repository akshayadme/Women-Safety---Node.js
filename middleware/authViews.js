const jwt = require('jsonwebtoken');
const config =require('../config');
const Users = require('../models/userModel');

const checkRoutes = (req,res,next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,config.secretKey,(err,decodedToken)=>{
            if(err){
             res.redirect('/register/signup');
            }else{
                next();
            }
        });
    }else{  
     res.redirect('/register/signup');
    }
}

const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    
    if(token){
        
        jwt.verify(token,config.secretKey,async (err,decodedToken)=>{
            if(err){
                res.locals.user = null; 
                next();
            }else{
                let user = await Users.findById(decodedToken.id);
                res.locals.user = user; 
                next();
            }
        });
    } else {  
        res.locals.user = null; 
        next();
    }
}
module.exports = { checkRoutes, checkUser }; 