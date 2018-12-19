var express = require('express');
var router = express.Router();
var signup = require('../api/signup');
var login = require('../api/login');
var addcontact = require('../api/addcontact');
var fetchcontact = require('../api/fetchcontact');
var updatecontact = require('../api/updatecontact');
var deletecontact = require('../api/deletecontact');
var userModel = require('../model/user');
var jwt = require('jsonwebtoken');
var JWTSECRET ='qwerty'




var verifyTokenAPI=function(req,res,next){
  // console.log('99999999999',req)
  var authorizationHeader = req.headers['authorization'];
  // console.log('>>>>>>>>>>>>>>',authorizationHeader)    
if (authorizationHeader) {
token = authorizationHeader.split(' ')[1];
// console.log('mmmmmmmmmmmmmmmmmmmmmmmmmm',token)
if (token) {
  jwt.verify(token, JWTSECRET, function(err, decoded) {
    // console.log(';8888888888',decoded)
    if (err)return res.send({ status: false, message: 'Failed to authenticate token.' });
userModel.findOne({email: decoded.id}).then((response)=>{
        if(!response || response=='')return res.send({ status: false, message: 'User not found.'});
        if(response){
          req.currentUser = response;
          return next();
        }
      }).catch(function(err){
        return res.send({ status: false, message: 'User not found OR Some error has been occured.'});
      });
  });
}else {
  return res.send({ status: false, message: 'No token provided.' });
}
}
else {
return res.send({ status: false, message: 'Authorization Header is not set.' });
}
};
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', signup);
router.post('/login', login);
router.post('/contact', verifyTokenAPI,addcontact);
router.get('/fetchcontact',verifyTokenAPI, fetchcontact);
router.post('/updatecontact', updatecontact);
router.post('/deletecontact', deletecontact);

module.exports = router;
