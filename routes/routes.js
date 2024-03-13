const express = require('express');
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


module.exports = router;