const mongodb = require('mongodb');
const mongoClient = require('mongodb').mongoClient;
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
// var contact = require('../model/contact');
var user=require('../model/user');
var JWTSECRET ='qwerty'

var dblogin=((req, res, next) => {
    var login = {
        email: req.body.email,
        password: req.body.password
        
    };
    // console.log(login);
    user.findOne({email:login.email}).then((doc)=>{
        // console.log('doc', doc)
        if(doc !=undefined){
            // console.log('>>>>>>>>>>>>>>>>>>>>>',doc)
            if(doc.password==login.password){
                var token = jwt.sign({id : doc.email},JWTSECRET);
                doc.token=token;
                doc.save();
                res.cookie('jwtToken',token)
                return res.json({
                    status: true,
                    message: 'Login succesfull',
                    email:doc.email,
                    token : token
                });
            }else{
                res.send({status:false, message: 'Password incorrect!'});
            }
                       
        }else{
            res.send({status:false, message: 'Please Signup'});
        }
    });
});

module.exports=dblogin;

