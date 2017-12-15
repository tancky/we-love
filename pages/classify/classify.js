// pages/classify/classify.js
const app = getApp()
const common = require("../../utils/util.js");
const imgurl = app.globalData.imgUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: imgurl,
    inputShowed: false,
    inputVal: "",
    cateList: [],
    cateAd: [],
    firstCate: [],
    secondCate: [],
    pid: '1',
    cateSlt: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCateAd();
    this.getFirstCate();
  },
  //分类页广告接口
  getCateAd: function () {
    var that = this;
    common.httpG('ad/cate', {}, function (data) {
      that.setData({
        cateAd: data.data
      })
    })
  },
  //一级分类接口
  getFirstCate: function () {
    var that = this;
    common.httpG('cate/index', {}, function (data) {
      that.setData({
        firstCate: data.data,
        cateSlt:data.data[0].id,
        parentCate: data.data[0].name,
      })
      that.getSecond();
    })
  },
  //默认二级分类列表
  getSecond:function(){
    var that=this;
    common.httpG('cate/second', { pid: that.data.cateSlt }, function (data) {
      that.setData({
        defaultCate: data.data,
      })
    })
  },
  //changeCate事件
  changeCate: function (event) {
    var that = this
    // console.log(event)
    that.data.pid = event.currentTarget.dataset.pid;

    if (event.currentTarget.dataset.pid == 1) {
      that.setData({
        cateSlt: 1
      });
    } else {
      that.setData({
        cateSlt: event.currentTarget.dataset.pid,
      });
    }
    common.httpG('cate/second', { pid: that.data.pid }, function (data) {
      that.setData({
        defaultCate: data.data,
        parentCate: event.currentTarget.dataset.name,
      })
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
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