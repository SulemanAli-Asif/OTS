const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        minlength:8,
    },
    role:{
        type:String,
        enum:['admin'],
        default:'admin'
    }
});

adminSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

module.exports = mongoose.model('admin', adminSchema);