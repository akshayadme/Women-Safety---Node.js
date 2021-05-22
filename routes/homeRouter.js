const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

router.get('/',(req, res) => {
        res.render('home');
});

module.exports = router;
