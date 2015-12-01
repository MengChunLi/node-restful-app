"use strict";

const Utils = require('../../../helpers/utils.js');

class UserList {

  constructor() {}

  showUserInfo(e) {
    e.preventDefault();
    console.log(this);
  }

  bindHandleClick() {
    let $target = document.querySelector("#userList>table>tbody>tr");
    console.log($target);
    $target.click(event => {
      console.log("this");
      //showUserInfo();
    });
  }

  /**
   * ajax 填入使用者資料
   */
  populate() {

    let options = {
        path: '/users/userlist',
        method: 'GET'
    };

    let self= this;

    Utils.getJSON(options, (err, users) => {
      if(err){
          return console.log('Error while trying to get price: ', err);
      }
      let tableContent = '';
      let $container = document.querySelector("#userList table tbody");
      for(let user of users){
          tableContent += `<tr>
                            <td><a href="#" class="linkshowuser" rel=${user.username}>${user.username}</a></td>
                            <td rel=${user.username}>${user.email}</td>
                            <td><a href="#" class="linkdeleteuser">x</a></td>
                          </tr>`;
      }
      $container.innerHTML = tableContent;
      this.bindHandleClick();
      console.log(users, $container);
    });
  }

  init() {
    this.populate();
  }

};

export default UserList;