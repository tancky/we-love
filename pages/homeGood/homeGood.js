// pages/homeGood/homeGood.js
const app = getApp()
const common = require("../../utils/util.js");
const imgurl = app.globalData.imgUrl;
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    duration: 1000,
    interval: 3000,
    indicatorColor: '#fff',
    indicatorActiveColor: '#ff6887',
    circular: true,
    indicatorDots: true,
    arr: [],
    number: [1, 2, 3],
    index: 0,
    numberIndex: 0,
    inputNum: 1,
    decrease: 'decrease',
    goodInfo: [],
    imgurl: imgurl,
    goodImg: [],
    sizePrice: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var good_id = options.good_id
    this.getGoodsInfo(good_id)
    this.getGoodBigImg(good_id)
  },
  //获取商品详情接口
  getGoodsInfo: function (good_id) {
    var that = this
    common.httpG('good/info', { good_id: good_id }, function (data) {
      that.setData({
        goodInfo: data.data,
        cont: WxParse.wxParse('cont', 'html', data.data.desc, that, 5),
        arr: data.data.property,
      })
      if (that.data.arr) {
        that.setData({
          sizePrice: data.data.property[0].price,
        })
      }
    })

  },
  //获取商品大图接口
  getGoodBigImg: function (good_id) {
    var that = this
    common.httpG('good/images',
      {
        good_id: good_id
      },
      function (data) {
        that.setData({ goodImg: data.data })

      })
  },
  changeFormat(e) {
    var that = this
    this.setData({
      index: e.detail.value,
      sizePrice: that.data.arr[e.detail.value].price
    })
  },
  changeNumber(e) {
    this.setData({
      numberIndex: e.detail.value
    })
  },
  decrease() {
    var that = this;
    var inputNum = that.data.inputNum;
    if (inputNum > 1) {
      inputNum--;
    }
    var decrease = inputNum <= 1 ? 'decrease' : '';

    that.setData({
      inputNum: inputNum,
      decrease: decrease
    })
  },

  increase() {
    var that = this;
    var inputNum = that.data.inputNum;
    inputNum++;
    var decrease = inputNum > 1 ? '' : 'decrease';
    that.setData({
      inputNum: inputNum,
      decrease: decrease
    })
  },
  //点击加入购物车接口
  addCart(e) {
    var that = this
    var username = common.getUserName();
    var mai = e.target.dataset.mai
    var good_id = e.target.dataset.good_id;
    var property_id = e.target.dataset.property_id;
    var num = that.data.inputNum;
    common.httpP('cart/save', { username: username, good_id: good_id, num: num, property_id: property_id }, function (data) {
      if (data.code == 0) {
        wx.showToast({
          title: '加入购物车成功',
        })
        if (mai == 'true') {
          wx.switchTab({
            url: '/pages/shopCart/shopCart',
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