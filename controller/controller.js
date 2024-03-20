const User = require('../Schema/users')
const passport = require('passport')

exports.get_home =  (req,res)=>{
    console.log("User:" ,req.user);
    const user = req.user;
    var locals = {
        title: 'Online Testing Service',
        description: 'Page Description',
        header: 'Page Header',
        user: user
    }
    res.render("index",locals);
}

exports.get_signup = (req,res)=>{
    const user = req.user;
    var locals = {
        title: 'Online Testing Service',
        description: 'Page Description',
        header: 'Page Header',
        user: user
    }

    res.render('signup',locals)
}

exports.post_signup = async (req,res) =>{
    const {username,email,password} = req.body;
    try{

        if (!username || username.trim() === '') {
            throw new Error('Username is required!');
        }
        console.log('Creating user:', { username, email });

        const user = new User({username,email});

        console.log('User instance:', user);
        
        await User.register(user,password);
       
         res.redirect('login');
    }
    catch(err)
    {
       console.log(err);
       res.send(err.message).status(400)
    }
}

exports.get_login = (req,res)=>{
    const user = req.session.user;

    var locals = {
        title: 'Online Testing Service',
        description: 'Page Description',
        header: 'Page Header',
        user: user
    }
    res.render('login',locals)
}

exports.post_login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("User doesn't exist");
        }
        const isMatch = await user.authenticate(password);
        if (isMatch) {
            req.session.user = user; 
            req.user = user;// Store user information in session
            console.log(req.user)
         res.redirect('/profile');
        }
       
    } catch (err) {
        // Handle errors properly
         // Password does not match
         console.log("Password does not match");
         return res.status(401).json({ message: "Invalid email or password" });
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.get_profile = (req,res)=>{
    console.log(req.session);
    const user = req.session.user;
    var locals = {
        title: 'Online Testing Service',
        description: 'Page Description',
        header: 'Page Header',
        user: user
    }
    res.render('profile',locals);

}


exports.get_test = (req,res)=>{
    const user = req.session.user;
    console.log(user);
    var locals = {
        title: 'Online Testing Service',
        description: 'Page Description',
        header: 'Page Header',
        user: user
    }
    res.render('test',locals);

}
