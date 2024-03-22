
module.exports.isAuth = (req, res, next) => {
    
    if (req.isAuthenticated() || (req.session.user && req.session.user.role === 'admin')) { // the session is being created which is a good thing however the req.user will not exist here because you are not send a user with the page.
        return next();
    }
    console.log("User is not authenticated");
    res.redirect('/login');
}

 
 module.exports.isAdmin = (req,res,next)=>{
    console.log("Session:",req.session);
    console.log("User:",req.user);
    console.log("userin the session is:",req.session.user)
    if(req.isAuthenticated()&& req.session.user.role ==='admin' )
    {
        
        return next();
    }
    res.status(403).send('Forbidden');
 }