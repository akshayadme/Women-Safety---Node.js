const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = Schema({
    username:{
        type:String
    },
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    },
    userid:{
        type:String
    },
    useremail:{
        type:String
    }

});

var Location = mongoose.model('location',locationSchema);
module.exports = Location;