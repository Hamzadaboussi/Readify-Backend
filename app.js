const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
var jwt = require('jsonwebtoken');
const { createaccount, connect,logout } = require('./Modules/Auth');
const {Updateuser, updatepassword,finById,finduser, updatecategories}=require('./Modules/user');
app.use(cors());

app.use(function(req,res,next){
  


  if (req.url === "/login") {
    next();
  }
  else if( req.url === "/signup" ){
    next();

  }  
 
  else if( req.url === "/Updateuser" ){
    next();

  }
  else if( req.url === "/finduser" ){
    next();

  }
  else if( req.url === "/Updatepassword" ){
    next();

  }
  else if( req.url === "/Updatecategories" ){
    next();

  }
 else{
        // verify the access token !!
        if (req.headers.authorization != null) {
          const token  = req.headers.authorization;
    
          try {
            let decod = jwt.verify(token,'abcd');
            console.log(decod);
    
            
            next();
          } catch (error) {
            res.send("session expired")
          }
    
    
        }else{
          res.send("oups access denied no token present")
        }
  }


  
})

app.post('/login',(req,res)=>{
    connect(req,res)
  })
  app.post('/Updateuser',(req,res)=>{
    Updateuser(req,res)
  })
  app.post('/Updatepassword',(req,res)=>{
    updatepassword(req,res)
  })
  app.post('/Updatecategories',(req,res)=>{
    updatecategories(req,res)
  })
  
  app.get('/connected', (req, res) => {
    const token  = req.headers.authorization;
      
    try {
      let decod = jwt.verify(token,'abcd');
      console.log(decod);
        let user = decod.user;
  
        delete user.password;
  
        res.send(user)
    } catch (error) {
      res.send("session expired")
    }
  })
  
  
  app.post('/finduser',(req,res)=>{
    finduser(req,res)
  })

  app.post('/signup',(req,res)=>{
    createaccount(req,res);
  })
  app.get('/logout',(req,res)=>{
    logout(req,res);
  })
  app.get('/api/users/details',(req,res)=>{
    finById(req,res);
  })
  
  app.listen(port, () => {
    console.log(`Server app listening at http://localhost:${port}`)
  })