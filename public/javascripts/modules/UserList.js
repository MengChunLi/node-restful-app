"use strict";

const Utils = require('../../../helpers/utils.js');

let userListData = [];

class UserList {

  constructor() {
    this.populate();
    this.bindAddUser();
  }

  /**
   * GET 填入使用者資料
   */
  populate() {

    let options = {
        path: '/users/userlist',
        method: 'GET'
    };

    Utils.getJSON(options, (err, users) => {
      if(err){
          return console.log('Error while trying to get price: ', err);
      }
      let tableContent = '';
      let $container = document.querySelector("#userList table tbody");
      userListData = users;
      for(let user of users){
        tableContent += `<tr>
                          <td><a href="#" class="linkshowuser" rel=${user.username}>${user.username}</a></td>
                          <td rel=${user.username}>${user.email}</td>
                          <td><a href="#" class="linkdeleteuser">x</a></td>
                         </tr>`;
      }
      $container.innerHTML = tableContent;
      let $linkShowUser = document.querySelector("#userList a.linkshowuser");
      $linkShowUser.addEventListener("click", this.showUserInfo);
      //console.log(users, $container);
    });
  }

  bindAddUser() {
    let $btnAddUser = document.querySelector("#btnAddUser");
    $btnAddUser.addEventListener("click", this.addUser);
  }

  /**
   * POST 新增使用者資料
   */
  addUser(e) {
    e.preventDefault();
    console.log('addd');
    let isEmpty = false;
    let EmptyCount = 0;
    let $inputList = document.querySelectorAll('#addUser input');
    Utils.forEach($inputList, function(index, item){
      console.log(index, item);
      if(item.value === ""){
        EmptyCount++;
      }
    });
    console.log(EmptyCount);
    if(EmptyCount > 0){
      isEmpty = true;
    }
    if(!isEmpty){
      let newUser = {
        'username': document.querySelectorAll('#addUser input#inputUserName').value,
        'email': document.querySelectorAll('#addUser input#inputUserEmail').value,
        'fullname': document.querySelectorAll('#addUser input#inputUserFullname').value,
        'age': document.querySelectorAll('#addUser input#inputUserAge').value,
        'location': document.querySelectorAll('#addUser input#inputUserLocation').value,
        'gender': document.querySelectorAll('#addUser input#inputUserGender').value
      };

      let options = {
        path: '/users/adduser',
        data: newUser,
        method: 'POST',
        dataType: 'JSON'
      };


    }
  }

  /**
   * 顯示click的使用者資料
   */
  showUserInfo(e) {
    e.preventDefault();
    console.log(this);
    let thisUserName = this.getAttribute('rel');
    // 取得資料表內目前姓名的index
    let arrayPosition = userListData.map((item) => {
      return item.username;
    }).indexOf(thisUserName);
    let $userInfoName = document.querySelector("#userInfo #userInfoName");
    let $userInfoAge = document.querySelector("#userInfo #userInfoAge");
    let $userInfoGender = document.querySelector("#userInfo #userInfoGender");
    let $userInfoLocation = document.querySelector("#userInfo #userInfoLocation");
    $userInfoName.innerHTML = userListData[arrayPosition].username;
    $userInfoAge.innerHTML = userListData[arrayPosition].age;
    $userInfoGender.innerHTML = userListData[arrayPosition].gender;
    $userInfoLocation.innerHTML = userListData[arrayPosition].location;
    console.log($userInfoName);
  }

};

export default UserList;