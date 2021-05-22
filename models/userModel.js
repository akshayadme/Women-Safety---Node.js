const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    },
    mobileNo:{
        type:Number,
        required:true
    },
    address:{
        required:true,
        type:String
    },
    city:{
        type:String,
        required:true

    },
    state:{
        type:String,
        required:true

    },
    pincode:{
        type:Number,
        required:true
    }
});

var Users = mongoose.model('Users',userSchema);
module.exports = Users;