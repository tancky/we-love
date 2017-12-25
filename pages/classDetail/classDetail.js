// pages/classDetail/classDetail.js
const app = getApp()
const common = require("../../utils/util.js");
const imgurl = app.globalData.imgUrl;
const wxurl = app.globalData.wxUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    imgurl: imgurl,
    selNav: '',
    selPrice: 'cheap',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var name = options.name;
    var cate_id = options.cate_id;
    that.setData({
      cate_id: cate_id
    })
    this.getGoodsList(cate_id,name)
  },

  //商品列表接口
  getGoodsList: function (cate_id,name) {
    var that = this
    if (!that.data.keywords) {
      that.setData({
        keywords: ''
      })
    }
    common.httpG('good/glist', { cate_id: that.data.cate_id, paixu: that.data.selNav}, function (data) {
      that.setData({
        goodsList: data.data.data,
      })
    })
  },
  // 商家排行导航区点击更改字体颜色
  selNav(e) {
    var that = this;
    console.log(e);
    // 获取当前点击的导航ID值
    that.setData({
      selNav: e.target.dataset.nav,
    });
    if (that.data.selPrice == 'cheap') {
      // 调用接口数据
      this.getGoodsList();
      that.setData({
        selPrice: 'expensive',
      })
    } else if (that.data.selPrice == 'expensive') {
      wx.request({
        url: wxurl + 'good/glist/',
        data: { cate_id: that.data.cate_id, paixu: 'expensive' },
        success: (res) => {
          that.setData({
            goodsList: res.data.data.data,
            selPrice: 'cheap',
          })
        }
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