//在线客服
function kefu(){
    wx.makePhoneCall({
      phoneNumber: '',
    })
}
//在线预约
function yuyue () {
    wx.reLaunch({
      url: '/pages/find/index',
    })
}
// 我要培训
function peixun() {
    wx.redirectTo({
      url: '/pages/train/index',
    })
}
// 返回首页
function fanhui() {
    wx.redirectTo({
      url: '/pages/main/index',
    })
}
module.exports = {
    kefu: kefu,
    yuyue:yuyue,
    peixun: peixun,
    fanhui: fanhui
}