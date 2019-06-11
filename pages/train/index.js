// pages/train/index.js
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
      url: `${url}getCourseList`,
      obtainResponse: true,
      success: (res) => {
        console.log(res);
        var result = res.data;
        var status = result.status;
        if (status == 1) {
          var course_list = result.data;
          self.setData({
            course_list: course_list,
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
  teacher:function(e){
    wx.navigateTo({
      url: '/pages/teacher/index',
    })
  },
  checkboxChange:function(e){
    console.log(e); 
    var courses_str = e.detail.value; 
    courses_str = courses_str.join(",");
      
    this.setData({
      courses_str: courses_str
    });
  },
  sub_form  : function (e) {
      console.log(e);
   
      var r = e.detail.value;
      var name = r.name;
      var phone = r.phone;
      var courses = r.courses;

      if (!name) {
        ui.showToast('请输入姓名!')
        return;
      }
      if (!phone) {
        ui.showToast('请输入电话!')
        return;
      }
      if (!courses){
        ui.showToast('请选择课程!')
        return;
      }
      var url = app.globalData.HOST;
      var self = this;
      http.post({
        url: `${url}joinTrainOp?phone=${phone}&name=${name}&courses=${courses}`,
        obtainResponse: true,
        success: (res) => {
          console.log(res);
          var result = res.data;
          var status = result.status;
          if (status == 1) {
            ui.showToast(result.info);
            self.setData({
              name:'',
              phone:''
            })
          } else {
            ui.showToast(result.info);
          }
        }
      })
    }
  }, { ...footer}))