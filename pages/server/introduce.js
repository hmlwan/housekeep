// pages/server/introduce.js
var footer = require("../common/footer.js");
const ui = require("../../utils/ui.js");
const http = require("../../utils/http.js");
const app = getApp(); 
Page(

  Object.assign({

	/**
	 * 页面的初始数据
	 */
	data: {

	},
	close_menu: function () {
		this.setData(
			{ menu_flag: true }
		);
	},
	open_menu: function () {
		this.setData(
			{ menu_flag: false }
		);
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
  
		this.setData({ menu_flag: true });
    wx.hideLoading();
    this.setData({
      CONFIG: app.globalData.CONFIG,
      IP: app.globalData.IP,
    });
    var url = app.globalData.HOST;
    var self = this;
    http.post({
      url: `${url}getCompanyInfo`,
      obtainResponse: true,
      success: (res) => {
        console.log(res);
        var result = res.data;
        var status = result.status;
        if (status == 1) {
          var company_info = result.data;
          var culture = company_info.culture.split('+');
          var img_list = JSON.parse(company_info.img); 
          console.log(culture);
          console.log(img_list);
          self.setData({
            company_info: company_info,
            culture: culture,
            img_list: img_list
          });
        } else {
          ui.showToast("接口获取失败");
        }
      }
    })



	},
	// 遮罩层显示
	show: function () {
		this.setData({ flag: false })
	},
	// 遮罩层隐藏
	conceal: function () {
		this.setData({ flag: true })
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

	}
},{...footer}))