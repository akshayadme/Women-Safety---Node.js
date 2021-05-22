const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');

const Users = require('./models/userModel');

exports.local = passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
    Users.findOne({ email: email }, (err, data) => {
        if (err) throw err;
        if (!data) {
            return done(null, false);
        }
        if (data) {
            bcrypt.compare(password, data.password, (err, match) => {
                if (err) {
                    return done(null, false);
                }
                if (!match) {
                    return done(null, false);
                }
                if (match) {
                    return done(null, data);
                }
            });
        }
    });
})
);

passport.serializeUser(function (Users, cb) {
    cb(null, Users._id);
});

passport.deserializeUser(function (id, cb) {
    Users.findById(id, function (err, Users) {
        cb(err, Users);
    });
});

exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log('JWT payload: ', jwt_payload);
    Users.findOne({
        _id: jwt_payload._id
    }, (err, user) => {
        if (err) {
            return done(err, false);
        } else if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

exports.verifyUser = passport.authenticate('jwt', {
    session: false
});