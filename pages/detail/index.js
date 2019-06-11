// pages/detail/index.js
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
      this.setData({
        is_show:true,
        CONFIG: app.globalData.CONFIG,
        IP: app.globalData.IP,
      });
      var id = options.id;
      var self = this;
      var url = app.globalData.HOST;
      http.post({
        url: `${url}getAyiDetail?ayi_id=${id}`,
        obtainResponse: true,
        success: (res) => {
          console.log(res);
          var result = res.data;
          var status = result.status;
          if (status == 1) {
            var ai_info = result.data;
  
            self.setData({
              ai_info: ai_info,
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
  yuyueBtn:function(e){
      var self = this;
      var detail_id = e.target.dataset.id;
      self.setData({
          is_show:false,
          task_id: detail_id
      });
  },
  cancel: function (){
    this.setData({
      is_show: true
    });
  },
  formSubmit:function(e){
      console.log(e);
    var r = e.detail.value;
    var name = r.name;
    var phone = r.phone;
    var jober_id = r.task_id;
    if (!name){
      ui.showToast('请输入姓名!')
      return;
    }
    if (!phone) {
      ui.showToast('请输入电话!')
      return;
    }
    var url = app.globalData.HOST;
    http.post({
      url: `${url}orderAiOp?phone=${phone}&jober_id=${jober_id}&name=${name}`,
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
  }

  }, { ...footer }))