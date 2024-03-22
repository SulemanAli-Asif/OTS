const adminRouter = require('express').Router();
const adminLayout = "../views/layouts/admin";
const {isAdmin} = require('../middlewares/isAuthenticated');
const Admin = require('../Schema/admin');
const passport = require('passport')

adminRouter.get('/admin',(req,res)=>{

    if(req.session.user){
        console.log(req.session.user.role)
        return res.redirect('/dashboard')
    }
   else
   { const user = req.session.user;
    var locals = {
        title: 'Online Testing Service',
        description: 'Page Description',
        header: 'Page Header',
        user: user
    }
    res.render('admin',locals);
}
})


// adminRouter.post('/admin',async(req,res)=>{
//     const {userName,password} = req.body;
//     console.log({userName,password});
//     try{
//         if (!userName || userName.trim() === '') {
//             throw new Error('Username is required!');
//         }
//         console.log('Creating user:', { userName });

//         const user = new Admin({userName});

//         console.log('User instance:', user);
        
//         await Admin.register(user,password);
       
//         res.redirect('/')
//     }
//     catch(err){
//         console.log(err);
//         res.send(err.message).status(400)
//     }
// })

adminRouter.post('/admin',passport.authenticate('admin'),async (req,res)=>{
    
   


        const {userName,password} = req.body;
        try{
            const user = await Admin.findOne({userName});
            if (!user) {
                return res.status(404).send("User doesn't exist");
            } const isMatch = await user.authenticate(password);
            if (isMatch) {
                req.session.user = user; 
                req.user = user;// Store user information in session
                console.log(req.user);
                return res.redirect('/dashboard');
            }
            // Password does not match
            console.log("Password does not match");
            return res.status(401).json({ message: "Invalid email or password" });
        } catch (err) {
            // Handle errors 
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    

})

adminRouter.get('/dashboard',isAdmin,(req,res)=>{
    const user = req.session.user;
    var locals = {
        title: 'Online Testing Service',
        description: 'Page Description',
        header: 'Page Header',
        user: user
    }
    res.render('/dashboard',locals);
})

module.exports = adminRouter;