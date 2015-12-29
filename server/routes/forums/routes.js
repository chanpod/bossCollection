var express = require('express');
var router = express.Router();


  router.use(function(req, res, next){
      
        console.log(req.session.user);
        
        if(req.session.user){
            
            next();
        }
        else{
            req.session.error = 'Access denied!';
            res.redirect('/auth/login');
        }
        
    })
    
  router.get('/', function(req, res){
      
      console.log("Successfully accessed forum route");
      
      res.render('index', {});
  });
  
  module.exports = router;