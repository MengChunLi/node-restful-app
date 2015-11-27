"use strict";

const http = require('http');

function getJSON(options, cb){
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
}

const options = {
  path: '/users/userlist',
  method: 'GET'
};

getJSON(options, function(err, users){
  if(err){
      return console.log('Error while trying to get price: ', err);
  }
  let tableContent = '';
  let container = document.querySelector("#userList table tbody");
  for(let user of users){
      tableContent += `<tr>
                        <td><a href="#" class="linkshowuser">${user.username}</a></td>
                        <td>${user.email}</td>
                        <td><a href="#" class="linkdeleteuser">x</a></td>
                      </tr>`;
  }
  container.innerHTML = tableContent;
  console.log(users, container);
});