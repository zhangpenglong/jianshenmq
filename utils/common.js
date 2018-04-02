var mdutil = require('md5.js')
var host = "http://jianshenapi.pipichongwu.cn/jianshenapi/"
function requestData(requestHandler) {
  var that = this
  var method = requestHandler.method == '' ? 'GET' : requestHandler.method
  var data = that.md5(requestHandler.data);
  data.isWXSmallProgram = 1
  if (requestHandler.nodata) {
    var nodata = requestHandler.nodata
    for (var key in nodata) {
      console.log(key + "=" + nodata[key]);
      data[key] = nodata[key]
    }
  }
  var consType = 'application/json'
  if (method == 'POST') {
    consType = 'application/x-www-form-urlencoded'
  }
  wx.request({
    url: host + requestHandler.url,
    data: data,
    dataType: 'json',
    header: {
      'Content-type': consType
    },
    method: method,
    success: function (res) {

      wx.hideLoading()
      if (res.statusCode == 200) {
        var data = JSON.parse(res.data)
        requestHandler.success(data)
      } else {
        requestHandler.fail()
      }

    },
    fail: function (res) {
      wx.hideLoading()
      fail()
    },
    complete: function (res) {

    },
  })
}

function md5(data) {
  var res = wx.getSystemInfoSync()

  var deviceType;
  if (res.system.indexOf('ios') > -1) {
    deviceType = 0
  } else {
    deviceType = 1
  }
  var version = '1.0.0'
  var app = 'com.dongao.app.edu'
  var appName = 'da--app'
  var original = '';
  //var json2map = JSON.parseStr(data);
  data.deviceType = deviceType
  data.version = version
  data.app = app
  data.appName = appName
  data.deviceType = deviceType
  data.deviceType = deviceType
 
  if (!data.uniqueId) {
    data.uniqueId = ''
  }
  data.userId = wx.getStorageSync('userId')
  if(!data.userId){
    data.userId = ''
  }

  var temp = [];
  for (var key in data) {
    temp.push(key + "=" + data[key]);
  }
  temp.sort();

  for (var i = 0; i < temp.length; i++) {

    if (i == temp.length - 1) {
      original = original + temp[i]
    } else {
      original = original + temp[i] + "&"
    }
  }
  original = original + "9538b4568d3e4c1ab3ba250adb3bea6a";
  var sign = mdutil.md5(original);
  data.sign = sign.toLowerCase()
  return data;
}


function login(cb) {
  var that = this;
  if (wx.getStorageSync('userId')) {
    typeof cb == "function" && cb()
  } else {
    //调用登陆接口
    wx.login({
      success: function (res) {
        wx.setStorageSync('code', res.code)
        var url = 'login/wxSession'
        that.requestData({
          url: url,
          data: { code: res.code },
          method: '',
          success: function (res1) {
            if(res1.result.code == 1){
              var bodyMap = res1.bodyMap 
              wx.setStorageSync('userId', bodyMap.userinfo.id)
              if (bodyMap.role == 2){
                 that.selectRole()
                }else{
                  wx.setStorageSync('role', bodyMap.role)
                }
            }else{

            }
           

          }

        });

      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    })
  }
}


function selectRole(cb){
  var that = this
  wx.showActionSheet({
    itemList: ['我是学员', '我是教练'],
    success: function (res) {
      if (res.tapIndex == 0 || res.tapIndex == 1) {
        that.requestData({
          url: 'login/setRole',
          data: {
            tapIndex: res.tapIndex
          },
          method: '',
          success: function (res2) {
            if (res2.result.code == 1) {
              wx.setStorageSync('role', res.tapIndex)
              typeof cb == "function" && cb()
            } else {

            }
          }
        })
      }
    },
    fail: function (res) {
      console.log(res.errMsg)
    }
  })

}

module.exports.requestData = requestData
exports.requestData = requestData


module.exports.login = login
module.exports.selectRole = selectRole

module.exports.md5 = md5
exports.md5 = md5