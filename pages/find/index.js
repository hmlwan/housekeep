// pages/find/index.js

var footer = require("../common/footer.js");
const ui = require("../../utils/ui.js");
const http = require("../../utils/http.js");
var app = getApp();
Page(
  Object.assign({
	// msgHandler(e) {
	// 	console.log(e.detail.data) //我是网页，获取到来自也页面的数据
	// },
	
	/**
	 * 页面的初始数据
	 */
	data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            hasUserInfo: true
          })
        }
      }
    })


    var type_id ="";
    type_id = options.type_id;
    if (type_id ==undefined){
      type_id = '';
    }
    this.setData({
      CONFIG: app.globalData.CONFIG ,
      IP: app.globalData.IP,
    });
    wx.hideLoading();
    this.getAyiByJobList(type_id);

	},
  getUserInfo: function (e) {
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        hasUserInfo: true
      });
      wx.login({
        //获取code
        success: function (res) {
          console.log(res);
          var code = res.code; //返回code
          var APPID = app.globalData.APPID;
          var SECRET = app.globalData.SECRET;
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + code + '&grant_type=authorization_code',
            data: {},
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              var openid = res.data.openid; //返回openid
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
            }
          })
        }
      });
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
  // 获取列表
  getAyiByJobList:function(type_id){
    var self = this;
    var url = app.globalData.HOST;
    http.post({
      url: `${url}getAyiByJobType?type_id=${type_id}`,
      obtainResponse: true,
      success: (res) => {
        console.log(res);
        var result = res.data;
        var status = result.status;
        if (status == 1) {
          var ai_list = result.data.ai_list;
          var type_list = result.data.type_list;
          var special_list = result.data.special_list;
          var active_type_id = result.data.type_id;
          self.setData({
            ai_list: ai_list,
            type_list: type_list,
            active_type_id: active_type_id,
            special_list: special_list
          });

        } else {
          ui.showToast("接口获取失败");
        }
      }
    })

  },
  changeType:function(e){
      console.log(e);
      var type_id =  e.target.dataset.type_id;
      this.getAyiByJobList(type_id);
  },
  //了解详情
  knowDetail: function (e){
      console.log(e);
      var id = e.target.dataset.id;
      wx.navigateTo({
        url: `/pages/detail/index?id=${id}`
      })
  },
  sub_form: function (e) {
      console.log(e);
      var r = e.detail.value;
      var name = r.name;
      var phone = r.phone;
 
      if (!name) {
        ui.showToast('请输入姓名!')
        return;
      }
      if (!phone) {
        ui.showToast('请输入电话!')
        return;
      }
      var url = app.globalData.HOST;
      var self = this;
      http.post({
        url: `${url}orderAiOp?phone=${phone}&name=${name}`,
        obtainResponse: true,
        success: (res) => {
          console.log(res);
          var result = res.data;
          var status = result.status;
          if (status == 1) {
            ui.showToast(result.info);
            self.setData({
              name: '',
              phone: ''
            })
          } else {
            ui.showToast(result.info);
          }
        }
      })
    }

  }, { ...footer }))