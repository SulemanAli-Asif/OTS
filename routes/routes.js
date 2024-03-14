const express = require('express');
const { get_signup, post_signup,get_login,post_login, get_home} = require('../controller/controller');
// const isAuthenticated = require('../middlewares/isAuthenticated');
const router = express.Router();
const passport = require('passport')

function isAuth(req,res,next){

   if(req.isAuthenticated())
    {
        return next();
    }
    console.log("User is not authenticated");
    res.redirect('/login')
}

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
router.get('/tests',isAuth,(req,res)=>{
    res.render("test")
})

router.get('/profile',isAuth,(req,res)=>{
    res.render('profile');
})
module.exports = router;