const express = require('express');
const { get_signup, post_signup,get_login,post_login, get_home, get_profile, get_test} = require('../controller/controller');
const {isAuth} = require('../middlewares/isAuthenticated');
const router = express.Router();
const passport = require('passport')

// module.exports = isAuthenticated;
//getting the home route.
router.get('/',get_home);

//getting the sign up page.
router.get('/signup',get_signup);

//post request from signup page
router.post('/signup',post_signup);

//getting the login page.
router.get('/login',get_login);

//post request from login page.
router.post('/login', passport.authenticate('local'),post_login) //this shitty middleware made me work on it for 4 f'ing hrs 

//get the test pages.
router.get('/tests',isAuth,get_test)

router.get('/profile',isAuth,get_profile)

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
module.exports = router;