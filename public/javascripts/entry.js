"use strict";

const userList = require('./module/userList.js');

let options = {
    path: '/users/userlist',
    method: 'GET'
};

userList.getJSON(options, function(err, users){
  if(err){
      return console.log('Error while trying to get price: ', err);
  }
  let tableContent = '';
  let container = document.querySelector("#userList table tbody");
  for(let user of users){
      tableContent += `<tr onclick="showUserInfo()">
                        <td><a href="#" class="linkshowuser" rel=${user.username}>${user.username}</a></td>
                        <td rel=${user.username}>${user.email}</td>
                        <td><a href="#" class="linkdeleteuser">x</a></td>
                      </tr>`;
  }
  container.innerHTML = tableContent;
  console.log(users, container);
});