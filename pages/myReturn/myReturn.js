// pages/myReturn/myReturn.js
var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: imgurl,
    orders: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRefundOrders()
  },

  //获取退货接口
  getRefundOrders: function () {
    var that = this
    var username = common.getUserName();
    common.httpG('order/get_refund',{username:username},function(data){
      that.setData({
        refundOrder:data.data,
      })
    })
  },
  searchGood: function () {
    wx.switchTab({
      url: '/pages/classify/classify',
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

  }
})