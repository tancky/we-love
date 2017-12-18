// pages/discounts/discounts.js
// var app =getApp()
var API =require('../../utils/apiD.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receiveList: [],
    receive: false,
    receiveDiscounts: '点击领取',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    API.ajax('', function (res) {
      console.log(res)
      that.setData({
        receiveList: res.data
      })
    })
  },
  getReceive() {
    // receive为false才可以点击,避免重复点击多次
    if(!this.data.receive) {
      this.setData({
        receive: true,
        receiveDiscounts: '已领取'
      })
      wx.showToast({
        title: '领取成功',
        icon: 'success'
      })
    }
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