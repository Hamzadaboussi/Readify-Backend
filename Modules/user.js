const urlDatabase = 'mongodb://localhost:27017/';
var url = require('url');
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectId;

exports.finById = function (req,res){
    
    const query  = url.parse(req.url,true).query;

    console.log(query);

    let filter = {}

    if (query.id != null) {
        filter._id  =  ObjectId(query.id)
    }

 

    console.log(filter);

    var MongoClient = require('mongodb').MongoClient;

    // url connection 
    MongoClient.connect(urlDatabase).then((db) => {
        //...
        console.log("DATABASE CONNECTED");

        // 
        var database = db.db('Readify');


        // { key : value }
        database.collection('users').findOne( filter ).then((result)=>{
            res.send({ success: true, data:result });
        }).catch((err)=>{
            res.send({ success: false, message: "Something went wrong" });
        })



    }).catch((err) => {
        // 
        res.send({ success: false, message: "Something went wrong" });
    })
}
exports.Updateuser = function (req, res) {
    var body = [];
    req.on('data', (b) => {
        body.push(b)
    }).on('end', () => {
        let textData = Buffer.concat(body).toString();
        let jsonUser;
        try {
            jsonUser = JSON.parse(textData);
 
            var MongoClient = require('mongodb').MongoClient;

            // url connection 
            MongoClient.connect(urlDatabase).then((db) => {
                //...
                console.log("DATABASE CONNECTED");

                // 
                var database = db.db('Readify');

 
                // update one
                database.collection('users').updateOne ( { _id:ObjectId(jsonUser.id) } , { $set: { 
                   "username":jsonUser.username,
                   "email":jsonUser.email,
                   "lname":jsonUser.lname,
                   "fname":jsonUser.fname
                  


                 } } ).then((data) => {
                    res.send({ success: true, message: "user updated successfully !!" });
                }).catch((err) => {
                    res.send({ success: false, message: "Could't update the user" });
                })
                



            }).catch((err) => {
                // 

                console.log(err);
                res.send({ success: false, message: "Something went wrong" });
            })


        } catch (error) {
            res.send({ success: false, message: "badly formated data" });
        }



    })
}
exports.finduser = function (req, res) {
    var body = [];
    req.on('data', (b) => {
        body.push(b)
    }).on('end', () => {
        let textData = Buffer.concat(body).toString();
        let jsonUser;
        try {
            jsonUser = JSON.parse(textData);
 
            var MongoClient = require('mongodb').MongoClient;

            // url connection 
            MongoClient.connect(urlDatabase).then((db) => {
                //...
                console.log("DATABASE CONNECTED");

                // 
                var database = db.db('Readify');

 
                // update one
                database.collection('users').findOne ( { _id:ObjectId(jsonUser.id) }   ).then((result) => {
                    res.send({ success: true, data:result });
                }).catch((err) => {
                    res.send({ success: false, message: "error user" });
                })
                



            }).catch((err) => {
                // 

                console.log(err);
                res.send({ success: false, message: "Something went wrong" });
            })


        } catch (error) {
            res.send({ success: false, message: "badly formated data" });
        }



    })
}



exports.updatepassword = function (req, res) {
    var body = [];
    req.on('data', (b) => {
        body.push(b)
    }).on('end', () => {
        let textData = Buffer.concat(body).toString();
        let jsonVehicule;
        try {
            jsonVehicule = JSON.parse(textData);
 
            var MongoClient = require('mongodb').MongoClient;

            // url connection 
            MongoClient.connect(urlDatabase).then((db) => {
                //...
                console.log("DATABASE CONNECTED");

                // 
                var database = db.db('Readify');

 
                // update one
                database.collection('users').updateOne ( { _id:ObjectId(jsonVehicule.id) } , { $set: { 
                    
  
                    "password":sha1(jsonVehicule.password)
                    


                 } } ).then((data) => {
                    res.send({ success: true, message: "Password updated successfully !!" });
                }).catch((err) => {
                    res.send({ success: false, message: "Could't update the password data" });
                })
                



            }).catch((err) => {
                // 

                console.log(err);
                res.send({ success: false, message: "Something went wrong" });
            })


        } catch (error) {
            res.send({ success: false, message: "badly formated data" });
        }



    })

}
exports.updatecategories = function (req, res) {
    var body = [];
    req.on('data', (b) => {
        body.push(b)
    }).on('end', () => {
        let textData = Buffer.concat(body).toString();
        let jsonVehicule;
        try {
            jsonVehicule = JSON.parse(textData);
 
            var MongoClient = require('mongodb').MongoClient;

            // url connection 
            MongoClient.connect(urlDatabase).then((db) => {
                //...
                console.log("DATABASE CONNECTED");

                // 
                var database = db.db('Readify');

 
                // update one
                database.collection('users').updateOne ( { _id:ObjectId(jsonVehicule.id) } , { $set: { 
                    
  
                    "c1":jsonVehicule.c1,
                    "c2":jsonVehicule.c2,
                    "c3":jsonVehicule.c3,
                    "c4":jsonVehicule.c4,
                    "c5":jsonVehicule.c5,
                    "c6":jsonVehicule.c6,
                    "c7":jsonVehicule.c7,
                    "c8":jsonVehicule.c8,
                    "c9":jsonVehicule.c9,
                    "c10":jsonVehicule.c10,
                    "c11":jsonVehicule.c11,
                    "c12":jsonVehicule.c12,

                 } } ).then((data) => {
                    res.send({ success: true, message: "Categories updated successfully !!" });
                }).catch((err) => {
                    res.send({ success: false, message: "Could't update the categories data" });
                })
                



            }).catch((err) => {
                // 

                console.log(err);
                res.send({ success: false, message: "Something went wrong" });
            })


        } catch (error) {
            res.send({ success: false, message: "badly formated data" });
        }



    })

}