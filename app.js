const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const nodemailer = require('nodemailer');
const authenticate = require('./authenticate');
const {
  checkRoutes,
  checkUser
} = require('./middleware/authViews');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

require('./conn');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var users = require('./routes/registrationRouter');
var aboutRouter = require('./routes/aboutRouter')
var homeRouter = require('./routes/homeRouter');
var guardianRouter = require('./routes/guardianRouter');
var guardianUpdateRouter = require('./routes/guardianUpdateRouter');
var locationRouter = require('./routes/locationRouter');
var bookingRouter = require('./routes/bookingRouter');
var tariffRouter = require('./routes/tariffRouter');
var defenseRouter = require('./routes/defenseRouter');
var feedbackRouter = require('./routes/feedbackRouter');

const Users = require('./models/userModel');
const ParentDetail = require('./models/parentDetailModel');
const Location = require('./models/locationModel');
const Booking = require('./models/bookingModel');
const Tariff = require('./models/tariffModel');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', checkUser, indexRouter);
// app.use('/users', usersRouter);
app.use('/about', checkUser, aboutRouter);
app.use('/home', checkRoutes, checkUser, homeRouter);
app.use('/guardian', checkRoutes, checkUser, guardianRouter);
app.use('/guardian_update', checkRoutes, checkUser, guardianUpdateRouter);
app.use('/location', checkRoutes, checkUser, locationRouter);
app.use('/booking', checkRoutes, checkUser, bookingRouter);
app.use('/tariff', tariffRouter);
app.use('/defense', checkUser, defenseRouter);
app.use('/feedback', checkUser, feedbackRouter);
app.use('/register', users);

app.listen(port, () => {
  console.log(`Connection is live at port no. ${port}`);
})