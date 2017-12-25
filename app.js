//app.js  用户登录

App({
	// 初次加载会执行，再次进入不一定会执行
	onLaunch: function () {
		this.register()
	
	},
	// 第次进入都会执行
	onShow: function () {
	

	},
	//注册
	register: function () {
		var that = this;
		// Do something initial when launch.
		//当程序开启时，自动完成注册功能 
		wx.login({
			success: function (res) {
				if (res.code) {
					//发起网络请求,注册用户
					wx.request({
						url: that.globalData.wxUrl + 'user',
						data: {
							code: res.code
						},
						success: function (res) {
							try {
								wx.setStorageSync('username', res.data.data)
							} catch (e) {
								wx.showToast({
									title: 'setStorageSync fail',
									duration: 10000
								})
							}
						}, fail: function () {
							console.log('login-errro');
						}
					})
				} else {
					wx.showToast({
						title: '获取用户登录态失败！',
						duration: 10000
					})
				}
			}
		});
	},

	//隐藏时清除缓存数据,用户名不清
	onHide: function () {
		
	},
	globalData: {
		wxUrl: 'https://huahui.qingyy.net/welovetp/public/wx.php/',
		imgUrl: 'https://huahui.qingyy.net/welovetp/public/',
    cart_good: 'GoodList', //缓存购物车数据的key
    orders_all: 'orders_all', //缓存所有订单的key
	}
})