const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formSubmit: function (e) {
    console.log(1);
    var data = e.detail.value
    if (!data.phoneNum || !data.remarks) {
      wx.showToast({
        title: '必填项不能为空',
        icon: 'none',
        duration: 2000
      })
    } else if (!(/^1[34578]\d{9}$/.test(data.phoneNum))) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none',
        duration: 2000
      })
    } else {

      app.request({
        url: 'studentTeacher/binding',
        method: 'POST',
        data: {
          remarks: data.remarks,
          phoneNum: data.phoneNum,
          role: wx.getStorageSync('role')
        },
        success: function (res) {
          if(res.result.code == 1){
            wx.navigateBack({
              delta: 1
            })

          }else{
            wx.showToast({
              title: res.result.msg,
              icon: 'none',
              duration: 2000
            })
          }
        
        }
      })
    }

  },
})