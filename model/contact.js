const mongodb = require('mongodb');
const mongoose = require('mongoose');

// const validator = require('validator');

var contactlist = new mongoose.Schema({
 
    FirstName: {
        type: String,
        require: true,
        minlength: 1,
     },

     LastName: {
         type: String,
         require: true,
         minlength: 1,
     },

     email:{
         type: String,
         trim: true,
         require: true,
         minlength: 1,
     },

     DateOfBirth:{
         type: Date,
         require: true         
     }
});

var contact = mongoose.model('contact', contactlist);

module.exports=contact;