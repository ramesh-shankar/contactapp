const mongodb = require('mongodb');
const mongoClient = require('mongodb').mongoClient;
var contact = require("../model/contact");

var fetchContactMethod = ((req,res) => {

    contact.find().then(function(response) {
        // console.log('doc', response);
         res.json({ status: true, contactlist: response })
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