//index.js
//获取应用实例
const common = require("../../utils/util.js");
const app = getApp()
const imgurl = app.globalData.imgUrl;
const wxurl = app.globalData.wxUrl;
Page({
  data: {
    imgurl: imgurl,
    duration: 1000,
    interval: 3000,
    indicatorColor: '#fff',
    indicatorActiveColor: '#ff6887',
    autoplay: true,
    circular: true,
    indicatorDots: true,
    slideShow: [],
    adHome: [],
    stickGood:[],
  },

  onLoad: function () {
    this.getSlideShow();
    this.getAdHome();
    this.getStickGood();
  },
  onShow: function () {

  },
  //主页轮播图接口
  getSlideShow: function () {
    var that = this;
    common.httpG('ad/index', {}, function (data) {
      that.setData({
        slideShow: data.data,
      })
    })
  },
  //主页广告图接口
  getAdHome: function () {
    var that = this;
    common.httpG('ad/home_page', {}, function (data) {
      that.setData({
        adHome: data.data[0]['img'],
      })
    })
  },
  //主页置顶商品接口
  getStickGood: function () {
    var that = this;
    common.httpG('good/index',{},function(data){
      that.setData({
        stickGood: data.data.data
      })
    })
  },
  //主页搜索商品事件
  goSearch() {
    wx.switchTab({
      url: '/pages/classify/classify'
    })
  },
  onShareAppMessage: function () {

  }
})
