// pages/submit_from_orders/submit_from_orders.js
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
    imgurl: imgurl,
    orderAddress: {},
    orderGoodList: [],
    from_: 'to_pay', //默认来自‘去支付’
    payNowSt: false, //立即支付按扭状态
    express: ['快递包邮'],
    expressIndex: 0,
    index: 0,
    arr: [],
    sum_price_all: 0,
    order:'',
    coupon:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id = options.order_id;
    var address_id = options.address_id
    this.getOrderAddress(address_id)
    this.getOrderGoodList(order_id)
    this.getUseCoupon(order_id)
    if (options.from_ == 'look_detail') {
      this.setData({
        from_: options.from_,
      })
    }
  },
  //取商家订单的商品
  getOrderGoodList: function (order_id) {
    var that = this
    common.httpG('order/read', {
      order_id: order_id,
    }, function (data) {
      if (data.code == 0) {
        that.setData({
          order: data.data.order,
          orderGoods: data.data.order_goods,
          sum_price_all: data.data.order.sum_price
        })
      }
    })
  },
  //获取订单是否使用优惠券
  getUseCoupon: function (order_id){
    var that = this
    common.httpG('order/get_coupon',{order_id:order_id},function(data){
      that.setData({
        coupon:data.data
      })
    })
  },
  //取商家订单的地址
  getOrderAddress: function (address_id) {
    var that = this
    common.httpG('address/read', {
      address_id: address_id,
    }, function (data) {
      if (data.code == 0) {
        that.setData({
          orderAddress: data.data
        })
      }
    })
  },
  
  //立即支付
  tapPayNow: function () {
    this.setData({
      payNowSt: true,
    })
    var order_id = this.data.order.id;
    var username = common.getUserName();
    var that = this
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
                  type_: that.data.type_,
                  username: username,
                },
                success: function (res) {
                  wx.redirectTo({
                    url: '/pages/orders/orders',
                  })
                }
              })
            },
            'fail': function (res) {
              console.log(res)
            }
          })
        } else {
          that.setData({
            payNowSt: false,
          })
          wx.hideLoading();
          wx.showToast({
            title: res.data.msg,
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