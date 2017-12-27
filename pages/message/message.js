// pages/message/message.js
const app = getApp()
const common = require("../../utils/util.js");
const imgurl = app.globalData.imgUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List:[],
    hint:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  getList:function(){
    var that = this
    var username = common.getUserName()
    common.httpG('message/mlist', { username: username }, function (data) {
      if(data.code != 0){
        that.setData({
          hint: '暂无消息',
          List: []
        }) 
      } else {
        that.setData({
          List: data.data.data
        })  
      }
    }) 
  },
  //删除评价
  delMsg: function (e) {
    var that = this
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要删除评价吗?',
      success: function (res) {
        if (res.confirm) {
          common.httpG('message/delete_user', { id: id }, function (data) {
            if (data.code == 0) {
              that.getList()
            }
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