// pages/introduce/client.js
const ui = require("../../utils/ui.js");
const http = require("../../utils/http.js");
var app = getApp();

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
    this.setData({
      CONFIG: app.globalData.CONFIG,
      IP: app.globalData.IP,
    });

    if (!(app.globalData.userInfo)) {
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                app.globalData.userInfo = res.userInfo;
              }
            })
          }
        }
      })
    };

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
  // 提交信息
  sub_form: function (e) {
    console.log(e);
    var detail = e.detail.value;
    var train_name = detail.train_name;
    var train_phone = detail.train_phone;
    var recommend_name = detail.recommend_name;
    var recommend_phone = detail.recommend_phone;
    var recommend_wx = detail.recommend_wx;
    var recommend_zfb = detail.recommend_zfb;
    var recommend_bank = detail.recommend_bank;
    var type = detail.type;

    if (app.globalData.userInfo) {
      var op_name = app.globalData.userInfo.nickName;
      var open_id = app.globalData.userInfo.openid;
    } else {
      var open_id = "";
      var op_name = "";
      return;
    }
    if (!train_name || train_name.length == 0) {
      ui.showToast('请输入客户姓名!')
      return;
    }
    if (!train_phone) {
      ui.showToast('请输入客户电话!')
      return;
    }
    if (!recommend_name || recommend_name.length == 0) {
      ui.showToast('请输入推荐人姓名!')
      return;
    }
    if (!recommend_wx) {
      ui.showToast('请输入推荐人微信!')
      return;
    }
    if (!recommend_zfb) {
      ui.showToast('请输入推荐人支付宝账号!')
      return;
    }
    if (!recommend_phone) {
      ui.showToast('请输入推荐人电话!')
      return;
    }
    if (!recommend_bank) {
      ui.showToast('请输入推荐人银行账号！')
      return;
    }
    var url = app.globalData.HOST;
    http.post({
      url: `${url}subRecommendData?train_name=${train_name}&train_phone=${train_phone}&recommend_name=${recommend_name}&recommend_phone=${recommend_phone}&recommend_wx=${recommend_wx}&recommend_zfb=${recommend_zfb}&recommend_bank=${recommend_bank}&type=${type}&open_id=${open_id}&op_name=${op_name}`,
      obtainResponse: true,
      success: (res) => {
        console.log(res);
        var result = res.data;
        var status = result.status;
        if (status == 1) {
          wx.navigateBack({
            delta: 1,
            success: function (res) {
              ui.showToast(result.info);
            }
          })
        } else {
          ui.showToast(result.info);
        }
      }
    })

  },

  getUserInfo: function (res) {
    console.log(res);
    getApp().globalData.userInfo = res.detail.userInfo;
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
            } else {
              ui.showToast("接口获取失败");
            }
          }
        })


      }
    })

  }
})