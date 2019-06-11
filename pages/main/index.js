// pages/main/index.js
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
      url: `${url}getJobType?limit=3`,
      obtainResponse: true,
      success: (res) => {
        console.log(res);
        var result = res.data;
        var status = result.status;
        if (status == 1) {
          var job_list = result.data;
          self.setData({
            job_list: job_list,
          });
        } else {
          ui.showToast("接口获取失败");
        }
      }
    })

	},
  aboutCompany:function(){
      wx.navigateTo({
        url: '/pages/server/introduce',
      })
  },
  train: function () {
    wx.navigateTo({
      url: '/pages/train/index',
    })
  },
  subCompany: function () {
    wx.navigateTo({
      url: '/pages/server/index',
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
  jumpAyi:function(e){
    console.log(e);
    var type_id = e.currentTarget.dataset.id;
    wx.reLaunch({
      url: `/pages/find/index?type_id=${type_id}`,
    })
  },

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
  }, { ...footer}))