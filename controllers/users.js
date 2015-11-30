var express = require('express');
var router = express.Router();
var Users = require('../models/users');

/* GET users listing. */
router.get('/userlist', function(req, res, next) {
  Users.toJSON(function(err, docs) {
    res.json(docs);
  });
});

module.exports = router;
