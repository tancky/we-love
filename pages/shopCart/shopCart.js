// pages/shopCart/shopCart.js
const app = getApp()
const common = require("../../utils/util.js");
const imgurl = app.globalData.imgUrl;
const CART_GOOD = app.globalData.cart_good;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    GoodList: [],
    sum_price_all: 0,
    imgurl: imgurl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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
    this.getGoodList();
  },
  //获取购物车数据
  getGoodList: function () {
    var that = this
    var username = common.getUserName()
    common.httpG('cart/index', {
      username: username
    }, function (data) {
      if (data.code == 0) {
        that.setData({
          GoodList: data.data,
          sum_price_all: data.sum_price_all
        })
      } else {
        that.setData({
          GoodList: [],
          sum_price_all: 0
        })
      }
      //缓存
      wx.setStorageSync(CART_GOOD, data.data)
      wx.setStorageSync('sum_price_all', data.sum_price_all)
    })
  },
  //删除购物车
  delCart: function (e) {
    var that = this
    var cart_id = e.target.dataset.cart_id
    console.log(cart_id);
    var good_id = e.target.dataset.good_id
    var property_id = e.target.dataset.property_id
    var username = common.getUserName();
    wx.showModal({
      title: '删除商品',
      content: '确认删除商品吗?',
      success: function (res) {
        if (res.confirm) {
          common.httpG('cart/delete', {
            username: username, good_id: good_id, property_id: property_id, cart_id: cart_id
          }, function (data) {
            if (data.code == 0) {
              wx.showToast({
                title: '删除成功',
              })
              that.getGoodList();
            }
          })
        }
      }
    })

  },
  //结算去订单确认页
  tapGoSubmit: function () {
    wx.navigateTo({
      url: '/pages/submitOrder/submitOrder',
    })
  },
  searchGood: function () {
    wx.switchTab({
      url: '/pages/classify/classify',
    })
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