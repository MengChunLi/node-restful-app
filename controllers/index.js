var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var BASEURL = req.protocol + '://' + req.get('host');
  res.render('index', { title: 'CREATING A SIMPLE RESTFUL WEB APP WITH NODE.JS, EXPRESS, AND MONGODB', BASEURL: BASEURL });
});

module.exports = router;