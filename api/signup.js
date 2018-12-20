const mongodb = require('mongodb');
const mongoClient = require('mongodb').mongoClient;
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
// var contact = require('../model/contact');
var jwt = require('jsonwebtoken');
// var jwtsecret ='erieriirtiuiuiruiu'
var user=require('../model/user');

var signup =((req, res) => {
    // console.log('req.body', req.body)
    var dbsignup = new user({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        confirmpassword:req.body.confirmpassword,
        // UserEmail:req.currentUser
    });
// console.log('dbsignupd',dbsignup);
user.findOne({email:dbsignup.email}) .then((response) => {
    // console.log('response',response);
    if(!response){
        // console.log("Email does not exist");
        if(dbsignup.password === dbsignup.confirmpassword){
            dbsignup.save() .then((doc) => {
                if(doc){
                    res.send({status:true, message: 'user saved'});
                    
                }else{
                    res.send({status:false, message: 'user are not saved'});
                }
                },(e) => {
                    console.log(e)
                    res.send({status:false, message: 'error occured while saving'});                          
            });

        }else{
            res.send({status:false, message:'password is not matched'});
        }}else{
            // console.log("EMail already exists")
        res.send({status:false, message: 'email is already exist'});
    }},(e) => {
        res.send({status:false, message: 'error'});
});
});

module.exports=signup;