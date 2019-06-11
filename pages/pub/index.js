// pages/pub/index.js
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
	show:function(e){
   
    console.log(e);
    var pub_id = e.target.dataset.id;
		this.setData({
        task_id: pub_id,
        is_show: false
		});
	},
	cancel: function () {
		this.setData({
				is_show: true,
        task_id:""
		});
	},
  
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    console.log(app.globalData.CONFIG);
    this.setData({
      'is_show': true,
      'CONFIG': app.globalData.CONFIG,
       IP: app.globalData.IP,
    });

    var self = this;
    var url = app.globalData.HOST;
    http.post({
      url: `${url}getPubTaskList`,
      obtainResponse: true,
      success:function(e){
          console.log(e);
          if(e.data.status == 1){
            self.setData({
              'pub_data':e.data.data
            });
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

  // 提交表单
  formSubmit:function(e){
    console.log(e);
    var v = e.detail.value;
    var task_id = v.task_id;
    var name = v.name;
    var phone = v.phone;
    if (!name){
      ui.showToast('请输入姓名');
      return;
    }
    if (!phone) {
      ui.showToast('请输入手机号');
      return;
    }
    var self = this;
    var url = app.globalData.HOST;
    http.post({
      url: `${url}applyOp?name=${name}&phone=${phone}&task_id=${task_id}`,
      obtainResponse: true,
      success: (res) => {
        console.log(res);
        var result = res.data;
        var status = result.status;
        if (status == 1) {
          ui.showToast(result.info);
          self.setData({
            'is_show': true
          });
        } else {
          ui.showToast(result.info);
        }
      }
    })

  }


  }, { ...footer}))