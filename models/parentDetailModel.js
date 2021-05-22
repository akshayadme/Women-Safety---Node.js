const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parentSchema = Schema({
    parentName1:{
        type:String
    },
    parentName2:{
        type:String
    },
    parentMob1:{
        type:Number
    },
    parentMob2:{
        type:Number
    },
    parentEmail:{
        type:String
    },
    userJWT:{
        type:String
    }
});

var ParentDetail = mongoose.model('parentdetails',parentSchema);
module.exports = ParentDetail;