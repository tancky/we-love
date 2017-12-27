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
    current_page:1,
    last_page: 1,
    username:'',
  },

  onLoad: function () {
    this.getSlideShow();
    this.getAdHome();
    this.getStickGood();
    var username = common.getUserName();
    if (!username) {
      app.register();
      username = wx.getStorageSync('username')
    }
    this.setData({
      username: username
    })
    
    this.getInfo();// 取用户微信头像
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
    common.httpG('good/index',{page:1},function(data){
      that.setData({
        stickGood: data.data.data,
        last_page : data.data.last_page,
        current_page:1,
      })
    })
  },
  //主页搜索商品事件
  goSearch() {
    wx.switchTab({
      url: '/pages/classify/classify'
    })
  },
  getInfo: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.setData({
          userInfo: userInfo,

        });
        //将用户信息：头像和昵称发送服务器
        var username = common.getUserName()

        common.httpP('user/save', {
          'username': username,
          'vistar': userInfo.avatarUrl,
          'nickname': userInfo.nickName,
          'sex': userInfo.gender,
        }, function (res) {

        });
      },
      //如果不同意则提示用户设置为同意
      fail: function () {
        wx.openSetting({
          success: function (data) {
            if (data) {
              if (data.authSetting["scope.userInfo"] == true) {
                that.getInfo();
              } else {
                wx.showModal({
                  title: '授权提醒',
                  content: '为了您更好的体验，请同意授权登录',
                })
              }
            }
          }
        })
      }
    })
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
        url: wxurl + 'good/index',
        data: {
          page: page,
        },
        success: (res) => {
          that.setData({
            current_page: res.data.data.current_page,
            stickGood: that.data.stickGood.concat(res.data.data.data),
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
  onShareAppMessage: function () {

  }
})
