// pages/return/return.js
var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: imgurl,
    set: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id = options.order_id
    this.getOrderInfo(order_id);
    this.getSetting();
  },

  //平台设置接口
  getSetting: function () {
    var that = this
    common.httpG('setting/get_set', {}, function (data) {
      that.setData({
        set: data.data
      })
    })
  },
  //查询订单接口
  getOrderInfo: function (order_id) {
    var that = this
    common.httpG('order/read', { order_id: order_id }, function (data) {
      that.setData({
        order:data.data.order,
        orderGood:data.data.order_goods
      })
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