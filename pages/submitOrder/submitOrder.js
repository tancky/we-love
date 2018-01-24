// pages/submitOrder/submitOrder.js
var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;
const wxurl = app.globalData.wxUrl;
const CART_GOOD = app.globalData.cart_good
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    express: ['快递包邮'],
    expressIndex: 0,
    index: 0,
    address: null,
    sum_price_all: 0,
    haveCoupon: 1,
    sumitOrderSt: false, //默认没有提交，提交后变为true,
    GoodList: [],
    notes: '',
    imgurl:imgurl,
    rule:0,
    solution:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var GoodList = wx.getStorageSync(CART_GOOD)
    var sum_price_all = wx.getStorageSync('sum_price_all')
    if (!GoodList) {
      wx.navigateBack({})
    }
    this.setData({ GoodList: GoodList, sum_price_all: sum_price_all })
    this.getCouponList()
    
  },
  couponSlt(e) {
    var that = this
    this.setData({
      index: e.detail.value,
      solution: that.data.arr[e.detail.value].solution,
      rule: that.data.arr[e.detail.value].rule,
    })
  },
  expressSlt(e) {
    this.setData({
      expressIndex: e.detail.value
    })
    
  },
  //获取用户输入的备注
  notesInput: function (e) {
    this.setData({
      notes: e.detail.value
    })
  },
  //获取用户优惠券接口
  getCouponList: function () {
    var that = this
    var username = common.getUserName()
    var sum_price_all = that.data.sum_price_all
    common.httpG('coupon/usable', { username: username, sum_price_all: sum_price_all }, function (data) {
      if (data.code == 0) {
        that.setData({
          arr: data.data
        })
      } else {
        that.setData({
          haveCoupon: 0
        })
      }
    })
  },
  //获取默认地址api接口
  getAddress: function () {
    var that = this;
    var username = common.getUserName()
    common.httpG('address/default_address', {
      username: username,
    }, function (data) {
      if (data.code == 0) {
        that.setData({
          address: data.data,
        })
      }
    })
  },
  //改地址
  tapAddress: function (e) {
    wx.navigateTo({
      url: '/pages/address/address?from_=orderConfirm',
    })
  },
  //提交订单事件
  submitOrder: function (e) {
    var that = this
    if (that.data.address == null) {
      wx.showToast({
        title: '请添加地址',
      })
      return;
    }
    that.setData({
      submitOrderSt: true
    })
    var username = common.getUserName()
    var GoodList = wx.getStorageSync(CART_GOOD)
    var sum_price_all = wx.getStorageSync('sum_price_all')
    var coupon_id = e.target.dataset.coupon_id;
    common.httpG('order/save', {
      username: username,
      GoodList: GoodList,
      sum_price_all: sum_price_all,
      address_id: that.data.address.id,
      coupon_id: coupon_id,
      notes: that.data.notes
    }, function (data) {
      if (data.code == 0) {
        //发起支付
        that.payNow(data.data, username)
      } else {
        that.setData({
          sumitOrderSt: false,
        })
      }
    })
  },
  //立即支付
  payNow: function (order_id, username) {
    wx.showLoading({
      title: '请求支付中...',
    })
    wx.request({
      url: wxurl + 'pay/pay_now',
      data: {
        order_id: order_id,
        username: username,
      },
      success: function (res) {
        var data = res.data;
        if (data.code == 0) {
          wx.hideLoading();
          wx.requestPayment({
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': 'MD5',
            'paySign': data.paySign,//签名,
            'success': function (res) {
              //更改订单状态为已支付
              wx.request({
                url: wxurl + 'order/update_pay_st',
                data: {
                  order_id: order_id,
                  st: 'paid',
                },
                success: function (res) {
                  wx.redirectTo({
                    url: '/pages/moreOrders/moreOrders',
                  })
                }
              })
            },
            'fail': function (res) {
              console.log(res)
            }
          })
        } else {
          wx.hideLoading();
          wx.showToast({
            title: data.msg,
          })
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
    this.getAddress()
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