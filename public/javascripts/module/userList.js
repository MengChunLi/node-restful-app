"use strict";

const http = require('http');

var userList = {

  getJSON: (options, cb) => {
    http.request(options, function(res){
        let body = '';

        res.on('data', function(chunk){
            body+= chunk;
        });

        res.on('end', function(){
            let result = JSON.parse(body);
            cb(null, result);
        });

        res.on('error', cb);
    })
    .on('error', cb)
    .end();
  },

  showUserInfo: (e) => {
    e.preventDefault();
    console.log(this);
  }



};

module.exports = userList;