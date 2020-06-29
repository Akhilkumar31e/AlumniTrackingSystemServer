var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/user');
const Post = require('../models/posts');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup',(req,res,next) => {
  User.findOne({rollnumber: req.body.rollnumber})
  .then((user) => {
    console.log(req.body);
    if( user!=null ) {
      var err=new Error('User ' +req.body.rollnumber+' already exists');
      err.status = 403;
      next(err);
    }
    else{
      return User.create(req.body);
    }
  })
  .then((user) => {
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({status:'Registration Successful', user:user});

  },(err)=> {console.log('Internal error,cant do anythin');
    next(err)})
  .catch((err) => next(err));
});

router.post('/login',(req,res,next) => {
  if(!req.session.user){
    var authHeader = req.headers.authorization;

    if(!authHeader) {
      var err = new Error('You are not authenticated');
  
      res.setHeader('WWW-Authenticate','Basic');
      err.status = 401;
      return next(err); 
    }
    var auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
  
    var username = auth[0];
    var password = auth[1];
    User.findOne({rollnumber: username})
    .then((user) => {
        if(user===null){
          var err = new Error('User '+ username + 'doesnt exist');
          err.status = 403;
          return next(err); 
        }
        else if(user.password !== password) {
          var err = new Error('Password '+ password + 'is incorrect');
          err.status = 403;
          return next(err); 
        }
        else if(user.rollnumber===username && user.password === password){
          console.log(username,password);
          req.session.user = 'authenticated';
          res.statusCode= 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('You are now logged in');
          
        }
    })
    .catch((err)=> next(err));
  }
  else{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('You are already logged in');
  }
});

router.get('/logout',(req,res) => {
  if(req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    var err= new Error('You are not logged in');
    err.status = 403;
    return next(err);
  }
});

router.get('/getPosts', (req, res) => {
  Post.find()
  .then((posts) => {
    console.log(posts);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(posts);
  })
  .catch(err => console.log(err));
})


router.post('/newPost', (req, res) => {
  console.log(req.body);
  Post.create(req.body)
  .then((posts) => {
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(posts);
  })
  .catch(err => console.log(err));
})



module.exports = router;
