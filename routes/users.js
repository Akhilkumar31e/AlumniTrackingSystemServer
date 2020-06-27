var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');

var router = express.Router();
router.use(bodyParser.json());


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({})
  .then((users) => {
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
});

router.get('/:rollno', function(req, res, next) {
  User.findOne({rollnumber:req.params.rollno})
  .then((user) => {
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));
});

router.post('/filter',function(req,res,next){
  console.log( req.body);
  User.find({ yearofpassing : req.body.yearofpassing,
              branch:req.body.branch})
  .then((users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = router;
