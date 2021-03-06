"use strict";

var request = require('superagent');
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
    let self = this;
    let options = {
        url: '/users/userlist',
        method: 'GET',
        type: 'json'
    };

    request
      .get(options.url)
      .accept(options.type)
      .end((err, res) => {
        if(err){
            return console.log('Error while trying to get price: ', err);
        }
        
        let users = JSON.parse(res.text);
        //console.log(users);
        let tableContent = '';
        let $container = document.querySelector("#userList table tbody");
        userListData = users;
        for(let user of users){
          //console.log(user);
          tableContent += `<tr>
                            <td><a href="#" class="linkshowuser" rel=${user.username}>${user.username}</a></td>
                            <td rel=${user.username}>${user.email}</td>
                            <td><a href="#" class="linkdeleteuser" rel=${user._id}>x</a></td>
                           </tr>`;
        }
        $container.innerHTML = tableContent;
        // 綁定click顯示詳細資料
        let $linkShowUser = document.querySelectorAll("#userList a.linkshowuser");
        Utils.forEach($linkShowUser, (index, item) => {
          item.addEventListener("click", this.showUserInfo);
        });
        // 綁定click刪除使用者資料
        let $linkdeleteuser = document.querySelectorAll("#userList a.linkdeleteuser");
        Utils.forEach($linkdeleteuser, (index, item) => {
          //console.log(this, item);
          item.addEventListener("click", self.deleteUser.bind(null, this, item));
        });
        //console.log(users);
    });
  
    //$linkdeleteuser.addEventListener("click", this.deleteUser);
       
  }

  bindAddUser() {
    let $btnAddUser = document.querySelector("#btnAddUser");
    $btnAddUser.addEventListener("click", this.addUser.bind(this));
  }

  /**
   * POST 新增使用者資料
   */
  addUser(e) {
    e.preventDefault();
    //console.log('addd');
    let isEmpty = true;
    let EmptyCount = 0;
    let $inputList = document.querySelectorAll('#addUser input');

    Utils.forEach($inputList, (index, item) => {
      //console.log(index, item);
      if(item.value === ""){
        EmptyCount++;
      }
    });
    //console.log(EmptyCount);
    if(EmptyCount === 0){
      isEmpty = false;
    }
    if(!isEmpty){
      let newUser = {
        'username': document.querySelector('#addUser input#inputUserName').value,
        'email': document.querySelector('#addUser input#inputUserEmail').value,
        'fullname': document.querySelector('#addUser input#inputUserFullname').value,
        'age': document.querySelector('#addUser input#inputUserAge').value,
        'location': document.querySelector('#addUser input#inputUserLocation').value,
        'gender': document.querySelector('#addUser input#inputUserGender').value
      };

      let options = {
        url: '/users/adduser',
        method: 'POST',
        json: true,
        body: newUser
      };
       
      request
        .post(options.url)
        .send(options.body)
        .set('X-API-Key', 'foobar')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if(err) throw err;
           console.log(res);
          // 如果回應訊息是空字串表示成功
          if(res.text === ''){
            // Clear the form inputs
            let $allFields = document.querySelectorAll('#addUser fieldset input');
            Utils.forEach($allFields, (index, item) => {
              item.value = "";
            });
            // Update the table
            this.populate();
          }else{
            console.log('Error: ' + res.text);
          }
        });
    }else{
      alert('Please fill in all fields');
      return false;
    }
  }

  /**
   * DELETE 刪除某個使用者資料
   */
  deleteUser(self, item, e) {
    //console.log('item: ', item, 'self: ', self, 'e: ', e);
    e.preventDefault();
    
    let options = {
      url: '/users/deleteuser/' + item.getAttribute('rel')
    };
    
    let confirmation = confirm('Are you sure you want to delete this user?');
    
    
    if (confirmation === true) {
      request
        .del(options.url)
        .end((err, res) => {
          if(err) throw err;
          // 如果回應訊息是空字串表示成功
          if(res.text === ''){
          }else{
            console.log('Error: ' + res.text);
          }
          self.populate();
        });
    }else{
      return false;
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