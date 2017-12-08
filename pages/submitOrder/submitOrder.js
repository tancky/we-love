// pages/submitOrder/submitOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      coupon: ['请选择优惠券','100元优惠', '500元优惠', '300元优惠'],
      express: ['快递包邮'],
      expressIndex: 0,
      couponIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
    couponSlt(e) {
      this.setData({
          couponIndex: e.detail.value
      })
    },
    expressSlt(e) {
        this.setData({
            expressIndex: e.detail.value
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