const mongodb = require('mongodb');
const mongoClient = require('mongodb').mongoClient;
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var contact = require('../model/contact');
// var jwt = require('jsonwebtoken');
// var jwtsecret ='erieriirtiuiuiruiu'
// var user=require('../model/user');


var addcontact = ((req, res) =>{
    // console.log('curreenntte',req.currentUser)
    console.log('req.body',req.body)
var dbcontact = new contact({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    email: req.body.email,
    DateOfBirth: req.body.DateOfBirth,
    UserEmail: req.currentUser.email});
console.log("dataAAAAAAAAAAAAAAAAAAAAAAAAA",dbcontact.UserEmail);
contact.findOne({email :req.body.email}).then((response) =>{
console.log('response', response);
    if(!response){
        console.log('contact does not exist');
        dbcontact.save().then((doc) =>{
            console.log("save connact",doc)
            res.send({status:true, massage: 'contact saved!'});
        },(e)=>{
            res.send({stauts:false, massage:'contact not saved'});
        })
    }else{
        // console.log('contact already exists')
        res.send({status:false, massage:'data exists'});
    }
});
});


module.exports=addcontact;