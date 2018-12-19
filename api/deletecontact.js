const mongodb = require('mongodb');
// const mongodbClient = require('mongodb').MongoClient;
var contact = require('../model/contact');

var deleteContactMethod = ((req,res,next) => {

    // console.log('ffffffff',req);

    contact.findOneAndRemove({email:req.body.email},{
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        email:req.body.email,
        DateOfBirth:req.body.DateOfBirth
    })
    .then((doc) => {
        if(doc){
            // console.log("tttttttt",doc)
            res.send({status:true, message:'contact deleted'});
          }else{
              res.send({status:false, message:'contact not deleted'});
          }
        },(e) =>{
            res.send({status: false, message: 'contact not found'});
    });
});

module.exports=deleteContactMethod;