// pages/goodDetail/goodDetail.js
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
      array: ['请选择规格','300g', '500g', '1000g'],
      number: [1, 2, 3],
      index: 0,
      numberIndex: 0,
      inputNum: 1,
      decrease: 'decrease'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  changeFormat(e) {
      this.setData({
        index: e.detail.value
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