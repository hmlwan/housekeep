//index.js
//获取应用实例
const ui = require("../../utils/ui.js");
const http = require("../../utils/http.js");
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
    console.log(app.globalData.userInfo);
    if (app.globalData.CONFIG){

      console.log('第一次回调', app.globalData.CONFIG);

    }else{
      
      app.getCallback = () => {
        console.log('再次回调', app.globalData.CONFIG);
        this.setData({
          CONFIG: app.globalData.CONFIG,
          IP: app.globalData.IP,
        });
      }
    };

    wx.hideLoading();

    if (app.globalData.userInfo) {
      console.log(1);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      console.log(app.globalData.userInfo);
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res);
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      console.log(3);
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          // this.setData({
          //   userInfo: res.userInfo,
          //   hasUserInfo: true
          // })
        }
      })
    }
  },
  getUserInfo: function(e) {
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        hasUserInfo: true
      });
      wx.login({
        //获取code
        success: function (res) {
          console.log(res);
          var code = res.code; //返回code

          var url = app.globalData.HOST;
          http.post({
            url: `${url}getWxOpenId?code=${code}`,
            obtainResponse: true,
            success: (res) => {
              console.log(res);
              var result = res.data;
              var status = result.status;
            
              if (status == 1) {
                var openid = result.data; //返回openid
                app.globalData.userInfo.openid = openid;

                var url = app.globalData.HOST;
                var username = app.globalData.userInfo.nickName;
                var openid = app.globalData.userInfo.openid;
                console.log(openid);
                http.post({
                  url: `${url}saveMember?openid=${openid}&username=${username}&nick=${username}`,
                  obtainResponse: true,
                  success: (r) => {
                    console.log(r);
                  }
                })
              }else {
                 ui.showToast("接口获取失败");
              }
            }
          })


    
        }
      });
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
