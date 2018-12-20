const mongodb = require('mongodb');
const mongoClient = require('mongodb').mongoClient;
var contact = require("../model/contact");

var fetchContactMethod = ((req,res, next) => {

    // console.log("useeeeeerrr",req.currentUser)
    var email = req.currentUser.email;
    console.log("fetch user email",email)
    contact.find({UserEmail:req.currentUser.email}).then(function(response) {
        console.log('doc', response);
         res.json({ status: true, data:response })
    }).catch((err) => {
        console.log("FETCH PLAYER ERROR", err);
        return res.json({ status: false, response: err })
    })

    // var email = req.currentUser.email;

    // console.log(req.currentUser)
    // // contact.find({email}) .then((contact)=>{
    //     // console.log(contact);
    // //     res.status(200). send ({contact});
    // // },(e) => {
    // //     res.status(404).send(e);
        
    // // });
});

module.exports=fetchContactMethod;