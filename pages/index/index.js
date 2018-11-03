//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false , // loading
    userInfo: {},
    swiperCurrent: 0,  
    selectCurrent:0,
    categories: [],
    activeCategoryId: 0,
    goods:[],
    scrollTop:"0",
    loadingMoreHidden:true,
    pageIndex:0,
    totalPage:0,
    courseList:[],
    showType: false,
    show0: false,
    show1: false,
    show2: false,
    bindProductTypeIndex: null,
    role:wx.getStorageSync('role'),
  },

 
  scroll: function (e) {
    //  console.log(e) ;
    var that = this,scrollTop=that.data.scrollTop;
    that.setData({
      scrollTop:e.detail.scrollTop
    })
    // console.log('e.detail.scrollTop:'+e.detail.scrollTop) ;
    // console.log('scrollTop:'+scrollTop)
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    wx.setNavigationBarTitle({
      title: "全部课程"
    });


  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.listCourse(-1)
  },

  listCourse : function(status){
    var that = this;
    var data = {}
    if(null == status){
     
    }
    app.request({
      url: 'course/selectByPage',
      data: {
        userId: wx.getStorageSync('userId'),
        pageIndex: that.data.pageIndex,
        state:status,
      },
      method: '',
      success: function (res) {
        if (res.code == 1) {
          if (res.body.courseList) {
            that.setData({
              courseList: res.body.courseList
            })
          }

        } else {

        }

      }, fail: function () {

      }

    })
  },

  //确认
  yes:function(e){
    var courseId = e.currentTarget.dataset.id
    var state = 8
    this.updateState(state,courseId)
  },
  //拒绝
  no:function(e){
    var courseId = e.currentTarget.dataset.id
    var state = 3
    if (wx.getStorageSync('role') == 1){
      state = 2
    }
    this.updateState(state, courseId)
  },

  //取消
  cancel:function(e){
    var courseId = e.currentTarget.dataset.id
    var state = 5
    if (wx.getStorageSync('role') == 1) {
      state = 4
    }
    this.updateState(state, courseId)
  },

  updateState: function (state, courseId){
    var that = this
    app.request({
      url: 'course/updateState',
      data: {
        state: state,
        courseId:courseId
      },
      method: '',
      success: function (res) {
        var  courseList = that.data.courseList

        if (res.code == 1) {

          for (var i = 0; i < courseList.length; i++){
              if(courseList[i].id == courseId){
                courseList[i].yesBut = res.yesBut
                courseList[i].cancelBut = res.cancelBut
                courseList[i].state = state
              }
          }
          that.setData({
            courseList:courseList
          })
        } else {

        }

      }, fail: function () {

      }

    })
  },
  /* 点击分类 */
  bindProductType: function (e) {
    var index = e.currentTarget.dataset.index;
    if (index == this.data.bindProductTypeIndex) {
      this.data.showType = false;

      this.setData({
        showType: this.data.showType,
        bindProductTypeIndex: null
      })
    }
    else {
      this.data.showType = true;
      this.data.bindProductTypeIndex = index;
      this.data.show1 = true;
      this.setData({
        show1: this.data.show1,
        showType: this.data.showType,
        bindProductTypeIndex: this.data.bindProductTypeIndex
      })

    }

  },



  /* 分类查询 */
  searchProduct: function (event) {
    var that = this;
    this.setData({ showType: false, bindProductTypeIndex: null })
    console.log(event.currentTarget.dataset)
    var focusKey = event.currentTarget.dataset;
    console.log(this.params)
    for (let i in focusKey) {
      for (let j in this.params) {
        if (i.toLowerCase() == j.toLowerCase()) { this.params[j] = focusKey[i] }
      }
    }
    switch (focusKey.ordertype) {
      case '00': {
        this.setData({ typeSearch: '等待教练确认' }); break;
      };
      case '01': {
        this.setData({ typeSearch: '等待我确认' }); break;
      };
      case '10': {
        this.setData({ typeSearch: '等待我确认' }); break;
      };
      case '11': {
        this.setData({ typeSearch: '等待学员确认' }); break;
      };
      case '12': {
        this.setData({ typeSearch: '我拒绝' }); break;
      };
      case '13': {
        this.setData({ typeSearch: '学员拒绝' }); break;
      };
      case '02': {
        this.setData({ typeSearch: '教练拒绝' }); break;
      };
      case '03': {
        this.setData({ typeSearch: '我拒绝' }); break;
      };
      case '14': {
        this.setData({ typeSearch: '我取消' }); break;
      };
      case '15': {
        this.setData({ typeSearch: '学员取消' }); break;
      };
      case '04': {
        this.setData({ typeSearch: '教练取消' }); break;
      };
      case '05': {
        this.setData({ typeSearch: '我取消' }); break;
      };
      case '06': {
        this.setData({ typeSearch: '已结束' }); break;
      };
      case '07': {
        this.setData({ typeSearch: '正在进行' }); break;
      };
      case '08': {
        this.setData({ typeSearch: '未开始' }); break;
      };
      case '09': {
        this.setData({ typeSearch: '超时' }); break;
      };
    }

    console.log(this.params)
   // this.params.page = 1
    //var customIndex = this.more_product_list_URL(this.params);
    //console.log(customIndex)
    wx.showLoading({
      title: 'loading'
    })
   // that.listPage.page = 1
   // that.params.page = 1
     this.setData({
      pageIndex: 1,
          
    })
     var status = focusKey.ordertype;
    that.listCourse(status.substring(1,2))
  },
 
})
