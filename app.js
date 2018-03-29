//app.js
var common = require('utils/common.js')
App({
  onLaunch: function () {


  },
  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            // 下面开始调用注册接口
            wx.request({
              url: 'https://api.it120.cc/' + that.globalData.subDomain +'/user/wxapp/register/complex',
              data: {code:code,encryptedData:encryptedData,iv:iv}, // 设置请求的 参数
              success: (res) =>{
                wx.hideLoading();
                that.login();
              }
            })
          }
        })
      }
    })
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
  }
})