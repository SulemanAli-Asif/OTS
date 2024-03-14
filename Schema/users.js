const mongoose = require('mongoose');
const validator = require('validator')
const passportLocalMongoose = require('passport-local-mongoose')
const userSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true,
        validate:{
            validator: function(value){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message:"invalid email format"
        }
    },
    password:{
        type:String,
        validate: [
            {
                validator: function(value) {
                    // Use regex to check for at least 8 characters
                    return value.length >= 8;
                },
                message: 'Password must be at least 8 characters long'
            },
            {
                validator: function(value) {
                    // Use regex to check for at least one uppercase letter
                    return /[A-Z]/.test(value);
                },
                message: 'Password must contain at least one uppercase letter'
            },
            {
                validator: function(value) {
                    // Use regex to check for at least one lowercase letter
                    return /[a-z]/.test(value);
                },
                message: 'Password must contain at least one lowercase letter'
            },
            {
                validator: function(value) {
                    // Use regex to check for at least one digit
                    return /\d/.test(value);
                },
                message: 'Password must contain at least one digit'
            },
            {
                validator: function(value) {
                    // Use regex to check for no spaces
                    return !/\s/.test(value);
                },
                message: 'Password cannot contain spaces'
            }
        ]
    }

    })

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });



module.exports = new mongoose.model('Users',userSchema);
