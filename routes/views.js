var express = require('express');
var router = express.Router();
var userModel = require('../model/user');

var jwt = require('jsonwebtoken');

var JWTSECRET ='qwerty'

var verifyToken= function(req,res,next){
  if(req.cookies.jwtToken){
    token = req.cookies.jwtToken;
    if (token && token!=undefined) {
      if (!token)return res.redirect('/');
      jwt.verify(token,JWTSECRET, function(err, decoded) {
        if (err)return res.redirect('/');
        userModel.findOne({email: decoded.id}).then(function(res){
          
            if(res==null || res=='')return res.redirect('/');
            if(res){
              req.currentUser = res;
              return next();
            }
          }).catch(function(err){
            return res.redirect('/');
          });
      });
    }
    else {
      return res.redirect('/');
    }
  }else {
    return res.redirect('/');
  }
};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/contact',verifyToken, function(req, res, next) {
  res.render('contact');
});

router.get('/profile', function(req, res, next) {
  res.render('profile');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

// router.get('/login', function(req, res, next) {
//   res.render('login');
// });

module.exports = router;
