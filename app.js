//app.js
var common = require('utils/common.js')
App({
  onLaunch: function () {
      

  },
  registerUser: function () {
   
  },
  getUserInfo:function() {
    wx.getUserInfo({
      success:(data) =>{
        this.globalData.userInfo = data.userInfo;
        console.log(this.globalData.userInfo);
        return this.globalData.userInfo;
      }
    })
  },
  globalData:{
    userInfo:null,
    subDomain:"34vu54u7vuiuvc546d"
  },
  login:function(){
    common.login();
  },
  selectRole : function(cb){
    common.selectRole(cb)
  },
  request: function (requestHandler){
    common.requestData(requestHandler)
  }
})