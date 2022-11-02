const urlDatabase = 'mongodb://localhost:27017/';
var url = require('url');
var sha1 = require('sha1');
var jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectId;

exports.createaccount = function (req,res){
    var body  = [];
    req.on('data',(b)=>{
        body.push(b)
    }).on('end',()=>{
        let textData = Buffer.concat(body).toString();
        let jsonData = JSON.parse(textData);
         
  
        //  { username:"" , password:"" , fullname:"" }
        
        var MongoClient = require('mongodb').MongoClient;

        // url connection 
        MongoClient.connect(urlDatabase).then((db) => {
            //...
            console.log("DATABASE CONNECTED");
            var database = db.db('Readify');

            // username unique auth 
            database.collection('users').findOne({ 'email': jsonData.email }).then((result)=>{

                if (result === null ) {
                    
                    // we can add the new user
                    let user = {
                        username:jsonData.username,
                        email:jsonData.email,
                        password: sha1(jsonData.password) ,
                        confirmpassword: sha1(jsonData.confirmpassword) ,
                        lname:jsonData.lname,
                        fname:jsonData.fname,
                        c1:'',
                        c2:'',
                        c3:'',
                        c4:'',
                        c5:'',
                        c6:'',
                        c7:'',
                        c8:'',
                        c9:'',
                        c10:'',
                        c11:'',
                        c12:''
                   
                    }
                    
                    database.collection('users').insertOne( user ).then((resultInsert)=>{
                        database.collection('users').findOne({_id:(ObjectId(resultInsert.insertedId)) }).then((r)=>{

                            if (r !== null) {
                                // generate a new token
                                var token  = jwt.sign({
                                    user:r,
                            
                                    iat: Math.floor(Date.now() / 1000),
                                    exp: Math.floor(Date.now() / 1000) + ((60 * 60 ) * 2 ) , 
                            
                                  },
                                  'abcd'
                                  )
                                  
                            
                                  res.send( { success:true, token:token } );
                       
                                }else{
                                    res.send({success:false, message:"wrong username or password"})
                                }
                            }).catch((err)=>{
                                res.send({success:false, message:"Something went wrong"})
                            })
                    }).catch((err)=>{
                        res.send({success:false, message:"Something went wrong"})
                    })
                }else{
                    res.send({success:false, message:"Username is already in use."})
                }

                 
            }).catch((err)=>{
                res.send({success:false, message:"Something went wrong"})
            })

        })

       
  
    })
}



exports.connect = function(req,res){
    var body  = [];
    req.on('data',(b)=>{
        body.push(b)
    }).on('end',()=>{
        let textData = Buffer.concat(body).toString();
        let jsonData = JSON.parse(textData);
         
  
        //  { username:"" , password:"" }
       
  
        // generate a new token !!
        // check login and password first
        // database ????


        
        var MongoClient = require('mongodb').MongoClient;

        // url connection 
        MongoClient.connect(urlDatabase).then((db) => {
            //...
            console.log("DATABASE CONNECTED");
            var database = db.db('Readify');

            database.collection('users').findOne({ email:jsonData.email, password : jsonData.password}).then((r)=>{

                if (r !== null) {
                    // generate a new token
                    var token  = jwt.sign({
                        user:r,
                
                        iat: Math.floor(Date.now() / 1000),
                        exp: Math.floor(Date.now() / 1000) + ((60 * 60 ) * 2 ) , 
                
                      },
                      'abcd'
                      )
                      
                
                      res.send( { success:true, token:token } );

                }else{
                    res.send({success:false, message:"wrong username or password"})
                }
            }).catch((err)=>{
                res.send({success:false, message:"Something went wrong"})
            })
        })



 
  
    })
}