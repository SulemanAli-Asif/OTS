const express = require('express');
const { get_signup, post_signup,get_login,post_login, get_home} = require('../controller/controller');
// const isAuthenticated = require('../middlewares/isAuthenticated');
const router = express.Router();


function isAuth(req,res,next){
    console.log("Session:",req.session,"the user:",req.user)
    if(req.isAuthenticated())
    {
        console.log("User is authenticated:", req.user);
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
router.post('/login',post_login)

//get the test pages.
router.get('/tests',isAuth,(req,res)=>{
    res.render("test")
})

router.get('/profile',isAuth,(req,res)=>{
    res.send('profile');
})
module.exports = router;