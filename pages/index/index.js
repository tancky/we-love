//index.js
//获取应用实例
const app = getApp()
const common = require("../../utils/util.js");
const imgurl = app.globalData.imgUrl;
Page({
	data: {
		imgurl: imgurl,
		duration: 1000,
		interval: 3000,
		indicatorColor: '#fff',
		indicatorActiveColor: '#ff6887',
		autoplay: true,
		circular: true,
		indicatorDots: true
	},

	onLoad: function () {

	},
	onShow: function () {

	},

	onShareAppMessage: function () {

	}
})
