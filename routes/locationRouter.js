const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const router = express.Router();
const Location = require('../models/locationModel');
const ParentDetail = require('../models/parentDetailModel');

require('dotenv').config();

router.use(bodyParser.json());

router.post('/', async (req, res) => {
    try {
        const user = res.locals.user;
        // console.log(user);
        const lat = req.body.latitude;
        const lon = req.body.longitude;
        const insertLocation = new Location({
            latitude: lat,
            longitude: lon,
            username: user.fname,
            userid: user.id,
            useremail: user.email
        });
        const saveLocation = await insertLocation.save();

        const findParent = await ParentDetail.findOne({ userJWT: user.id });
        // console.log(findParent);
       
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD 
            }
        });

        let mailOptions = {
            from: 'asshyadme@gmail.com',
            to: findParent.parentEmail,
            subject: 'Your Daughter\'s current location',
            text: `Current location of ${user.fname} ${user.lname} is Latitude ${lat} and Longitude ${lon}`
        };

        const sendMail = await transporter.sendMail(mailOptions);
        // console.log(sendMail);
        if (sendMail) {
            console.log('Mail Sent')
            res.status(200).redirect('/home');
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
