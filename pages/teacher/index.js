// pages/teacher/index.js
var footer = require("../common/footer.js");
const ui = require("../../utils/ui.js");
const http = require("../../utils/http.js");
var app = getApp();

Page(
  Object.assign({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    wx.hideLoading();
    this.setData({
      CONFIG: app.globalData.CONFIG,
      IP: app.globalData.IP,
    });
    var url = app.globalData.HOST;
    var self = this;
    http.post({
      url: `${url}getTeacherList`,
      obtainResponse: true,
      success: (res) => {
        console.log(res);
        var result = res.data;
        var status = result.status;
        if (status == 1) {
          var teacher_list = result.data;
          self.setData({
            teacher_list: teacher_list,
          });
        } else {
          ui.showToast("接口获取失败");
        }
      }
    })

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
  teacherDetail:function(e){
      console.log(e);
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/teacher/detail?id=${id}`,
      })
  },

  course: function (e) {
    wx.navigateTo({
      url: '/pages/train/index',
    })
  },
},{...footer}))