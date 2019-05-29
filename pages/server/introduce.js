// pages/server/introduce.js
var menu = getApp();

Page({

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
})