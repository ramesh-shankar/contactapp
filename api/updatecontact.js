const mongodb = require('mongodb');
const mongodbClient = require('mongodb').MongoClient;
var contact = require('../model/contact');


var updateContactMethod = ((req, res, next) =>{
    // console.log("DDDDDDDDDDDDDDDDd",req.body)
    // var update = {        
    //     FirstName: req.body.FirstName,
    //     LastName: req.body.LastName,
    //     email: req.body.email,
    //     DateOfBirth: req.body.DateOfBirth
    // };
    // console.log('sdsjdklj',req.body.FirstName, req.body.LastName,req.body.email,req.body.DateOfBirth);

    // var oldemail = req.body.oldemail;
    contact.findOneAndUpdate({email:req.body.email},{
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        DateOfBirth: req.body.DateOfBirth
    }) .then((doc) => {
        if(doc)
        {
            // console.log("DC",doc)
            res.send({status:true, message: 'contact updated'});

        }
        else{
            res.send({status:false, message: 'contact not found'});
        }
    },(e) => {
        res.send({status:false, message: 'contact not updated'});
    });

});

module.exports=updateContactMethod;