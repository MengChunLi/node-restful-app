var express = require('express');
var router = express.Router();
var Users = require('../models/users');

/* GET users listing. */
router.get('/userlist', function(req, res, next) {
  Users.toJSON(function(err, docs) {
    // 接收到的是object必須轉成json才能存進資料庫
    res.json(docs);
  });
});

/* POST to adduser. */
router.post('/adduser', function(req, res){
  Users.addUser(req.body, function(err, result){
    res.send(
      (err === null) ? '' : err
    );
  });
});

/* DELETE to deleteuser. */
router.delete('/deleteuser/:id', function(req, res){
  var userToDelete = req.params.id;
  console.log(userToDelete);
  Users.removeUser({ '_id' : userToDelete }, function(err){
    res.send(
      (err === null) ? '' : err 
    );
  });
});

module.exports = router;
