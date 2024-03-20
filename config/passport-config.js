const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Schema/users');
const Admin = require('../Schema/admin');

// User authentication strategy
passport.use('local', new LocalStrategy({ usernameField: 'email' }, User.authenticate()));

// Admin authentication strategy
passport.use('admin', new LocalStrategy({ usernameField: 'userName' }, Admin.authenticate()));

// Serialize and deserialize User
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Serialize and deserialize Admin
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

module.exports = passport;
