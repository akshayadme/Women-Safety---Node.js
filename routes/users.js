var express = require('express');
var router = express.Router();
var bodyParser =require('body-parser');
var passport = require('passport');
var authenticate = require('../authenticate');
var bcrypt = require('bcryptjs');

const Users = require('../models/userModel');

router.use(bodyParser.json());

router.post('/', (req, res, next) => {
  Users.findOne({ 'email': req.body.email }, (err, data) => {
      if (data) {
          res.statusCode = 404;
          res.end('User Already exists');
      } else {
          Users.create(req.body)
              .then((user) => {
                  user.password = bcrypt.hashSync(user.password, 10);
                  user.save((err, data) => {
                      if (err) throw error;
                      passport.authenticate('local')(req, res, () => {
                        res.render('home', {
                            title: '',
                            msg:''
                          });
                      });
                  })

              })
      }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });
  var username = req.user.fname;
  res.render('home', {
    title: '',
    msg:'',
    loginUser: username,
  });
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      res.redirect('/')
    }
  });
  res.redirect('/')
});


router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });
  });

module.exports = router;
