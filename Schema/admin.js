const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

const adminSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    role:{
        type:String,
        enum:['admin'],
        default:'admin'
    }
});

adminSchema.plugin(passportLocalMongoose, { usernameField: 'userName' });

module.exports = mongoose.model('User', adminSchema);