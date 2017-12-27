// pages/searchDetail/searchDetail.js
const app = getApp()
const common = require("../../utils/util.js");
const imgurl = app.globalData.imgUrl;
const wxurl = app.globalData.wxUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: imgurl,
    name:'',
    goodsList:[],
    selNav:'',
    selPrice: 'cheap',
    current_page: 1,
    last_page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = options.name
    this.setData({
      name:options.name
    })
    this.getGoodsList(name);
  },
  //商品列表接口
  getGoodsList: function (name) {
    var that = this
    common.httpG('good/search_list', { name: that.data.name, paixu: that.data.selNav,page:1 }, function (data) {
      that.setData({
        goodsList: data.data.data,
        last_page: data.data.last_page,
        current_page: 1,
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
        url: wxurl + 'good/search_list/',
        data: { name: that.data.name, paixu: 'expensive' ,page:1},
        success: (res) => {
          that.setData({
            goodsList: res.data.data.data,
            selPrice: 'cheap',
            current_page: 1,
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
    var that = this;
    var current_page = that.data.current_page
    var page = current_page + 1;
    if (current_page < that.data.last_page) {
      wx.request({
        url: wxurl + 'good/search_list/',
        data: {
          page: page,
          name: that.data.name,
          paixu: that.data.selNav,
        },
        success: (res) => {
          that.setData({
            current_page: res.data.data.current_page,
            goodsList: that.data.goodsList.concat(res.data.data.data),
          })
        },
        complete: () => {
          setTimeout(() => {
            wx.hideToast();
          }, 1000)
        }
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})