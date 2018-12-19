const mongodb = require('mongodb');
const mongoose = require('mongoose');
// const validator = require('validator');
var userSchema = new mongoose.Schema({
    email:{
        type: String,
        trim: true,
        required: true,
        minlength: 1
        // validate:{
        //     validator: validate.isEmail,
        //     message: 'not a valid email'
        // }
        },
    confirmpassword:{
            type: String,
            required: true,
            minlength: 1
        },
    password:{
        type: String,
        required: true,
        minlength: 1
    },

    firstname:{
        type:String,
        required:true,
        minlength:1
    },

    lastname:{
        type:String,
        required:true,
        minlength:1
    },
    token :{
        type :String,
        default :null
    }


 });

var user = mongoose.model('user',userSchema);
module.exports=user;
