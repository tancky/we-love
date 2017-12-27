// pages/moreOrders/moreOrders.js
var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;
const ordersAll = app.globalData.orders_all;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: imgurl,
    orders: [], //所有订单
    order_paid: [], //订单已支付
    order_no_pay: [], //订单待支付
    currentTab: 0,
    st: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.st == 1) {
      that.setData({
        st: 1,
        currentTab: 1,
      })
    }
    if (options.st == 2) {
      that.setData({
        st: 2,
        currentTab: 2,
      })
    }
    if (options.st == 3) {
      that.setData({
        st: 3,
        currentTab: 3,
      })
    }
    if (options.st == 4) {
      that.setData({
        st: 4,
        currentTab: 4,
      })
    }
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      },
    })
  },
  //取我的订单列表，缓存本地
  getOrders: function () {
    var that = this
    var st = that.data.st
    //var username = common.getUserName();
    var username = wx.getStorageSync('username');
    if (!username) {
      app.register();
      username = wx.getStorageSync('username')
    }
    common.httpG('order/index', {
      username: username, st: st
    }, function (data) {
      if (data.code == 0) {
        that.setData({
          orders: data.data
        })
      } else {
        that.setData({
          orders: []
        })
      }
      //缓存所有订单。。。
      wx.setStorageSync(ordersAll, data.data)
    })
  },
  //取消订单事件
  cancelOrder: function (e) {
    var that = this
    var order_id = e.currentTarget.dataset.order_id
    wx.showModal({
      title: '取消订单',
      content: '确认取消吗？取消后可以列表删除',
      success: function (res) {
        if (res.confirm) {
          common.httpP('order/update_st', {
            'order_id': order_id,
            'st': 'cancel'
          }, function (data) {
            if (data.code == 0) {
              that.getOrders()
            }
          })
        }
      }
    })
  },
  //删除订单事件
  orderDelete: function (e) {
    var that = this;
    var order_id = e.target.dataset.order_id;
    wx.showModal({
      title: '删除订单',
      content: '确认删除吗？',
      success: function (res) {
        if (res.confirm) {
          common.httpP('order/update_st', {
            order_id: order_id,
            st: 'delByUser'
          }, function (data) {
            if (data.code == 0) {
              that.getOrders()
            }
          });
        }
      }
    })
  },
  //去支付事件
  orderConfirm: function (e) {
    var order_id = e.currentTarget.dataset.order_id;
    var address_id = e.currentTarget.dataset.address_id;
    wx.navigateTo({
      url: '/pages/submit_from_orders/submit_from_orders?from_=to_pay&order_id=' + order_id + '&address_id=' + address_id,
    })
  },
  //确认收货事件
  goodConfirm: function (e) {
    var that = this;
    var order_id = e.target.dataset.order_id;
    wx.showModal({
      title: '确认收货',
      content: '确认所有货都收到了吗?否则人财两空。',
      success: function (res) {
        if (res.confirm) {
          common.httpP('order/update_st', {
            order_id: order_id,
            st: 'taken'//收到货了
          }, function (data) {
            if (data.code == 0) {
              that.getOrders()
            }
          });
        }
      }
    })
  },
  //申请退货事件
  tapRefund: function (e) {
    var that = this;
    var order_id = e.target.dataset.order_id;
    wx.showModal({
      title: '申请退货',
      content: '商家审核后会退回购物款',
      success: function (res) {
        if (res.confirm) {
          common.httpP('order/update_st', {
            order_id: order_id,
            st: 'refundByUser'
          }, function (data) {
            if (data.code == 0) {
              wx.showToast({
                title: '提交申请成功',
                duration: 8000,
              })
              that.getOrders()
            }
          });
        }
      }
    })
  },
  //立即退款事件
  promptlyRefund: function (e) {
    var that = this;
    var order_id = e.target.dataset.order_id;
    console.log(e)
    wx.showModal({
      title: '立即退款',
      content: '您想要立即退款吗?',
      success: function (res) {
        if (res.confirm) {
          common.httpP('pay/fast_refund', {
            order_id: order_id,
          }, function (data) {
            if (data.code == 0) {
              common.httpP('order/update_st', { order_id: order_id, st: 'fastRefund' }, function (data) {
                wx.showToast({
                  title: '退款成功',
                  duration: 8000,
                })
              })
              that.getOrders()
            }
          });
        }
      }
    })
  },
  //订单详情事件
  lookDetail: function (e) {
    var order_id = e.currentTarget.dataset.order_id;
    var address_id = e.currentTarget.dataset.address_id;
    wx.navigateTo({
      url: '/pages/submit_from_orders/submit_from_orders?from_=look_detail&order_id=' + order_id + '&address_id=' + address_id,
    })
  },
  switchNav(e) {
    var that = this;
    var current = e.target.dataset.current;
    console.log(current)
    if (that.data.currentTab === current) {
      return false
    } else {
      that.setData({
        currentTab: current,
        st: current,
      })
      that.getOrders()
    }
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
    this.getOrders()
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