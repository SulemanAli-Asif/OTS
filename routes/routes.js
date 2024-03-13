const express = require('express');
const { get_signup, post_signup } = require('../controller/controller');
const router = express.Router();


//getting the home route.
router.get('/',(req,res)=>{
    var locals = {
        title: 'Online Testing Service',
        description: 'Page Description',
        header: 'Page Header'
    }
    res.render("index",locals);
})

//getting the sign up page.
router.get('/signup',get_signup);

//post request from signup page
router.post('/signup',post_signup);

module.exports = router;