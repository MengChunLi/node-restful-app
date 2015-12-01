/**
 * 用來存放共用的js, 例如format date, time or ajax
 */
 "use strict";

const http = require('http');

var Utils = {

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

  // 提供querySelectorAll使用.each()
  forEach: (array, callback, scope) => {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]); // passes back stuff we need
    }
  }
};

module.exports = Utils;