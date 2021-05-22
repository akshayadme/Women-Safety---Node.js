const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();
const Booking = require('../models/bookingModel');

router.use(bodyParser.json());

router.get('/', function(req, res) {
    res.render('bookTaxi',{
        success:''
    });
  });
 
router.post('/', async(req,res)=>{
    try {
        const user = res.locals.user;
        const booking = new Booking({
            pickupLocation: req.body.currLoc,
            destination:req.body.destination,
            cabType: req.body.cabtype,
            userid:user.id,
            useremail:user.email
        });
        const bookCab = await booking.save();
        console.log(Date.now());
        res.status(200).render('bookTaxi',{
            success:'Cab Booking Successful'
        })
        
    } catch (error) {
        res.status(400).send(error);
    }
}); 
router.route('/')
    .get((req, res) => {
        Booking.findOne({})
            .then((booking) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(booking);
            })
    })
    .post((req, res, next) => {
        Booking.findOne({})
            .then((booking) => {
                if (parent != null) {
                    res.statusCode = 404;
                    res.end('Data Already Exist! Please Delete the data to enter new data');
                } else {
                    ParentDetail.create(req.body)
                        .then((parent) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(booking);
                        }, (err) => next(err))
                        .catch((err) => next(err));
                }
            }, (err) => next(err))
            .catch((err) => next(err));

        if (req.body.driver) booking.driver = req.body.driver;

        Booking.save(function (err, data) {
            if (err) {
                throw err;
            } else {
                console.log('New Booking Added Successfully');
                res.end();
            }
        });
    });
module.exports = router;  
