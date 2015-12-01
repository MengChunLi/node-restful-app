var express = require('express');
var router = express.Router();
var Users = require('../models/users');

/* GET users listing. */
router.get('/userlist', function(req, res, next) {
  Users.toJSON(function(err, docs) {
    res.json(docs);
  });
});

/* POST to adduser */
router.post('/adduser', function(req, res){
  Users.addUser(req.body, function(err, result){
    res.send(
      (err === null) ? {msg: ''} : {msg: err}
    );
  });
});

module.exports = router;
