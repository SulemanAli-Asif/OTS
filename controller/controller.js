const User = require('../Schema/users')
const passport = require('passport')

exports.get_signup = (req,res)=>{
    var locals = {
        title: 'Sign-up',
        description: 'Sign-up page',
        header: 'Page Header'
    }

    res.render('signup',locals)
}

exports.post_signup = async (req,res) =>{
    const {username,email,password} = req.body;
    try{

        console.log('Request Body:', req.body);
        console.log(password);
        if (!username || username.trim() === '') {
            throw new Error('Username is required!');
        }
        console.log('Creating user:', { username, email });

        const user = new User({username,email});

        console.log('User instance:', user);
        
        await User.register(user,password);
       
         res.send('Signin successfully');
    }
    catch(err)
    {
       console.log(err);
       res.send(err.message).status(400)
    }
}
