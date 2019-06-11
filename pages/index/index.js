//index.js
//获取应用实例
// var app = getApp();
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.hideLoading();
    this.setData({
      CONFIG: app.globalData.CONFIG,
      IP: app.globalData.IP,
    });
    
    if (app.globalData.userInfo) {
      console.log(33);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          // this.setData({
          //   userInfo: res.userInfo,
          //   hasUserInfo: true
          // })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 高单发布跳转
  gaodan:function(){
    wx.navigateTo({
      url:"/pages/pub/index"
    })
  },
   // 佳禾服务
  jhfw: function () {
    wx.switchTab({
      url: "/pages/index/server"
    })
  },
  // 课程介绍
  course: function () {
    wx.navigateTo({
      url: "/pages/train/index"
    })
  },
  // 介绍学员
  js_student: function () {
    wx.navigateTo({
      url: "/pages/introduce/student"
    })
  },
  // 介绍客户
  js_client: function () {
    wx.navigateTo({
      url: "/pages/introduce/client"
    })
  }
})
