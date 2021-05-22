var mongoose = require('mongoose');
var BookingSchema = mongoose.Schema({
    userid:String,
    cabType: String,
    pickupLocation: String,
    destination: String,
    useremail:String,
    date: {
        type:String,
        default:Date.now()
    }
});

module.exports = mongoose.model('booking', BookingSchema);