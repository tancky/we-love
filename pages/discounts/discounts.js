// pages/discounts/discounts.js
const app = getApp()
const common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receiveList: [],
    receive: false,
    receiveDiscounts: '点击领取',
    List: [],
    getReceive: 'getReceive',
    alrReceive: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var username = options.username;
    that.getList(username);
  },
  //获取优惠券列表
  getList: function (username) {
    var that = this
    common.httpG('coupon/index', { username: username }, function (data) {
      that.setData({
        List: data.data,
      })
    })
  },
  getReceive(e) {
    var that = this
    var username = common.getUserName()
    var coupon_id = e.target.dataset.coupon_id
    common.httpP('coupon/get', { username: username, coupon_id: coupon_id }, function (data) {
      if (data.code == 0) {
        that.getList(username);
      } else {
        wx.showToast({
          title: data.msg,
        })
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

  }
})